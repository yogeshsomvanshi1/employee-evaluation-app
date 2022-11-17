import { DropdownService } from './../../services/dropdown.service';
import { PerformanceReviewTypes } from './../../model/performance-review-type.model';
import { PerformanceReviewCycles } from './../../model/performance-review-cycles.model';
import { PerformanceReviewCyclesService } from './../../services/performance-review-cycles.service';
import { PerformanceService } from './../../services/performance.service';
import { AbstractControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { forkJoin } from 'rxjs';
import { HttpParams } from '@angular/common/http';
import { TableHeaderMetaData } from 'src/app/modules/shared/model/table-header-list.model';
import { AlertService } from 'src/app/modules/shared/services/alert.service';
import { AlertOptions } from 'src/app/modules/shared/model/alert.model';

@Component({
	selector: 'app-performance-review-cycles',
	templateUrl: './performance-review-cycles.component.html',
	styleUrls: ['./performance-review-cycles.component.scss']
})
export class PerformanceReviewCyclesComponent implements OnInit {

	@ViewChild('performanceReviewCycle') performanceReviewCycleSCedule: TemplateRef<BsModalRef>;
	actionBtn: string = "Submit";
	alertOptions: AlertOptions = { autoClose: true, keepAfterRouteChange: true };
	columnsMetadata: TableHeaderMetaData;
	currentPage=0;
	dataDataTable: { results: Array<PerformanceReviewCycles>, count: number } = { results: [], count: 0 };
	defaultIntialValue: PerformanceReviewCycles;
	intialValue: PerformanceReviewCycles;
	modalRef: BsModalRef;
	permission: Array<boolean> = [true, true, true];
	params: HttpParams = new HttpParams();
	performanceReviewType : Array<PerformanceReviewTypes>;
	performanceReviewCyclesForm: FormGroup;

	constructor(
		private alertService: AlertService,
		private dropdownService:DropdownService,
		private formBuilder: FormBuilder,
		private modalService: BsModalService,
		private performanceService: PerformanceService,
		private performanceReviewCycleService: PerformanceReviewCyclesService,
	) {
		this.performanceReviewCyclesForm = this.initForm();
	}

	initForm(): FormGroup {

		return this.formBuilder.group({
			preformance_review_cycle_id: ["", [Validators.required, Validators.maxLength(10)]],
			preformance_review_type: ["", [Validators.required]],
			year: ["", [Validators.required, Validators.maxLength(4)]],
			quarter: ["", [Validators.required, Validators.maxLength(2)]],
			status: ["", [Validators.required, Validators.maxLength(15)]],
			org_code: ["AVISYS"],
			is_deleted: [false],
			created_by: ["1"],
			updated_by: ["1"]
		});
	}

	ngOnInit(): void {

		this.dropdownService.getDropdownPerformanceReviewTypeListContent().subscribe((res:any) => {
			this.performanceReviewType = res.results

			console.log(this.performanceReviewType)
		})

		this.defaultIntialValue = this.performanceReviewCyclesForm.value;
		this.params = this.params.append('offset', 0);
		this.params = this.params.append('limit', 5);

		forkJoin({
			tableHeader: this.performanceService.getPerformanceReviewCycleHeaderColumn(),
			tableData: this.performanceReviewCycleService.getPerformanceReviewCycleListContent(this.params),
		}).subscribe(
			(response: any) => {
				this.columnsMetadata = response.tableHeader;
				this.dataDataTable = response.tableData;
			},
			(error) => { }
		);
	}

	get performanceReviewCyclesFormControl(): { [key: string]: AbstractControl } {
		return this.performanceReviewCyclesForm.controls;
	}

	openTemplate() {
		this.modalRef = this.modalService.show(this.performanceReviewCycleSCedule, Object.assign({}, { class: "gray modal-lg " })
		);
	}

	changePageSortSearch(data: HttpParams) {
		let offset = data.get('offset')
		let limit =data.get('limit')
		this.currentPage =Number (offset) / Number (limit)
		this.performanceReviewCycleService.getPerformanceReviewCycleListContent(data).subscribe((sucess: { results: Array<PerformanceReviewCycles>, count: number }) => {
			this.dataDataTable = sucess;
		});
	}

	buttonEvent1(data: any) {
		if (data.event == "add") {
			this.actionBtn = "Submit";
			this.openTemplate();
			this.performanceReviewCyclesFormControl.preformance_review_cycle_id.enable();
			this.resetForm();
		}
		else if (data.event == "edit") {
			this.performanceReviewCycleService.getById(data.data.preformance_review_cycle_id).subscribe((res) => {
				this.openTemplate();
				this.actionBtn = "Update";
				this.performanceReviewCyclesForm.patchValue(res);
				this.performanceReviewCyclesFormControl.preformance_review_cycle_id.disable();
				this.intialValue = res;
			});
		}
		else if (data.event == "delete") {
			this.performanceReviewCycleService.softDelete(data.data.preformance_review_cycle_id).subscribe((res: PerformanceReviewCycles) => {
				this.alertService.success("Record Deleted Successfully", this.alertOptions);
				this.changePageSortSearch(this.params);
			})
		}
	}

	submit() {

		if (this.actionBtn !== "Submit") {
			this.performanceReviewCycleService.update(this.performanceReviewCyclesForm.getRawValue(), this.performanceReviewCyclesFormControl.preformance_review_cycle_id.value).subscribe((response: PerformanceReviewCycles) => {
				this.alertService.success("Record Updated Successfully", this.alertOptions);
				this.params.set('offset' , 0 )
			    this.params.set('limit' , 5 )
				this.modalRef.hide();
				this.changePageSortSearch(this.params);
			});
		}
		else {
			this.performanceReviewCycleService.create(this.performanceReviewCyclesForm.value).subscribe((sucess: PerformanceReviewCycles) => {
				this.alertService.success("Record Added Successfully", this.alertOptions);
				this.params.set('offset' , 0 )
			    this.params.set('limit' , 5 )
				this.changePageSortSearch(this.params);
				this.modalRef.hide();
			}, (error) => {
				if (error.error.preformance_review_cycle_id) {
					this.alertService.info("Record already exists", this.alertOptions.autoClose);
				}
			});
		}

	}


	resetForm() {
		this.performanceReviewCyclesForm.reset(this.actionBtn === 'Submit' ? this.defaultIntialValue : this.intialValue);
	}
}
