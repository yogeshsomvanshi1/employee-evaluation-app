import { DesignationService } from './../services/designation.service';
import { PerformanceService } from "./../services/performance.service";
import { Component, OnInit, TemplateRef, ViewChild } from "@angular/core";
import { forkJoin } from "rxjs";
import { FormGroup, FormBuilder, Validators, AbstractControl } from "@angular/forms";
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";
import { HttpParams } from "@angular/common/http";
import { Designation } from '../model/designation.model';
import { AlertService } from '../../shared/services/alert.service';
import { AlertOptions } from '../../shared/model/alert.model';
import { ValidatorServiceService } from '../../shared/component/validator-service/validator-service.service';
import { TableHeaderMetaData } from '../../shared/model/table-header-list.model';

@Component({
	selector: "app-designation",
	templateUrl: "./designation.component.html",
	styleUrls: ["./designation.component.scss"],
})
export class DesignationComponent implements OnInit {
	@ViewChild('designationTemplate') designationTemplate: TemplateRef<BsModalRef>;
	
	alertOptions: AlertOptions = { autoClose: true, keepAfterRouteChange: true };
	actionBtn: string = "Submit";
	columnsMetadata: TableHeaderMetaData;
	dataDataTable: { results: Array<Designation>, count: number } = { results: [], count: 0 };
	designationForm: FormGroup;
	defaultIntialValue: Designation;
	intialValue: Designation;
	modalRef: BsModalRef;
	params: HttpParams = new HttpParams();
	permission: Array<boolean> = [true, true, true];

	constructor(
		private alertService: AlertService,
		private designationService: DesignationService,
		private formBuilder: FormBuilder,
		private modalService: BsModalService,
		private pattern: ValidatorServiceService,
		private performanceService: PerformanceService,
	) { this.designationForm = this.initForm(); }

	ngOnInit(): void {
		this.defaultIntialValue = this.designationForm.value;
		this.params = this.params.append('offset', 0);
		this.params = this.params.append('limit', 5);
		forkJoin({
			tableHeader: this.performanceService.getDesignationHeaderColumn(),
			tableData: this.designationService.getDesignationContent(this.params),
		}).subscribe(
			(response:any) => {
				this.columnsMetadata = response.tableHeader;
				this.dataDataTable = response.tableData;
			},
			(error) => { }
		);
	}


	changePageSortSearch(data: HttpParams) {
		this.designationService.getDesignationContent(data).subscribe((sucess: { results: Array<Designation>, count: number }) => {
			this.dataDataTable = sucess;
		});
	}

	openTemplate() {
		this.modalRef = this.modalService.show(this.designationTemplate, Object.assign({}, { class: "gray modal-lg " }));
	}

	initForm(): FormGroup {
		return this.formBuilder.group({
			des_code: ['', [Validators.required, Validators.maxLength(10)]],
			des_name: ['', [Validators.required, Validators.maxLength(50)]],
			des_description: ['', [Validators.required, Validators.maxLength(500), Validators.pattern(this.pattern.descriptionValidation())]],
			org_code:['AVISYS', Validators.required],
			is_deleted:[false ],
			created_by:['1'],
			updated_by:['1']
		});
	}

	buttonEvent1(data: any) {
		if (data.event == "add") {
			this.designationFormControl.des_code.enable();
			this.actionBtn = "Submit";
			this.openTemplate();
			this.resetForm();
		} 
		else if (data.event == "edit") {
			this.designationFormControl.des_code.disable();
			this.designationService.getById(data.data.des_code).subscribe((res:Designation) => {
				this.openTemplate();
				this.actionBtn = "Update";
				this.designationForm.patchValue(res);
				this.intialValue = res;
			});

		} 
		else if (data.event == "delete") {
			this.designationService.softDelete(data.data.des_code).subscribe((sucess:Designation) => {
			this.alertService.success("Record Deleted Successfully", this.alertOptions);
				this.changePageSortSearch(this.params);
			})
		}

	}

	submit() {
		if (this.actionBtn !== "Submit") {
			this.designationService.update(this.designationForm.getRawValue(), this.designationFormControl.des_code.value).subscribe((response:Designation) => {
			this.alertService.success("Record Updated Successfully", this.alertOptions);
			this.changePageSortSearch(this.params);
			this.modalRef.hide();
			});
		} 
		else {
			this.designationService.create(this.designationForm.value).subscribe((sucess:Designation) => {
				this.alertService.success("Record Added Successfully", this.alertOptions);
				this.changePageSortSearch(this.params);
			    this.modalRef.hide();
			},
			(error)=>{
				if(error.error.des_code){
					this.alertService.info("Record already exists", this.alertOptions.autoClose = false );
				  }
			});
		}
	}

	get designationFormControl(): { [key: string]: AbstractControl }{
		return this.designationForm.controls;
	}

	resetForm(){
		this.designationForm.reset( this.actionBtn === 'Submit' ? this.defaultIntialValue : this.intialValue );
	}
}
