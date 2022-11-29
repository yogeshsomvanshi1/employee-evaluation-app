import { EmployeeType } from './../../model/employee-type.model';
import { RoleService } from './../../services/role.service';
import { GradeService } from './../../services/grade.service';
import { Grade } from '../../model/grade.model';
import { forkJoin } from 'rxjs';
import { City } from '../../model/city.model';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee } from '../../model/employee.model';
import { AbstractControl, ValidatorFn, Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { EmployeeService } from '../../services/employee.service';
import { AlertOptions } from '../../../shared/model/alert.model';
import { AlertService } from '../../../shared/services/alert.service';
import { CommonService } from '../../services/common.service';
import { Country } from '../../model/country.model';
import { State } from '../../model/state.model';
import { Division } from '../../model/division.model';
import { Role } from '../../model/role.model';
import { Designation } from '../../model/designation.model';
import { DivisionService } from '../../services/division.service';
import { DesignationService } from '../../services/designation.service';
import { EmployeeTypeService } from '../../services/employee-type.service';

@Component({
	selector: 'app-employee-form',
	templateUrl: './employee-form.component.html',
	styleUrls: ['./employee-form.component.scss']
})
export class EmployeeFormComponent implements OnInit {

	alertOptions: AlertOptions = { autoClose: true, keepAfterRouteChange: true };
	actionBtn = "Save";
	countries: Array<Country> = [];
	changedImgPath: string;
	cities: Array<City> = [];
	divisions: Array<Division> = [];
	designations: Array<Designation> = [];
	employeeForm: FormGroup;
	employeeTypes: Array<EmployeeType> = [];
	file: File;
	grades: Array<Grade> = [];
	intialValue: Employee;
	states: Array<State> = [];
	roles: Array<Role> = [];
	tempStates: Array<State> = [];
	tempCities: Array<City> = [];

	constructor(
		private alertServices: AlertService,
		private commonService: CommonService,
		private divisionService: DivisionService,
		private designationService: DesignationService,
    	private employeeTypeService: EmployeeTypeService,
		private employeeService: EmployeeService,
		private gradeService: GradeService,
		private fb: FormBuilder,
		private router: Router,
		private route: ActivatedRoute,
		private roleService: RoleService
	) {
		this.employeeForm = this.initForm();
	}

	ngOnInit(): void {
		this.intialValue = this.employeeForm.value;

		forkJoin({
			countryNames: this.commonService.country(),
			divisions: this.divisionService.getAllDivision(),
			employeeType: this.employeeTypeService.getAllEmployeeType(),
			grades: this.gradeService.getAllGrade(),
			roles: this.roleService.getAllRole(),
			designations: this.designationService.getAll()
		}).
		subscribe((res: any)=>{
			this.countries = res.countryNames.results;
			this.divisions = res.divisions.results;
			this.employeeTypes = res.employeeType.results;
			this.grades = res.grades.results;
			this.roles = res.roles.results;
			this.designations = res.designations.results;
		})

		this.route.queryParams.subscribe((params: any) => {
			if(params.data){
				this.actionBtn = "Update";
				this.getById(params.data);
			}
		})
		
	}

	getById(empId:number){
		this.employeeService.getById(empId).
		subscribe((res)=>{
			this.intialValue = res;
			this.employeeForm.patchValue(res);
			this.changedImgPath = res.profile_details.slice(0,25) +"core/" + res.profile_details.slice(25);
			this.employeeFormControl.profile_details.patchValue(this.changedImgPath);

			let country = this.employeeFormControl.location_country.value;
			if(country){
				this.commonService.stateList(country).subscribe((res:{ results: Array<State>, count: number })=>{
					this.states = res.results;
					this.tempStates = res.results;
				})
			}
			
			let state = this.employeeFormControl.location_state.value;
			this.commonService.cityList(state).subscribe((res: { results: Array<City>, count: number }) => {
				this.cities = res.results;
				this.tempCities = res.results;
			})

		})
	}

	handleCountryName(){
		//Here we are getting state's after changing country name
		let country = this.employeeFormControl.location_country.value;
		if(country){
			this.commonService.stateList(country).subscribe((res:{ results: Array<State>, count: number })=>{
			    this.states = res.results;
				this.employeeFormControl.location_state.reset('');
				this.employeeFormControl.location_city.reset('');
				this.cities = [];
			})
		}			 
	}

	handleStateName(){
		//Here we are getting citie's after changing state name
		let state = this.employeeFormControl.location_state.value;
		this.commonService.cityList(state).subscribe((res:{ results: Array<City>, count: number })=>{
		   this.cities = res.results;
	   })
	}

	initForm(): FormGroup {
		return this.fb.group({
			emp_code: ['', [Validators.required, Validators.maxLength(10)]],
			first_name: ['', [Validators.required, Validators.maxLength(50)]],
			middle_name: ['', [Validators.required, Validators.maxLength(50)]],
			last_name: ['', [Validators.required, Validators.maxLength(50)]],
			salutation: ['', Validators.required],
			status: ['', [Validators.required, Validators.maxLength(10)]],
			gender: ['', Validators.required],
			email: ['', [Validators.required, Validators.maxLength(50)]],
			mobile: ['',[Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")] ],
			dob: ['', [Validators.required, this.dob(18)]],
			doj: ['', Validators.required],
			lwd: ['', Validators.required],
			profile_details: ['', Validators.required],
			work_experince_during_joining_years: ['', [Validators.required, Validators.maxLength(2)]],
			work_experince_during_joining_month: ['', [Validators.required, Validators.maxLength(2)]],
			work_place: ['',[Validators.required, Validators.maxLength(10)]],
			is_deleted: false,
			created_by: ['1'],
			updated_by: ['1'],
			reporting_manager_id: ['', Validators.required],
			location_country: ['', Validators.required],
			location_state: ['', Validators.required],
			location_city: ['', Validators.required],
			grade_id: ['', Validators.required],
			role_id: ['', Validators.required],
			des_id: ['', Validators.required],
			emp_type_id: [''],
			div_id: ['', Validators.required],
			org_code: ['AVISYS']
		})
	}

	back(){
		this.router.navigate(['/performance/performance/employee-table']);
	}

	resetForm() {
		this.states = this.tempStates;
		this.cities = this.tempCities;
		this.employeeForm.reset(this.intialValue);
		this.employeeFormControl.profile_details.patchValue(this.changedImgPath);
	}

	dob = (maxAge: number): ValidatorFn => (control: { value: string | number | Date; }) =>
		  (new Date()).getFullYear() - (new Date(control.value)).getFullYear() <= maxAge
			? { younger: { maxAge } } : null;	

	submit() {
		if (this.employeeForm.valid) {
			const formData = new FormData();
			formData.append('emp_code', this.employeeFormControl.emp_code.value);
			formData.append('first_name', this.employeeFormControl.first_name.value);
			formData.append('middle_name', this.employeeFormControl.middle_name.value);
			formData.append('last_name', this.employeeFormControl.last_name.value);
			formData.append('salutation', this.employeeFormControl.salutation.value);
			formData.append('status', this.employeeFormControl.status.value);
			formData.append('gender', this.employeeFormControl.gender.value);
			formData.append('email', this.employeeFormControl.email.value);
			formData.append('mobile', this.employeeFormControl.mobile.value);
			formData.append('dob', this.employeeFormControl.dob.value);
			formData.append('doj', this.employeeFormControl.doj.value);
			formData.append('lwd', this.employeeFormControl.lwd.value);
			formData.append('work_experince_during_joining_years', this.employeeFormControl.work_experince_during_joining_years.value);
			formData.append('work_experince_during_joining_month', this.employeeFormControl.work_experince_during_joining_month.value);
			formData.append('work_place', this.employeeFormControl.work_place.value);
			formData.append('reporting_manager_id', this.employeeFormControl.reporting_manager_id.value);
			formData.append('location_country', this.employeeFormControl.location_country.value);
			formData.append('location_city', this.employeeFormControl.location_city.value);
			formData.append('location_state', this.employeeFormControl.location_state.value);
			formData.append('grade_id', this.employeeFormControl.grade_id.value);
			formData.append('role_id', this.employeeFormControl.role_id.value);
			formData.append('des_id', this.employeeFormControl.des_id.value);
			formData.append('emp_type_id', this.employeeFormControl.emp_type_id.value);
			formData.append('div_id', this.employeeFormControl.div_id.value);
			formData.append('org_code', this.employeeFormControl.org_code.value);
			// formData.append('file', this.file);
			if(this.file){
				formData.append('profile_details', this.file);
			}
			if (this.actionBtn === "Save") {
				this.employeeService.create(formData).
					subscribe(() => {
						this.alertServices.success("Record Added Successfully", this.alertOptions);
						this.router.navigate(['/performance/performance/employee-table']);
						console.log(this.employeeForm.value)
					})
			}
			else {
				console.log(this.file);
				
				this.employeeService.update(formData, this.employeeFormControl.emp_code.value).
					subscribe(() => {
						this.alertServices.success("Record Updated Successfully", this.alertOptions);
						this.router.navigate(['/performance/performance/employee-table']);
					})
			}
		}

	}

	onFileSelect(event) {
		if (event.target.files.length > 0) {
			this.file = event.target.files.item(0);
			var reader = new FileReader();
			reader.readAsDataURL(this.file);
			reader.onload = (_event) => {
			    let imagePath = reader.result;
				this.employeeForm.controls.profile_details.setValue(imagePath);
			}
		}
	}

	get employeeFormControl(): { [key: string]: AbstractControl } {
		return this.employeeForm.controls;
	}
}
