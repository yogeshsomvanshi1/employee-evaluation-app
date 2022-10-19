import { Role } from '../../model/role.model';
import { RoleService } from "../../services/role.service";
import { PerformanceService } from "../../services/performance.service";
import { Component, OnInit, TemplateRef, ViewChild } from "@angular/core";
import { forkJoin } from "rxjs";
import { AbstractControl, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";
import { HttpParams } from "@angular/common/http";
import { AlertOptions } from '../../../shared/model/alert.model';
import { AlertService } from '../../../shared/services/alert.service';
import { ValidatorServiceService } from '../../../shared/component/validator-service/validator-service.service';
import { TableHeaderMetaData } from '../../../shared/model/table-header-list.model';

@Component({
	selector: "app-role",
	templateUrl: "./role.component.html",
	styleUrls: ["./role.component.scss"]
})
export class RoleComponent implements OnInit {
	@ViewChild('roleTemplate') roleTemplate: TemplateRef<BsModalRef>;
	
	actionBtn: string = "Submit";
	alertOptions: AlertOptions = { autoClose: true, keepAfterRouteChange: true };
	defaultIntialValue: Role;
	intialValue: Role;
	columnsMetadata: TableHeaderMetaData;
	dataDataTable: { results: Array<Role>, count: number } = { results: [], count: 0 };
	permission: Array<boolean> = [true, true, true];
	roleForm: FormGroup;
	modalRef: BsModalRef;
	params: HttpParams = new HttpParams();

	constructor(
		private alertService: AlertService,
		private formBuilder: FormBuilder,
		private modalService: BsModalService,
		private pattern: ValidatorServiceService,
		private performanceService: PerformanceService,
		private roleService: RoleService
	) {
		this.roleForm = this.initForm();
	}

	ngOnInit(): void {
		this.defaultIntialValue = this.roleForm.value;
		this.params = this.params.append("offset", 0);
		this.params = this.params.append("limit", 5);
		forkJoin({
			tableHeader: this.performanceService.getRoleHeaderColumn(),
			tableData: this.roleService.getRoleContent(this.params),
		}).subscribe(
			(response:any) => {
				this.columnsMetadata = response.tableHeader;
				this.dataDataTable = response.tableData;
			},
			(error) => { }
		);
	}

	changePageSortSearch(data: HttpParams) {
		this.roleService.getRoleContent(data).subscribe((sucess: { results: Array<Role>, count: number }) => {
			this.dataDataTable = sucess;
		});
	}

	openTemplate() {
		this.modalRef = this.modalService.show(this.roleTemplate, Object.assign({}, { class: "gray modal-lg " }));
	}

	initForm(): FormGroup {
		return this.formBuilder.group({
			role_code: ["", [Validators.required, Validators.maxLength(10)]],
			role_name: ["", [Validators.required, Validators.maxLength(50)]],
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
			this.roleFormControl.role_code.enable();
			this.resetForm();
		}
		else if (data.event == "edit") {
			this.roleService.getById(data.data.role_code).subscribe((res:Role) => {
				this.openTemplate();
				this.actionBtn = "Update";
				this.roleFormControl.role_code.disable();
				this.roleForm.patchValue(res);
				this.intialValue = res;
			});
		}
		else if (data.event == "delete") {
			this.roleService.softDelete(data.data.role_code).subscribe((sucess:Role) => {
				this.alertService.success("Record Deleted Successfully", this.alertOptions.autoClose);
				this.changePageSortSearch(this.params);
			})
		}
	}

	submit() {
		if (this.actionBtn !== "Submit") {
			this.roleService.update(this.roleForm.getRawValue(), this.roleFormControl.role_code.value).subscribe((response: Role) => {
				this.alertService.success("Record Updated Successfully", this.alertOptions.autoClose);
				this.changePageSortSearch(this.params);
				this.modalRef.hide();
			})
		} else {
			this.roleService.create(this.roleForm.value).subscribe((sucess: Role) => {
				this.alertService.success("Record Added Successfully", this.alertOptions.autoClose);
				this.changePageSortSearch(this.params);
				this.modalRef.hide();
			},
				(error) => {
					if (error.error.role_code) {
						this.alertService.info("Record already exists", this.alertOptions.autoClose = false);
					}
				});
		}
	}


	get roleFormControl(): { [key: string]: AbstractControl } {
		return this.roleForm.controls;
	}

	resetForm() {
		this.roleForm.reset(this.actionBtn === 'Submit' ? this.defaultIntialValue : this.intialValue);
	}
}
