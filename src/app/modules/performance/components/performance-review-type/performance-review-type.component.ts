import { alphaNumeric, nameAndDescription } from 'src/app/modules/shared/component/validators/validation';
import { AlertService } from './../../../shared/services/alert.service';
import { PerformanceReviewTypeService } from './../../services/performance-review-type.service';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { forkJoin } from 'rxjs';
import { PerformanceService } from '../../services/performance.service';
import { HttpParams } from '@angular/common/http';
import { TableHeaderMetaData } from 'src/app/modules/shared/model/table-header-list.model';
import { PerformanceReviewTypes } from '../../model/performance-review-type.model';
import { AlertOptions } from 'src/app/modules/shared/model/alert.model';
import { ValidatorServiceService } from 'src/app/modules/shared/component/validator-service/validator-service.service';

@Component({
	selector: 'app-performance-review-type',
	templateUrl: './performance-review-type.component.html',
	styleUrls: ['./performance-review-type.component.scss']
})
export class PerformanceReviewTypeComponent implements OnInit {

	@ViewChild('performanceReviewType') performanceReviewType: TemplateRef<BsModalRef>;
	actionBtn: string = "Submit";
	alertOptions: AlertOptions = { autoClose: true, keepAfterRouteChange: true };
	columnsMetadata: TableHeaderMetaData;
	currentPage :number = 0;
	dataDataTable: { results: Array<PerformanceReviewTypes>, count: number } = { results: [], count: 0 };
	defaultIntialValue: PerformanceReviewTypes;
	intialValue: PerformanceReviewTypes;
	modalRef: BsModalRef;
	performanceReviewTypeForm: FormGroup;
	permission: Array<boolean> = [true, true, true];
	params: HttpParams = new HttpParams();

	constructor(
		private alertService: AlertService,
		private formBuilder: FormBuilder,
		private modalService: BsModalService,
		private performanceService: PerformanceService,
		private performanceReviewTypeService: PerformanceReviewTypeService,
		private pattern: ValidatorServiceService,
	) {
		this.performanceReviewTypeForm = this.initForm();
	}

	ngOnInit(): void {
		this.defaultIntialValue = this.performanceReviewTypeForm.value;
		this.params = this.params.append('offset', 0);
		this.params = this.params.append('limit', 5);

		forkJoin({
			tableHeader: this.performanceService.getPerformanceReviewTypeHeaderColumn(),
			tableData: this.performanceReviewTypeService.getPerformanceReviewTypeListContent(this.params),
		}).subscribe(
			(response: any) => {
				this.columnsMetadata = response.tableHeader;
				this.dataDataTable = response.tableData;
			});
	}

	initForm(): FormGroup {
		return this.formBuilder.group({
			id: [""],
			performance_review_type: ["", [Validators.required, Validators.maxLength(10),alphaNumeric]],
			description: ["", [Validators.required, Validators.maxLength(200), Validators.pattern(this.pattern.descriptionValidation()),nameAndDescription]],
			org_code: ["AVISYS"],
			is_deleted: [false],
			created_by: ["1"],
			updated_by: ["1"]
		});
	}
	
	openTemplate() {
		this.modalRef = this.modalService.show(this.performanceReviewType, Object.assign({}, { class: "gray modal-lg " })
		);
	}

	get performanceReviewTypeControl(): { [key: string]: AbstractControl } {
		return this.performanceReviewTypeForm.controls;
	}

	changePageSortSearch(data: HttpParams) {
		let offset = data.get('offset')
		let limit =data.get('limit')
		this.currentPage =Number (offset) / Number (limit)
		this.params = data;
		this.performanceReviewTypeService.getPerformanceReviewTypeListContent(data).subscribe((sucess: { results: Array<PerformanceReviewTypes>, count: number }) => {
		this.dataDataTable = sucess;
		});
	}

	buttonEvent1(data: any) {
		if (data.event == "add") {
			this.actionBtn = "Submit";
			this.openTemplate();
			this.performanceReviewTypeControl.performance_review_type.enable();
			this.resetForm();
		}
		else if (data.event == "edit") {
			this.performanceReviewTypeService.getById(data.data.performance_review_type).subscribe((res) => {
			this.openTemplate();
			this.actionBtn = "Update";
			this.performanceReviewTypeForm.patchValue(res);
			this.performanceReviewTypeControl.performance_review_type.disable();
			this.intialValue = res;
			});
		}
		else if (data.event == "delete") {
			this.performanceReviewTypeService.softDelete(data.data.performance_review_type).subscribe((res: PerformanceReviewTypes) => {
			this.alertService.success("Record Deleted Successfully", this.alertOptions);
			this.changePageSortSearch(this.params);
			})
		}
	}

	submit() {
		if (this.actionBtn !== "Submit") {
			this.performanceReviewTypeService.update(this.performanceReviewTypeForm.getRawValue(), this.performanceReviewTypeControl.performance_review_type.value).subscribe((response: PerformanceReviewTypes) => {
			this.alertService.success("Record Updated Successfully", this.alertOptions);
			this.params.set('offset' , 0 )
			this.params.set('limit' , 5 )
			this.modalRef.hide();
			this.changePageSortSearch(this.params);
			});
		}
		else {
			this.performanceReviewTypeService.create(this.performanceReviewTypeForm.value).subscribe((sucess: PerformanceReviewTypes) => {
			this.alertService.success("Record Added Successfully", this.alertOptions);
			this.params.set('offset' , 0 )
			this.params.set('limit' , 5 )
			this.changePageSortSearch(this.params);
			this.modalRef.hide();
			}, (error) => {
				if (error.error.performance_review_type) {
					this.alertService.info("Id already exists", this.alertOptions.autoClose);
				}
			});
		}
	}

	resetForm() {
		this.performanceReviewTypeForm.reset(this.actionBtn === 'Submit' ? this.defaultIntialValue : this.intialValue);
	}

}
