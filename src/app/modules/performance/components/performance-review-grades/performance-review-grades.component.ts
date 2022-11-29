import { ValidatorServiceService } from './../../../shared/component/validator-service/validator-service.service';
import { PerformanceReviewGrades } from './../../model/performance-review-grade.model';
import { PerformanceService } from './../../services/performance.service';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { AbstractControl, FormGroup, FormBuilder, Validators, ValidatorFn, ValidationErrors } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { forkJoin } from 'rxjs';
import { PerformanceReviewGradesService } from '../../services/performance-review-grades.service';
import { HttpParams } from '@angular/common/http';
import { TableHeaderMetaData } from 'src/app/modules/shared/model/table-header-list.model';
import { AlertService } from 'src/app/modules/shared/services/alert.service';
import { AlertOptions } from 'src/app/modules/shared/model/alert.model';
import { alphaNumeric, nameAndDescription } from 'src/app/modules/shared/component/validators/validation';

@Component({
	selector: 'app-performance-review-grades',
	templateUrl: './performance-review-grades.component.html',
	styleUrls: ['./performance-review-grades.component.scss']
})
export class PerformanceReviewGradesComponent implements OnInit {

	@ViewChild('performanceReviewGrades') performanceReviewGrade: TemplateRef<BsModalRef>;
	actionBtn: string = "Submit";
	alertOptions: AlertOptions = { autoClose: true, keepAfterRouteChange: true };
	columnsMetadata: TableHeaderMetaData;
	currentPage = 0;
	dataDataTable: { results: Array<PerformanceReviewGrades>, count: number } = { results: [], count: 0 };
	defaultIntialValue: PerformanceReviewGrades;
	intialValue: PerformanceReviewGrades;
	modalRef: BsModalRef;
	permission: Array<boolean> = [true, true, true];
	performanceReviewGradesForm: FormGroup
	params: HttpParams = new HttpParams();

	constructor(
		private alertService: AlertService,
		private formBuilder: FormBuilder,
		private modalService: BsModalService,
		private performanceReviewGradeService: PerformanceReviewGradesService,
		private performanceService: PerformanceService,
		private pattern: ValidatorServiceService
	) {
		this.performanceReviewGradesForm = this.initForm();
	}

	initForm(): FormGroup {
		return this.formBuilder.group({
			preformance_review_grade_id: ["", [Validators.required, Validators.maxLength(10),alphaNumeric]],
			preformance_review: ["", [Validators.required, Validators.maxLength(250), Validators.pattern(this.pattern.descriptionValidation()),nameAndDescription]],
			rating_from: ["", [Validators.required, Validators.maxLength(7)]],
			rating_to: ["", [Validators.required, Validators.maxLength(7)]],
			performance_description: ["", [Validators.required,nameAndDescription]],
			org_code: ["AVISYS"],
			is_deleted: [false],
			created_by: ["1"],
			updated_by: ["1"]

		}, {validator: this.checkMinMax});
	}

	ngOnInit(): void {
		this.defaultIntialValue = this.performanceReviewGradesForm.value;
		this.params = this.params.append('offset', 0);
		this.params = this.params.append('limit', 5);

		forkJoin({
			tableHeader: this.performanceService.getPerformanceReviewGradesHeaderColumn(),
			tableData: this.performanceReviewGradeService.getPerformanceReviewGradesListContent(this.params),
		}).subscribe(
			(response: any) => {
				this.columnsMetadata = response.tableHeader;
				this.dataDataTable = response.tableData;
			},
			(error) => { }
		);
	}

	checkMinMax(control: AbstractControl): ValidationErrors | null{
		if (+control.get("rating_from").value >= +control.get("rating_to").value)
			{ return { 'noMatch': true } }
			return null
    }	

	changePageSortSearch(data: HttpParams) {
		let offset = data.get('offset')
		let limit =data.get('limit')
		this.currentPage =Number (offset) / Number (limit)
		this.params = data;
		this.performanceReviewGradeService.getPerformanceReviewGradesListContent(data).subscribe((sucess: { results: Array<PerformanceReviewGrades>, count: number }) => {
		this.dataDataTable = sucess;
		});
	}

	openTemplate() {
		this.modalRef = this.modalService.show(this.performanceReviewGrade, Object.assign({}, { class: "gray modal-lg " })
		);
	}

	buttonEvent1(data: any) {
		if (data.event == "add") {
			this.actionBtn = "Submit";
			this.openTemplate();
			this.performanceReviewGradesFormControl.preformance_review_grade_id.enable();
			this.resetForm();
		}
		else if (data.event == "edit") {
			this.performanceReviewGradeService.getById(data.data.preformance_review_grade_id).subscribe((res) => {
			this.openTemplate();
			this.actionBtn = "Update";
			this.performanceReviewGradesForm.patchValue(res);
			this.performanceReviewGradesFormControl.preformance_review_grade_id.disable();
			this.intialValue = res;
			});
		}
		else if (data.event == "delete") {
			this.performanceReviewGradeService.softDelete(data.data.preformance_review_grade_id).subscribe((res: PerformanceReviewGrades) => {
			this.alertService.success("Record Deleted Successfully", this.alertOptions);
			this.changePageSortSearch(this.params);
			})
		}
	}

	get performanceReviewGradesFormControl(): { [key: string]: AbstractControl } {
		return this.performanceReviewGradesForm.controls;
	}

	get performanceReviewGradesControl(): { [key: string]: AbstractControl } {
		return this.performanceReviewGradesForm.controls
	}

	submit() {
		if (this.actionBtn !== "Submit") {
			this.performanceReviewGradeService.update(this.performanceReviewGradesForm.getRawValue(), this.performanceReviewGradesFormControl.preformance_review_grade_id.value).subscribe((response: PerformanceReviewGrades) => {
			this.alertService.success("Record Updated Successfully", this.alertOptions);
			this.params.set('offset' , 0 )
			this.params.set('limit' , 5 )
			this.modalRef.hide();
			this.changePageSortSearch(this.params);
			});
		}
		else {
			this.performanceReviewGradeService.create(this.performanceReviewGradesForm.value).subscribe((sucess: PerformanceReviewGrades) => {
			this.alertService.success("Record Added Successfully", this.alertOptions);
			this.params.set('offset' , 0 )
			this.params.set('limit' , 5 )
			this.changePageSortSearch(this.params );
			this.modalRef.hide();
			}, (error) => {
				if (error.error.preformance_review_grade_id) {
					this.alertService.info("Id already exists", this.alertOptions.autoClose);
				}
			});
		}
	}

	resetForm() {
		this.performanceReviewGradesForm.reset(this.actionBtn === 'Submit' ? this.defaultIntialValue : this.intialValue);
	}

}
