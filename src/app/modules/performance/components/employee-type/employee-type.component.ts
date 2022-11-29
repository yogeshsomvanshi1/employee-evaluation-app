import { HttpParams } from '@angular/common/http';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { forkJoin } from 'rxjs';
import { alphaNumeric, nameAndDescription } from 'src/app/modules/shared/component/validators/validation';
import { AlertOptions } from 'src/app/modules/shared/model/alert.model';
import { TableHeaderMetaData } from 'src/app/modules/shared/model/table-header-list.model';
import { AlertService } from 'src/app/modules/shared/services/alert.service';
import { EmployeeTypeService } from '../../services/employee-type.service';
import { PerformanceService } from '../../services/performance.service';
import { EmployeeType } from './../../model/employee-type.model';

@Component({
  selector: 'app-employee-type',
  templateUrl: './employee-type.component.html',
  styleUrls: ['./employee-type.component.scss']
})
export class EmployeeTypeComponent implements OnInit {

	@ViewChild('employeeTypeTemplate') employeeTypeTemplate: TemplateRef<BsModalRef>;
	actionBtn: string = "Submit";
	alertOptions: AlertOptions = { autoClose: true, keepAfterRouteChange: true };
	currentPage = 0;
	columnsMetadata: TableHeaderMetaData;
	defaultIntialValue: EmployeeType;
	dataDataTable: { results: Array<EmployeeType>, count: number } = { results: [], count: 0 };
	empTypeForm: FormGroup;
	intialValue: EmployeeType;
	modalRef: BsModalRef;
	permission: Array<boolean> = [true, true, true];
	params: HttpParams = new HttpParams();

	constructor(
		private alertService: AlertService,
    	private employeeService: EmployeeTypeService,
		private formBuilder: FormBuilder,
		private modalService: BsModalService,
		private performanceService: PerformanceService,
	) {
		this.empTypeForm = this.initForm();
	}

	ngOnInit(): void {
		this.defaultIntialValue = this.empTypeForm.value;
		this.params = this.params.append("offset", 0);
		this.params = this.params.append("limit", 5);
		forkJoin({
			tableHeader: this.performanceService.getEmployeeTypeHeader(),
			tableData: this.employeeService.getEmployeeTypeContent(this.params),
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
		this.employeeService.getEmployeeTypeContent(data).subscribe((sucess: { results: Array<EmployeeType>, count: number }) => {
		this.dataDataTable = sucess;
		});
	}

	openTemplate() {
		this.modalRef = this.modalService.show(this.employeeTypeTemplate, Object.assign({}, { class: "gray modal-lg " }));
	}

	initForm(): FormGroup {
		return this.formBuilder.group({
			emp_type_code: ["", [Validators.required, Validators.maxLength(10),alphaNumeric]],
			emp_type_name: ["", [Validators.required, Validators.maxLength(50),nameAndDescription]],
			org_code: ["AVISYS"],
			is_deleted: [false],
			created_by: ["1"],
			updated_by: ["1"],
		});
	}

	buttonEvent1(data: any) {
		if (data.event == "add") {
			this.actionBtn = "Submit";
			this.openTemplate();
			this.employeeTypeFormControl.emp_type_code.enable();
			this.resetForm();
		}
		else if (data.event == "edit") {
			this.employeeService.getById(data.data.emp_type_code).subscribe((res:EmployeeType) => {
			this.openTemplate();
			this.actionBtn = "Update";
			this.employeeTypeFormControl.emp_type_code.disable();
			this.empTypeForm.patchValue(res);
			this.intialValue = res;
			});
		}
		else if (data.event == "delete") {
			this.employeeService.softDelete(data.data.emp_type_code).subscribe((sucess:EmployeeType) => {
			this.alertService.success("Record Deleted Successfully", this.alertOptions);
			this.changePageSortSearch(this.params);
			})
		}
	}

	submit() {
		if (this.actionBtn !== "Submit") {
			this.employeeService.update(this.empTypeForm.getRawValue(), this.employeeTypeFormControl.emp_type_code.value).subscribe((response: EmployeeType) => {
			this.alertService.success("Record Updated Successfully", this.alertOptions);
			this.params.set('offset' , 0 )
			this.params.set('limit' , 5 )
			this.changePageSortSearch(this.params);
			this.modalRef.hide();
			})
		} else {
			this.employeeService.create(this.empTypeForm.value).subscribe((sucess: EmployeeType) => {
			this.alertService.success("Record Added Successfully", this.alertOptions);
			this.params.set('offset' , 0 )
			this.params.set('limit' , 5 )
			this.changePageSortSearch(this.params);
			this.modalRef.hide();
			},
			(error) => {
				if (error.error.emp_type_code) {
					this.alertService.info("Id already exists", this.alertOptions.autoClose);
				}
			});
		}
	}


	get employeeTypeFormControl(): { [key: string]: AbstractControl } {
		return this.empTypeForm.controls;
	}

	resetForm() {
		this.empTypeForm.reset(this.actionBtn === 'Submit' ? this.defaultIntialValue : this.intialValue);
	}

}
