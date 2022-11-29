import { AlertService } from './../../../shared/services/alert.service';
import { PerformanceService } from './../../services/performance.service';
import { KeyPerformanceList } from '../../model/key-performance-areas.model';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ValidatorServiceService } from '../../../shared/component/validator-service/validator-service.service';
import { forkJoin } from 'rxjs';
import { TableHeaderMetaData } from 'src/app/modules/shared/model/table-header-list.model';
import { HttpParams } from '@angular/common/http';
import { AlertOptions } from 'src/app/modules/shared/model/alert.model';
import { KeyPerformanceAreaService } from '../../services/key-performance-area.service';

@Component({
	selector: 'app-key-performance-area',
	templateUrl: './key-performance-area.component.html',
	styleUrls: ['./key-performance-area.component.scss']
})
export class KeyPerformanceAreaComponent implements OnInit {

	@ViewChild('keyPerformanceAreas') keyPerformanceList: TemplateRef<BsModalRef>;
	actionBtn: string = "Submit";
	alertOptions: AlertOptions = { autoClose: true, keepAfterRouteChange: true };
	columnsMetadata: TableHeaderMetaData;
	currentPage=0;
	defaultIntialValue: KeyPerformanceList;
	dataDataTable: { results: Array<KeyPerformanceList>, count: number } = { results: [], count: 0 };
	intialValue: KeyPerformanceList;
	keyPerformanceForm: FormGroup;
	modalRef: BsModalRef;
	permission: Array<boolean> = [true, true, true];
	params: HttpParams = new HttpParams();

	constructor(
		private alertService: AlertService,
		private formBuilder: FormBuilder,
		private keyPerformanceService: KeyPerformanceAreaService,
		private modalService: BsModalService,
		private pattern: ValidatorServiceService,
		private performanceService: PerformanceService,
	) {
		this.keyPerformanceForm = this.initForm();
	}

	initForm(): FormGroup {

		return this.formBuilder.group({
			kpa_id: ["", [Validators.required, Validators.maxLength(10)]],
			kpa_description: ["", [Validators.required, Validators.maxLength(200), Validators.pattern(this.pattern.descriptionValidation())]],
			org_code: ["AVISYS"],
			is_deleted: [false],
			created_by: ["1"],
			updated_by: ["1"]
		});
	}

	ngOnInit(): void {
		this.defaultIntialValue = this.keyPerformanceForm.value;
		this.params = this.params.append('offset', 0);
		this.params = this.params.append('limit', 5);

		forkJoin({
			tableHeader: this.performanceService.getKeyPerformanceAreaHeaderColumn(),
			tableData: this.keyPerformanceService.getKeyPerformanceListContent(this.params),
		}).subscribe(
			(response: any) => {
				this.columnsMetadata = response.tableHeader;
				this.dataDataTable = response.tableData;
			},
			(error) => { }
		);
	}

	submit() {
		if (this.actionBtn !== "Submit") {
			this.keyPerformanceService.update(this.keyPerformanceForm.getRawValue(), this.keyPerformanceFormControl.kpa_id.value).subscribe((response: KeyPerformanceList) => {
				this.alertService.success("Record Updated Successfully", this.alertOptions);
				this.params.set('offset' , 0 )
			    this.params.set('limit' , 5 )
				this.modalRef.hide();
				this.changePageSortSearch(this.params);
			});
		}
		else {
			this.keyPerformanceService.create(this.keyPerformanceForm.value).subscribe((sucess: KeyPerformanceList) => {
				this.alertService.success("Record Added Successfully", this.alertOptions);
				this.params.set('offset' , 0 )
			    this.params.set('limit' , 5 )
				this.changePageSortSearch(this.params);
				this.modalRef.hide();
			}, (error) => {
				if (error.error.kpa_id) {
					this.alertService.info("Record already exists", this.alertOptions.autoClose);
				}
			});
		}
	}


	get keyPerformanceFormControl(): { [key: string]: AbstractControl } {
		return this.keyPerformanceForm.controls;
	}

	openTemplate() {
		this.modalRef = this.modalService.show(this.keyPerformanceList, Object.assign({}, { class: "gray modal-lg " })
		);
	}

	changePageSortSearch(data: HttpParams) {
		let offset = data.get('offset')
		let limit =data.get('limit')
		this.currentPage =Number (offset) / Number (limit)

		this.keyPerformanceService.getKeyPerformanceListContent(data).subscribe((sucess: { results: Array<KeyPerformanceList>, count: number }) => {
			this.dataDataTable = sucess;
		});
	}

	buttonEvent1(data: any) {
		if (data.event == "add") {
			this.actionBtn = "Submit";
			this.openTemplate();
			this.keyPerformanceFormControl.kpa_id.enable();
			this.resetForm();
		}
		else if (data.event == "edit") {

			this.keyPerformanceService.getById(data.data.kpa_id).subscribe((res :KeyPerformanceList) => {
			this.openTemplate();
			this.actionBtn = "Update";
			this.keyPerformanceForm.patchValue(res);
			this.keyPerformanceFormControl.kpa_id.disable();
			this.intialValue = res;
			});
		}
		else if (data.event == "delete") {
			this.keyPerformanceService.softDelete(data.data.kpa_id).subscribe((res: KeyPerformanceList) => {
				this.alertService.success("Record Deleted Successfully", this.alertOptions);
				this.changePageSortSearch(this.params);
			})
		}
	}

	resetForm() {
		this.keyPerformanceForm.reset(this.actionBtn === 'Submit' ? this.defaultIntialValue : this.intialValue);
	}
}


