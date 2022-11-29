import { Grade } from '../../model/grade.model';
import { GradeService } from '../../services/grade.service';
import { PerformanceService } from "../../services/performance.service";
import { Component, OnInit, TemplateRef, ViewChild } from "@angular/core";
import { forkJoin } from "rxjs";
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";
import { FormGroup, FormBuilder, Validators, AbstractControl } from "@angular/forms";
import { HttpParams } from "@angular/common/http";
import { AlertOptions } from '../../../shared/model/alert.model';
import { ValidatorServiceService } from '../../../shared/component/validator-service/validator-service.service';
import { AlertService } from '../../../shared/services/alert.service';
import { TableHeaderMetaData } from '../../../shared/model/table-header-list.model';
import { alphaNumeric, nameAndDescription } from 'src/app/modules/shared/component/validators/validation';

@Component({
	selector: "app-grade",
	templateUrl: "./grade.component.html",
	styleUrls: ["./grade.component.scss"],
})
export class GradeComponent implements OnInit {

	@ViewChild('gradeTemplate') gradeTemplate: TemplateRef<BsModalRef>;
	alertOptions: AlertOptions = { autoClose: true, keepAfterRouteChange: true };
	actionBtn: string = "Submit";
	currentPage = 0;
	columnsMetadata: TableHeaderMetaData;
	dataDataTable: { results: Array<Grade>, count: number } = { results: [], count: 0 };
	defaultIntialValue: Grade;
	intialValue: Grade;
	modalRef: BsModalRef;
	gradeForm: FormGroup;
	permission: Array<boolean> = [true, true, true];
	params: HttpParams = new HttpParams();

	constructor(
		private alertService: AlertService,
		private formBuilder: FormBuilder,
		private gradeService: GradeService,
		private modalService: BsModalService,
		private pattern: ValidatorServiceService,
		private performanceService: PerformanceService,
	) { 
		this.gradeForm = this.initForm();
	 }

	ngOnInit(): void {
		this.defaultIntialValue = this.gradeForm.value;
		this.params = this.params.append('offset', 0);
		this.params = this.params.append('limit', 5);
		forkJoin({
			tableHeader: this.performanceService.getGradeHeaderColumn(),
			tableData: this.gradeService.getGradeContent(this.params),
		}).subscribe(
			(response:any) => {
				this.columnsMetadata = response.tableHeader;
				this.dataDataTable = response.tableData;
			},
			(error) => { }
		);
	}

	changePageSortSearch(data: HttpParams) {
		let offset = data.get('offset')
		let limit =data.get('limit')
		this.currentPage =Number (offset) / Number (limit)
		this.params = data;
		this.gradeService.getGradeContent(data).subscribe((sucess: { results: Array<Grade>, count: number }) => {
		this.dataDataTable = sucess;
		});
	}

	openTemplate() {
		this.modalRef = this.modalService.show(this.gradeTemplate, Object.assign({}, { class: "gray modal-lg " })
		);
	}

	initForm(): FormGroup {
		return this.formBuilder.group({
			grade_code: ["", [Validators.required, Validators.maxLength(10), alphaNumeric]],
			grade_name: ["", [Validators.required, Validators.maxLength(50), Validators.pattern(this.pattern.descriptionValidation()),nameAndDescription]],
			org_code: ["AVISYS"],
			is_deleted: [false],
			created_by: ["1"],
			updated_by: ["1"]
		});
	}

	buttonEvent1(data: any) {
		if (data.event == "add") {
			this.actionBtn = "Submit";
			this.openTemplate();
			this.gradeFormControl.grade_code.enable();
			this.resetForm();
		}
		else if (data.event == "edit") {
			this.gradeService.getById(data.data.grade_code).subscribe((res :Grade) => {
			this.openTemplate();
			this.actionBtn = "Update";
			this.gradeForm.patchValue(res);
			this.gradeFormControl.grade_code.disable();
			this.intialValue = res;
			});
		}
		else if (data.event == "delete") {
			this.gradeService.softDelete(data.data.grade_code).subscribe((res: Grade) => {
			this.alertService.success("Record Deleted Successfully", this.alertOptions);
			this.changePageSortSearch(this.params);
			})
		}
	}

	submit() {
		if (this.actionBtn !== "Submit") {
			this.gradeService.update(this.gradeForm.getRawValue(), this.gradeFormControl.grade_code.value).subscribe((response:Grade) => {
				this.alertService.success("Record Updated Successfully", this.alertOptions);
				this.params.set('offset' , 0 )
			    this.params.set('limit' , 5 )
				this.changePageSortSearch(this.params);
				this.modalRef.hide();
			});
		}
		else {
			this.gradeService.create(this.gradeForm.value).subscribe((sucess:Grade) => {
				this.params.set('offset' , 0 )
			    this.params.set('limit' , 5 )
				this.changePageSortSearch(this.params);
				this.alertService.success("Record Added Successfully", this.alertOptions);
				this.modalRef.hide();
			}, (error) => {
				if (error.error.grade_code) {
					this.alertService.info("Id already exists", this.alertOptions.autoClose);
				}
			});
		}
	}

	get gradeFormControl(): { [key: string]: AbstractControl } {
		return this.gradeForm.controls;
	}

	resetForm() {
		this.gradeForm.reset(this.actionBtn === 'Submit' ? this.defaultIntialValue : this.intialValue);
	}
}
