import { DropdownService } from './../../services/dropdown.service';
import { AlertService } from './../../../shared/services/alert.service';
import { PerformanceService } from './../../services/performance.service';
import { HttpParams } from '@angular/common/http';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { AbstractControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { forkJoin } from 'rxjs';
import { KeyPerformanceAreasEmployeeGradeService } from '../../services/key-performance-areas-employee-grade.service';
import { KeyPerformanceAreasEmployeeGrade } from '../../model/key-performance-areas-employee-grade.model';
import { TableHeaderMetaData } from 'src/app/modules/shared/model/table-header-list.model';
import { AlertOptions } from 'src/app/modules/shared/model/alert.model';

@Component({
	selector: 'app-key-performance-areas-employee-grade',
	templateUrl: './key-performance-areas-employee-grade.component.html',
	styleUrls: ['./key-performance-areas-employee-grade.component.scss']
})
export class KeyPerformanceAreasEmployeeGradeComponent implements OnInit {

	@ViewChild('keyPerformanceAreasEmployeeGrade') keyPerformanceAreasEmployeeGrade: TemplateRef<BsModalRef>;
	actionBtn: string = "Submit";
	alertOptions: AlertOptions = { autoClose: true, keepAfterRouteChange: true };
	columnsMetadata: TableHeaderMetaData;
	currentPage :number = 0;
	defaultIntialValue: KeyPerformanceAreasEmployeeGrade;
	dataDataTable: { results: Array<KeyPerformanceAreasEmployeeGrade>, count: number } = { results: [], count: 0 };
	gradeIds: Array<KeyPerformanceAreasEmployeeGrade> = [];
	intialValue: KeyPerformanceAreasEmployeeGrade;
	keyPerformanceAreasEmployeeGradeForm: FormGroup;
	kpaIds: Array<KeyPerformanceAreasEmployeeGrade> = [];
	modalRef: BsModalRef;
	permission: Array<boolean> = [true, true, true];
	params: HttpParams = new HttpParams();
	
	constructor(
		private alertService: AlertService,
		private dropdownService :DropdownService,
		private formBuilder: FormBuilder,
		private modalService: BsModalService,
		private performanceAreaGradeService: KeyPerformanceAreasEmployeeGradeService,
		private performanceService: PerformanceService,
	) {
		this.keyPerformanceAreasEmployeeGradeForm = this.initForm();
	}

	ngOnInit(): void {

		this.defaultIntialValue = this.keyPerformanceAreasEmployeeGradeForm.value;
		this.params = this.params.append('offset', 0);
		this.params = this.params.append('limit', 5);

		forkJoin({
			tableHeader: this.performanceService.getKeyPerformanceAreaEmployeeGradeHeaderColumn(),
			tableData: this.performanceAreaGradeService.getKeyPerformanceAreaEmployeeGradeListContent(this.params),
		}).subscribe(
			(response: any) => {
				this.columnsMetadata = response.tableHeader;
				this.dataDataTable = response.tableData;
			});


		forkJoin({
			tableDataGradeId: this.dropdownService.getDropdownGradeContent(),
			tableDataKpaId: this.dropdownService.getDropdowntKeyPerformanceListContent(),
		}).subscribe(
			(response: any) => {
				this.gradeIds = response.tableDataGradeId.results
				this.kpaIds = response.tableDataKpaId.results	
			});
	}

	initForm(): FormGroup {
		return this.formBuilder.group({
			id: [""],
			weightage: ["", [Validators.required, Validators.maxLength(7),]],
			kpa_id: ["", Validators.required],
			garde_id: ["", Validators.required],
			org_code: ["AVISYS"],
			is_deleted: [false],
			created_by: ["1"],
			updated_by: ["1"]
		});
	}

	openTemplate() {
		this.modalRef = this.modalService.show(this.keyPerformanceAreasEmployeeGrade, Object.assign({}, { class: "gray modal-lg " })
		);
	}

	get keyPerformanceAreasGradeFormControl(): { [key: string]: AbstractControl } {
		return this.keyPerformanceAreasEmployeeGradeForm.controls;
	}

	buttonEvent1(data: any) {
		if (data.event == "add") {
			this.actionBtn = "Submit";
			this.openTemplate();
			this.resetForm();
		}
		else if (data.event == "edit") {
			this.performanceAreaGradeService.getById(data.data.id).subscribe((res) => {
			this.openTemplate();
			this.actionBtn = "Update";
			this.keyPerformanceAreasEmployeeGradeForm.patchValue(res);
			this.intialValue = res;

			});
		}
		else if (data.event == "delete") {
			this.performanceAreaGradeService.softDelete(data.data.id).subscribe((res: KeyPerformanceAreasEmployeeGrade) => {
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
		this.performanceAreaGradeService.getKeyPerformanceAreaEmployeeGradeListContent(data).subscribe((sucess: { results: Array<KeyPerformanceAreasEmployeeGrade>, count: number }) => {
		this.dataDataTable = sucess;
		});
	}

	submit() {
		if (this.actionBtn !== "Submit") {
			this.performanceAreaGradeService.update(this.keyPerformanceAreasEmployeeGradeForm.value, this.keyPerformanceAreasGradeFormControl.id.value).subscribe((response: KeyPerformanceAreasEmployeeGrade) => {
			this.alertService.success("Record Updated Successfully", this.alertOptions);
			this.params.set('offset' , 0 )
			this.params.set('limit' , 5 )
			this.modalRef.hide();
			this.changePageSortSearch(this.params);
			});
		}
		else {
			this.performanceAreaGradeService.create(this.keyPerformanceAreasEmployeeGradeForm.value).subscribe((sucess: KeyPerformanceAreasEmployeeGrade) => {
			this.alertService.success("Record Added Successfully", this.alertOptions);
			this.params.set('offset' , 0 )
			this.params.set('limit' , 5 )
			this.changePageSortSearch(this.params);
			this.modalRef.hide();
			}, (error) => {
				if (error.error.id) {
					this.alertService.info("Id already exists", this.alertOptions.autoClose);
				}
			});
		}
	}

	resetForm() {
		this.keyPerformanceAreasEmployeeGradeForm.reset(this.actionBtn === 'Submit' ? this.defaultIntialValue : this.intialValue);
	}
}
