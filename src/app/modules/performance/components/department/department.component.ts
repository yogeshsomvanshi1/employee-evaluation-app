import { HttpParams } from "@angular/common/http";
import { Component, OnInit, TemplateRef, ViewChild } from "@angular/core";
import { AbstractControl, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";
import { forkJoin } from "rxjs";
import { ValidatorServiceService } from '../../../shared/component/validator-service/validator-service.service';
import { AlertOptions } from '../../../shared/model/alert.model';
import { TableHeaderMetaData } from "../../../shared/model/table-header-list.model";
import { Department } from "../../model/department.model";
import { PerformanceService } from "../../services/performance.service";
import { AlertService } from '../../../shared/services/alert.service';
import { DepartmentService } from "../../services/department.service";

@Component({
	selector: "app-department",
	templateUrl: "./department.component.html",
	styleUrls: ["./department.component.scss"]
})
export class DepartmentComponent implements OnInit {

	@ViewChild('departmentTemplate') departmentTemplate: TemplateRef<BsModalRef>;
	
	alertOptions: AlertOptions = { autoClose: true, keepAfterRouteChange: true };
	actionBtn: string = "Submit";
	currentPage=0
	columnsMetadata: TableHeaderMetaData;
	dataDataTable: { results: Array<Department>, count: number } = { results: [], count: 0 };
	defaultIntialValue: Department;
	intialValue: Department;
	modalRef: BsModalRef;
	permission: Array<boolean> = [true, true, true];
	params: HttpParams = new HttpParams();
	departmentForm: FormGroup;
	
  
	constructor(
		private alertService: AlertService,
		private departmentService: DepartmentService,
		private formbuilder: FormBuilder,
		private modalService: BsModalService,
		private performanceService: PerformanceService,
		private pattern: ValidatorServiceService
	) {
		this.departmentForm = this.initForm();
	}

	ngOnInit(): void {
		this.defaultIntialValue = this.departmentForm.value;
		this.params = this.params.append("offset", 0);
		this.params = this.params.append("limit", 5);
		forkJoin({
			tableHeader: this.performanceService.getHeaderColumn(),
			tableData: this.departmentService.getDepartmentContent(this.params),
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
		this.departmentService.getDepartmentContent(data).subscribe((sucess: { results: Array<Department>, count: number }) => {
			this.dataDataTable = sucess;
		});
	}

	initForm(): FormGroup {
		return this.formbuilder.group({
			dept_code: ['', [Validators.required, Validators.maxLength(10)]],
			dept_name: ['', [Validators.required, Validators.maxLength(50)]],
			dept_description: ['', [Validators.required, Validators.maxLength(500), Validators.pattern(this.pattern.descriptionValidation())]],
			org_code : ["AVISYS"],
			is_deleted : [false],
			created_by : ["1"],
			updated_by : ["1"]
		});
	}

	openTemplate() {
		this.modalRef = this.modalService.show(this.departmentTemplate, Object.assign({}, { class: "gray modal-lg " }));
	}

	submit() {

		if (this.actionBtn !== "Submit") {
			this.departmentService.update(this.departmentForm.getRawValue(), this.departmentFormControl.dept_code.value).subscribe((response: Department) => {
			this.alertService.success("Record Updated Successfully", this.alertOptions);
			this.params.set('offset' , 0 )
			this.params.set('limit' , 5 )
			this.changePageSortSearch(this.params);
			this.modalRef.hide();
			});
		} else {
			this.departmentService.create(this.departmentForm.value).subscribe((sucess: Department) => {
				this.alertService.success("Record Added Successfully", this.alertOptions);
				this.params.set('offset' , 0 )
				this.params.set('limit' , 5 )
				this.changePageSortSearch(this.params);
				this.modalRef.hide();
			},(error)=>{
				if(error.error.dept_code){
					this.alertService.info("Record already exists", this.alertOptions.autoClose );
				}
			}
			);
		}
	}

	buttonEvent1(data: any) {
		if (data.event == "add") {
			this.departmentFormControl.dept_code.enable();
			this.actionBtn = "Submit";
			this.resetForm();
			this.openTemplate();
		} 
		else if (data.event == "edit") {
			this.departmentFormControl.dept_code.disable();
			this.departmentService.getById(data.data.dept_code).subscribe((res) => {
				this.openTemplate();
				this.actionBtn = "Update";
				this.departmentForm.patchValue(res);
				this.intialValue = res;
			});
		} 
		else if (data.event == "delete") {
			this.departmentService.softDelete(data.data.dept_code).subscribe((sucess) => {
				this.alertService.success("Record Deleted Successfully", this.alertOptions);
				this.changePageSortSearch(this.params);
			})
		}
	}

	get departmentFormControl(): { [key: string]: AbstractControl }{
		return this.departmentForm.controls;
	}

	resetForm(){
		this.departmentForm.reset( this.actionBtn === 'Submit' ? this.defaultIntialValue : this.intialValue );
	}
}
