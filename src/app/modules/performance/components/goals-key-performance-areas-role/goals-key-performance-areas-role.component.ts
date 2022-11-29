import { DropdownService } from './../../services/dropdown.service';
import { AlertService } from './../../../shared/services/alert.service';
import { PerformanceService } from './../../services/performance.service';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { forkJoin } from 'rxjs';
import { TableHeaderMetaData } from 'src/app/modules/shared/model/table-header-list.model';
import { GoalsKeyPerformanceAreasRole } from '../../model/golas-key-performance-areas-role.model';
import { HttpParams } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AlertOptions } from 'src/app/modules/shared/model/alert.model';
import { GoalsKeyperformanceAreasRolesService } from '../../services/goals-key-performance-areas-roles.service';
import { ValidatorServiceService } from 'src/app/modules/shared/component/validator-service/validator-service.service';
import { alphaNumeric, nameAndDescription } from 'src/app/modules/shared/component/validators/validation';

@Component({
	selector: 'app-goals-key-performance-areas-role',
	templateUrl: './goals-key-performance-areas-role.component.html',
	styleUrls: ['./goals-key-performance-areas-role.component.scss']
})
export class GoalsKeyPerformanceAreasRoleComponent implements OnInit {

	@ViewChild('goalsKeyPerformanceRole') goalsKeyPerformanceRole: TemplateRef<BsModalRef>;
	actionBtn: string = "Submit";
	alertOptions: AlertOptions = { autoClose: true, keepAfterRouteChange: true };
	columnsMetadata: TableHeaderMetaData;
	currentPage = 0;
	dataDataTable: { results: Array<GoalsKeyPerformanceAreasRole>, count: number } = { results: [], count: 0 };
	defaultIntialValue: GoalsKeyPerformanceAreasRole;
	goalsKeyPerformanceRoleForm: FormGroup;
	intialValue: GoalsKeyPerformanceAreasRole;
	kpaIds: Array<GoalsKeyPerformanceAreasRole> = [];
	modalRef: BsModalRef;
	permission: Array<boolean> = [true, true, true];
	params: HttpParams = new HttpParams();
	roleIds: Array<GoalsKeyPerformanceAreasRole>=[];


	constructor(
		private alertService: AlertService,
		private dropdownService:DropdownService,
		private formBuilder: FormBuilder,
		private goalsKeyPerformanceRolesService: GoalsKeyperformanceAreasRolesService,
		private modalService: BsModalService,
		private performanceService: PerformanceService,
		private pattern: ValidatorServiceService,
	) {

		this.goalsKeyPerformanceRoleForm = this.initForm();
	}

	initForm(): FormGroup {
		return this.formBuilder.group({
			goal_id: ["", [Validators.required, Validators.maxLength(10),alphaNumeric]],
			goal_description: ["", [Validators.required, Validators.maxLength(200), Validators.pattern(this.pattern.descriptionValidation()),nameAndDescription]],
			kpa_id: ["", Validators.required],
			role_code: ["", Validators.required],
			org_code: ["AVISYS"],
			is_deleted: [false],
			created_by: ["1"],
			updated_by: ["1"]
		});
	}

	ngOnInit(): void {
		this.defaultIntialValue = this.goalsKeyPerformanceRoleForm.value;
		this.params = this.params.append('offset', 0);
		this.params = this.params.append('limit', 5);

		forkJoin({
			tableHeader: this.performanceService.getGolasKeyPerformanceAreasRoleHeaderColumn(),
			tableData: this.goalsKeyPerformanceRolesService.getGoalsKeyPerformanceAreasRoleListContent(this.params),
		}).subscribe(
			(response: any) => {
				this.columnsMetadata = response.tableHeader;
				this.dataDataTable = response.tableData;
			},
			(error) => { }
		);

		forkJoin({
			tableDataRoleId: this.dropdownService.getDropdownRoleContent(),
			tableDataKpaId: this.dropdownService.getDropdowntKeyPerformanceListContent(),
		}).subscribe(
			(response: any) => {
				this.roleIds = response.tableDataRoleId.results
				this.kpaIds = response.tableDataKpaId.results
			},
			(error) => { }
		);
	}

	changePageSortSearch(data: HttpParams) {
		let offset = data.get('offset')
		let limit =data.get('limit')
		this.currentPage =Number (offset) / Number (limit)
		this.params = data;
		this.goalsKeyPerformanceRolesService.getGoalsKeyPerformanceAreasRoleListContent(data).subscribe((sucess: { results: Array<GoalsKeyPerformanceAreasRole>, count: number }) => {
		this.dataDataTable = sucess;
		});
	}

	openTemplate() {
		this.modalRef = this.modalService.show(this.goalsKeyPerformanceRole, Object.assign({}, { class: "gray modal-lg " })
		);
	}

	buttonEvent1(data: any) {
		if (data.event == "add") {
			this.actionBtn = "Submit";
			this.openTemplate();
			this.goalsKeyPerformanceRoleFormControl.goal_id.enable();
			this.resetForm();
		}
		else if (data.event == "edit") {
			this.goalsKeyPerformanceRolesService.getById(data.data.goal_id).subscribe((res :GoalsKeyPerformanceAreasRole) => {
			this.openTemplate();
			this.actionBtn = "Update";
			this.goalsKeyPerformanceRoleFormControl.goal_id.disable();
			this.goalsKeyPerformanceRoleForm.patchValue(res);
			this.intialValue = res;
			});
		}
		else if (data.event == "delete") {
			this.goalsKeyPerformanceRolesService.softDelete(data.data.goal_id).subscribe((res: GoalsKeyPerformanceAreasRole) => {
			this.alertService.success("Record Deleted Successfully", this.alertOptions);
			this.changePageSortSearch(this.params);
			})
		}
	}


	get goalsKeyPerformanceRoleFormControl(): { [key: string]: AbstractControl } {
		return this.goalsKeyPerformanceRoleForm.controls;
	}

	submit() {
		if (this.actionBtn !== "Submit") {
			this.goalsKeyPerformanceRolesService.update(this.goalsKeyPerformanceRoleForm.getRawValue(), this.goalsKeyPerformanceRoleFormControl.goal_id.value).subscribe((response: GoalsKeyPerformanceAreasRole) => {
			this.alertService.success("Record Updated Successfully", this.alertOptions);
			this.params.set('offset' , 0 )
			this.params.set('limit' , 5 )
			this.modalRef.hide();
			this.changePageSortSearch(this.params);
			});
		}
		else {
			this.goalsKeyPerformanceRolesService.create(this.goalsKeyPerformanceRoleForm.value).subscribe((sucess: GoalsKeyPerformanceAreasRole) => {
			this.alertService.success("Record Added Successfully", this.alertOptions);
			this.params.set('offset' , 0 )
			this.params.set('limit' , 5 )
			this.changePageSortSearch(this.params);
			this.modalRef.hide();
			}, (error) => {
				if (error.error.goal_id) {
					this.alertService.info("Id already exists", this.alertOptions.autoClose);
				}
			});
		}
	}

	resetForm() {
		this.goalsKeyPerformanceRoleForm.reset(this.actionBtn === 'Submit' ? this.defaultIntialValue : this.intialValue);
	}
}


