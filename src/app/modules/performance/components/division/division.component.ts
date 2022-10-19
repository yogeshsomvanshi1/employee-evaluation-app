import { Division } from '../../model/division.model';
import { DivisionService } from '../../services/division.service';
import { PerformanceService } from "../../services/performance.service";
import { Component, OnInit, TemplateRef, ViewChild } from "@angular/core";
import { forkJoin } from "rxjs";
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";
import { AbstractControl, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { HttpParams } from "@angular/common/http";
import { AlertOptions } from '../../../shared/model/alert.model';
import { ValidatorServiceService } from '../../../shared/component/validator-service/validator-service.service';
import { AlertService } from '../../../shared/services/alert.service';
import { TableHeaderMetaData } from '../../../shared/model/table-header-list.model';

@Component({
	selector: "app-division",
	templateUrl: "./division.component.html",
	styleUrls: ["./division.component.scss"],
})
export class DivisionComponent implements OnInit {
	@ViewChild('divisionTemplate') divisionTemplate: TemplateRef<BsModalRef>;
	
	alertOptions: AlertOptions = { autoClose: true, keepAfterRouteChange: true };
	actionBtn: string = "Submit";
	columnsMetadata: TableHeaderMetaData;
	dataDataTable: { results: Array<Division>, count: number } = { results: [], count: 0 };
	divisionForm: FormGroup;
	defaultIntialValue: Division;
	intialValue: Division;
	modalRef: BsModalRef;
	permission: Array<boolean> = [true, true, true];
	params: HttpParams = new HttpParams();

	constructor(
		private alertService: AlertService,
		private divisionService: DivisionService,
		private formbuilder: FormBuilder,
		private modalService: BsModalService,
		private pattern: ValidatorServiceService,
		private performanceService: PerformanceService,
	) {
		this.divisionForm = this.initForm();
	}

	ngOnInit(): void {
		this.defaultIntialValue = this.divisionForm.value;
		this.params = this.params.append('offset', 0);
		this.params = this.params.append('limit', 5);
		forkJoin({
			tableHeader: this.performanceService.getDivisionHeaderColumn(),
			tableData: this.divisionService.getDivisionContent(this.params),
		}).subscribe(
			(response:any) => {
				this.columnsMetadata = response.tableHeader;
				this.dataDataTable = response.tableData;
			},
			(error) => { }
		);
	}

	openTemplate() {
		this.modalRef = this.modalService.show(this.divisionTemplate, Object.assign({}, { class: "gray modal-lg " })
		);
	}

	changePageSortSearch(data: HttpParams) {
		this.divisionService.getDivisionContent(data).subscribe((sucess: { results: Array<Division>, count: number }) => {
			this.dataDataTable = sucess;
		});
	}

	initForm(): FormGroup {
		return this.formbuilder.group({
			div_code: ["",  [Validators.required, Validators.maxLength(10)]],
			div_name: ["",  [Validators.required, Validators.maxLength(50)]],
			div_description: ["", [Validators.required, Validators.maxLength(500),Validators.pattern(this.pattern.descriptionValidation())]],
			org_code: ["AVISYS"],
			is_deleted: [false],
			created_by: ["1"],
			updated_by: ["1"],
		});
	}

	submit() {

		if (this.actionBtn !== "Submit") {
			this.divisionService.update(this.divisionForm.getRawValue(), this.divisionFormControl.div_code.value).subscribe((response:Division) => {
				this.changePageSortSearch(this.params);
				this.alertService.success("Record Updated Successfully", this.alertOptions.autoClose);
				this.modalRef.hide();
			});
		} 
		else {
			this.divisionService.create(this.divisionForm.value).subscribe((sucess:Division) => {
				this.changePageSortSearch(this.params);
				this.alertService.success("Record Added Successfully", this.alertOptions.autoClose);
				this.modalRef.hide();
			}, (error)=>{
				if(error.error.div_code){
					this.alertService.info("Record already exists", this.alertOptions.autoClose = false );
				}
			});
		}
	}

	buttonEvent1(data: any) {
		if (data.event == "add") {
			this.openTemplate()
			this.actionBtn = "Submit";
			this.divisionFormControl.div_code.enable();
			this.resetForm();
		}
		else if (data.event == "edit") {
			this.divisionService.getById(data.data.div_code).subscribe((res) => {
				this.openTemplate();
				this.actionBtn = "Update";
				this.divisionFormControl.div_code.disable();
				this.divisionForm.patchValue(res);
				this.intialValue = res;
			});
		}
		else if (data.event == "delete") {
			this.divisionService.softDelete(data.data.div_code).subscribe((sucess:Division) => {
				this.alertService.success("Record Deleted Successfully", this.alertOptions.autoClose);
				this.changePageSortSearch(this.params);
			})
		}
	}

	get divisionFormControl(): { [key: string]: AbstractControl } {
		return this.divisionForm.controls;
	}

	resetForm() {
		this.divisionForm.reset(this.actionBtn === 'Submit' ? this.defaultIntialValue : this.intialValue);
	}

}
