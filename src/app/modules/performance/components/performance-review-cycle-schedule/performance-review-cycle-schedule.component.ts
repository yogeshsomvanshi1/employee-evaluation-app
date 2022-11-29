import { DropdownService } from './../../services/dropdown.service';
import { AlertService } from './../../../shared/services/alert.service';
import { PerformanceReviewCyclesService } from './../../services/performance-review-cycles.service';
import { PerformanceReviewCycleScheduleService } from './../../services/performance-review-cycle-schedule.service';
import { PerformanceService } from './../../services/performance.service';
import { PerformanceReviewCycleSchedule } from './../../model/performance-review-cycle-schedule.model';
import { AbstractControl, FormGroup, FormBuilder, Validators, ValidationErrors } from '@angular/forms';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { TableHeaderMetaData } from 'src/app/modules/shared/model/table-header-list.model';
import { HttpParams } from '@angular/common/http';
import { forkJoin } from 'rxjs';
import { AlertOptions } from 'src/app/modules/shared/model/alert.model';
import * as moment from 'moment';

@Component({
	selector: 'app-performance-review-cycle-schedule',
	templateUrl: './performance-review-cycle-schedule.component.html',
	styleUrls: ['./performance-review-cycle-schedule.component.scss']
})
export class PerformanceReviewCycleScheduleComponent implements OnInit {

	@ViewChild('performanceReviewCycleSchedule') performanceReviewCycleSCedule: TemplateRef<BsModalRef>;
	actionBtn: string = "Submit";
	alertOptions: AlertOptions = { autoClose: true, keepAfterRouteChange: true };
	columnsMetadata: TableHeaderMetaData;
	cycleId: PerformanceReviewCycleSchedule
	currentPage = 0;
	date: string
	defaultIntialValue: PerformanceReviewCycleSchedule
	dataDataTable: { results: Array<PerformanceReviewCycleSchedule>, count: number } = { results: [], count: 0 };
	intialValue: PerformanceReviewCycleSchedule;
	modalRef: BsModalRef;
	minLastDay: string;
	maxDate: string;
	performanceReviewCyclescheduleForm: FormGroup;
	permission: Array<boolean> = [true, true, true];
	params: HttpParams = new HttpParams();
	phaseId: Array<PerformanceReviewCycleSchedule>=[];

	constructor(
		private alertService: AlertService,
		private dropdownService:DropdownService,
		private formBuilder: FormBuilder,
		private modalService: BsModalService,
		private performanceService: PerformanceService,
		private performanceReviewCycleSheduleService: PerformanceReviewCycleScheduleService,
	) {
		this.performanceReviewCyclescheduleForm = this.initForm();
	}

	initForm(): FormGroup {
		return this.formBuilder.group({
			id: [""],
			preformance_review_cycle_id: ["", [Validators.required]],
			phase_id: ["", [Validators.required, Validators.maxLength(20)]],
			start_date: ["", [Validators.required]],
			end_date: ["", [Validators.required]],
			status:['',[Validators.required]],
			org_code: ["AVISYS"],
			is_deleted: [false],
			created_by: ["1"],
			updated_by: ["1"]
		});
	}	

	changeLastDay() {
		this.performanceReviewCyclescheduleFormControl.end_date.reset();
		let res = this.performanceReviewCyclescheduleFormControl.start_date.value
		this.minLastDay = moment(new Date(res)).add(1, 'day').format('YYYY-MM-DD');
	}	

	ngOnInit(): void {
		forkJoin({
			dataPhaseId: this.dropdownService.getDropdownPerformanceReviewPhasesListContent(),
			dataCycleId: this.dropdownService.getDropdownPerformanceReviewCycleListContent(),
		}).subscribe(
			(response: any) => {
				this.phaseId = response.dataPhaseId.results;
				this.cycleId = response.dataCycleId.results;
			},
			(error) => { }
		);

		this.defaultIntialValue = this.performanceReviewCyclescheduleForm.value;
		this.params = this.params.append('offset', 0);
		this.params = this.params.append('limit', 5);

		forkJoin({
			tableHeader: this.performanceService.getPerformanceReviewCycleScheduleHeaderColumn(),
			tableData: this.performanceReviewCycleSheduleService.getPerformanceReviewCycleScheduleListContent(this.params),
		}).subscribe(
			(response: any) => {
				this.columnsMetadata = response.tableHeader;
				this.dataDataTable = response.tableData;
			},
			(error) => { }
		);
	}

	get performanceReviewCyclescheduleFormControl(): { [key: string]: AbstractControl } {
		return this.performanceReviewCyclescheduleForm.controls;
	}

	changePageSortSearch(data: HttpParams) {
		let offset = data.get('offset')
		let limit =data.get('limit')
		this.currentPage =Number (offset) / Number (limit)
		this.params = data;
		this.performanceReviewCycleSheduleService.getPerformanceReviewCycleScheduleListContent(data).subscribe((sucess: { results: Array<PerformanceReviewCycleSchedule>, count: number }) => {
		this.dataDataTable = sucess;
		});
	}

	openTemplate() {
		this.modalRef = this.modalService.show(this.performanceReviewCycleSCedule, Object.assign({}, { class: "gray modal-lg " })
		);
	}

	buttonEvent1(data: any) {
		if (data.event == "add") {
			this.actionBtn = "Submit";
			this.openTemplate();
			this.resetForm();
		}
		else if (data.event == "edit") {
			this.performanceReviewCycleSheduleService.getById(data.data.id).subscribe((res) => {
			this.openTemplate();
			this.actionBtn = "Update";
			this.performanceReviewCyclescheduleForm.patchValue(res);
			this.intialValue = res;
			});
		}
		else if (data.event == "delete") {
			this.performanceReviewCycleSheduleService.softDelete(data.data.id).subscribe((res: PerformanceReviewCycleSchedule) => {
			this.alertService.success("Record Deleted Successfully", this.alertOptions);
			this.changePageSortSearch(this.params);
		  })
		}
	}

	submit() {

		if (this.actionBtn !== "Submit") {  
			this.performanceReviewCycleSheduleService.update(this.performanceReviewCyclescheduleForm.getRawValue(), this.performanceReviewCyclescheduleFormControl.id.value).subscribe((response: PerformanceReviewCycleSchedule) => {
			this.alertService.success("Record Updated Successfully", this.alertOptions);
			this.params.set('offset' , 0 )
			this.params.set('limit' , 5 )
			this.modalRef.hide();
			this.changePageSortSearch(this.params);
			});
		}
		else {
			this.performanceReviewCycleSheduleService.create(this.performanceReviewCyclescheduleForm.value).subscribe((sucess: PerformanceReviewCycleSchedule) => {
			this.alertService.success("Record Added Successfully", this.alertOptions);
			this.params.set('offset' , 0 )
			this.params.set('limit' , 5 )
			this.changePageSortSearch(this.params);
			this.modalRef.hide();
			}, (error) => {
				if (error.error.id) {
					this.alertService.info("Id already exists", this.alertOptions.autoClose = false);
				}
			});
		}
	}

	resetForm() {
		this.performanceReviewCyclescheduleForm.reset(this.actionBtn === 'Submit' ? this.defaultIntialValue : this.intialValue);

	}
}
