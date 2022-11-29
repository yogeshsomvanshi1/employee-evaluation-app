import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { PerformanceReviewPhasesService } from './../../services/performance-review-phases.service';
import { PerformanceService } from './../../services/performance.service';
import { HttpParams } from '@angular/common/http';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { forkJoin } from 'rxjs';
import { TableHeaderMetaData } from 'src/app/modules/shared/model/table-header-list.model';
import { PerformanceReviewPhases } from '../../model/performance-review-phases.model';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AlertOptions } from 'src/app/modules/shared/model/alert.model';
import { AlertService } from 'src/app/modules/shared/services/alert.service';
import { alphaNumeric, nameAndDescription } from 'src/app/modules/shared/component/validators/validation';

@Component({
	selector: 'app-performance-review-phases',
	templateUrl: './performance-review-phases.component.html',
	styleUrls: ['./performance-review-phases.component.scss']
})
export class PerformanceReviewPhasesComponent implements OnInit {

	@ViewChild('performanceReviewPhases') performanceReviewPhase: TemplateRef<BsModalRef>;
	actionBtn: string = "Submit";
	alertOptions: AlertOptions = { autoClose: true, keepAfterRouteChange: true };
	columnsMetadata: TableHeaderMetaData;
	currentPage = 0;
	defaultIntialValue: PerformanceReviewPhases;
	dataDataTable: { results: Array<PerformanceReviewPhases>, count: number } = { results: [], count: 0 };
	intialValue: PerformanceReviewPhases;
	modalRef: BsModalRef
	params: HttpParams = new HttpParams();
	permission: Array<boolean> = [true, true, true];
	performanceReviewPhasesForm: FormGroup
	
	constructor(
		private alertService: AlertService,
		private formBuilder: FormBuilder,
		private modalService: BsModalService,
		private performanceService: PerformanceService,
		private performanceReviwPhasesService: PerformanceReviewPhasesService,
	) {
		this.performanceReviewPhasesForm = this.initForm();
	}

	initForm(): FormGroup {
		return this.formBuilder.group({
			// id :[""],
			phase_id: ["", [Validators.required, Validators.maxLength(10),alphaNumeric]],
			phase_short_name: ["", [Validators.required, Validators.maxLength(200),nameAndDescription]],
			phase_description: ["", [Validators.required, Validators.maxLength(250),nameAndDescription]],
			org_code: ["AVISYS"],
			is_deleted: [false],
			created_by: ["1"],
			updated_by: ["1"]
		});
	}

	ngOnInit(): void {
		this.defaultIntialValue = this.performanceReviewPhasesForm.value;
		this.params = this.params.append('offset', 0);
		this.params = this.params.append('limit', 5);

		forkJoin({
			tableHeader: this.performanceService.getPerformanceReviewPhasesHeaderColumn(),
			tableData: this.performanceReviwPhasesService.getPerformanceReviewPhasesListContent(this.params),
		}).subscribe(
			(response: any) => {
				this.columnsMetadata = response.tableHeader;
				this.dataDataTable = response.tableData;
			},
			(error) => { }
		);
	}

	buttonEvent1(data: any) {
		if (data.event == "add") {
			this.actionBtn = "Submit";
			this.openTemplate();
			this.performanceReviewPhasesControl.phase_id.enable();
			this.resetForm();
		}
		else if (data.event == "edit") {
			this.performanceReviwPhasesService.getById(data.data.phase_id).subscribe((res) => {
			this.openTemplate();
			this.actionBtn = "Update";
			this.performanceReviewPhasesForm.patchValue(res);
			this.performanceReviewPhasesControl.phase_id.disable();
			this.intialValue = res;
			});
		}
		else if (data.event == "delete") {
			this.performanceReviwPhasesService.softDelete(data.data.phase_id).subscribe((res: PerformanceReviewPhases) => {
			this.alertService.success("Record Deleted Successfully", this.alertOptions);
			this.changePageSortSearch(this.params);
			})
		}
	}

	changePageSortSearch(data: HttpParams) {
		let offset = data.get('offset')
		let limit =data.get('limit')
		this.currentPage =Number (offset) / Number (limit)
		this.params = data;
		this.performanceReviwPhasesService.getPerformanceReviewPhasesListContent(data).subscribe((sucess: { results: Array<PerformanceReviewPhases>, count: number }) => {
		this.dataDataTable = sucess;
		});
	}

	openTemplate() {
		this.modalRef = this.modalService.show(this.performanceReviewPhase, Object.assign({}, { class: "gray modal-lg " })
		);
	}

	get performanceReviewPhasesControl(): { [key: string]: AbstractControl } {
		return this.performanceReviewPhasesForm.controls;
	}

	submit() {
		if (this.actionBtn !== "Submit") {
			this.performanceReviwPhasesService.update(this.performanceReviewPhasesForm.getRawValue(), this.performanceReviewPhasesControl.phase_id.value).subscribe((response: PerformanceReviewPhases) => {
			this.alertService.success("Record Updated Successfully", this.alertOptions);
			this.params.set('offset' , 0 )
			this.params.set('limit' , 5 )
			this.modalRef.hide();
			this.changePageSortSearch(this.params);
			});
		}
		else {
			this.performanceReviwPhasesService.create(this.performanceReviewPhasesForm.value).subscribe((sucess: PerformanceReviewPhases) => {
			this.alertService.success("Record Added Successfully", this.alertOptions);
			this.params.set('offset' , 0 )
			this.params.set('limit' , 5 )
			this.changePageSortSearch(this.params);
			this.modalRef.hide();
			}, (error) => {
				if (error.error.phase_id) {
					this.alertService.info("Id already exists", this.alertOptions.autoClose);
				}
			});
		}
	}

	resetForm() {
		this.performanceReviewPhasesForm.reset(this.actionBtn === 'Submit' ? this.defaultIntialValue : this.intialValue);
	}

}
