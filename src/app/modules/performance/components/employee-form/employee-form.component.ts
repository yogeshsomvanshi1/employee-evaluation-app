import { HttpParams } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { forkJoin } from 'rxjs';
import { alphaNumeric } from 'src/app/modules/shared/component/validators/validation';
import { AlertOptions } from '../../../shared/model/alert.model';
import { AlertService } from '../../../shared/services/alert.service';
import { City } from '../../model/city.model';
import { Country } from '../../model/country.model';
import { Department } from '../../model/department.model';
import { Designation } from '../../model/designation.model';
import { Division } from '../../model/division.model';
import { Employee } from '../../model/employee.model';
import { Grade } from '../../model/grade.model';
import { Role } from '../../model/role.model';
import { State } from '../../model/state.model';
import { CommonService } from '../../services/common.service';
import { DivisionService } from '../../services/division.service';
import { DropdownService } from '../../services/dropdown.service';
import { EmployeeService } from '../../services/employee.service';
import { EmployeeType } from './../../model/employee-type.model';

@Component({
	selector: 'app-employee-form',
	templateUrl: './employee-form.component.html',
	styleUrls: ['./employee-form.component.scss']
})
export class EmployeeFormComponent implements OnInit {

	@ViewChild('file1') fileinput: ElementRef;
	alertOptions: AlertOptions = { autoClose: true, keepAfterRouteChange: true };
	actionBtn:string = "Save";
	countries: Array<Country> = [];
	changedImgPath: string;
	cities: Array<City> = [];
	currentEmployee: Array<Employee> = [];
	divisions: Array<Division> = [];
	department: Array<Department> = []
	designations: Array<Designation> = [];
	employees: Array<Employee> = []
	employeeForm: FormGroup;
	params: HttpParams = new HttpParams();
	empData: Array<Employee> = [];
	employeeTypes: Array<EmployeeType> = [];
	empId: Employee;
	file: File;
	grades: Array<Grade> = [];
	intialValue: Employee;
	img: string = 'assets/images/themes/user3.png';
	minJoiningDate: string;
	minretiredDate: string;
	maxDate: string;
	minLastDay: string;
	Month: Array<string> = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"]
	roles: Array<Role> = [];
	states: Array<State> = [];
	tempStates: Array<State> = [];
	tempCities: Array<City> = [];
	Year: Array<string> = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14",
		"15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30"]

	constructor(
		private alertServices: AlertService,
		private commonService: CommonService,
		private divisionService: DivisionService,
		private dropdownSevice:DropdownService,
		private employeeService: EmployeeService,
		private fb: FormBuilder,
		private router: Router,
		private route: ActivatedRoute,
	) {
		this.employeeForm = this.initForm();
	}

	ngOnInit(): void {
		this.intialValue = this.employeeForm.value;
		this.employeeForm.controls.profile_details.setValue(this.img);
		forkJoin({
			countryNames: this.commonService.country(),
			divisions: this.divisionService.getAllDivision(),
			employeeType: this.dropdownSevice.getDropdownAllEmployeeType(),
			grades: this.dropdownSevice.getDropdownAllGrade(),
			roles: this.dropdownSevice.getDropdownAllRole(),
			designations: this.dropdownSevice.getDropdownDesignationAll(),
			department:this.dropdownSevice.getDropdownDepartmentContent(),
			employees:this.dropdownSevice.getDropdownEmployeeContent()
			
		}).
		subscribe((res: any)=>{
			this.countries = res.countryNames.results;
			this.divisions = res.divisions.results;
			this.employeeTypes = res.employeeType.results;
			this.grades = res.grades.results;
			this.roles = res.roles.results;
			this.designations = res.designations.results;
			this.department =res.department.results;
			this.employees =res.employees.results;		
		})
				
		this.route.queryParams.subscribe((params: any) => {
			if (params.data) {
				this.actionBtn = "Update";
				this.getById(params.data);
				this.empId=  params.data
			} 
		})		
		
		this.employeeService.getEmployeeContent(this.params).subscribe(res => {
			this.empData = res.results
			if (this.actionBtn != "Save"){
				let EMP = this.empData.filter((x: { emp_code: any; }) => x.emp_code !== this.empId);
				this.currentEmployee = EMP
			}else{
				this.currentEmployee = this.empData
			}
		})
	}

	getById(empId:number){
		this.employeeService.getById(empId).
		subscribe((res)=>{
			this.intialValue = res;
			this.employeeForm.patchValue(res);
			this.setIconImage(res.profile_details)
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

	setIconImage(url:string){
		if(url){
			let changedImgPath = url.slice(0,25) +"core/" + url.slice(25);
		    this.employeeFormControl.profile_details.patchValue(changedImgPath);
		}
		else {
			this.employeeForm.controls.profile_details.setValue(this.img)
		}
	}
	
	changeDoj() {
		this.employeeFormControl.doj.reset();
		let res = this.employeeFormControl.dob.value
		this.minJoiningDate = moment(new Date(res)).add(18, 'years').format('YYYY-MM-DD');
		this.maxDate = moment(new Date()).subtract(1, 'day').format('YYYY-MM-DD');
	}

	changeLwd() {
		let res = this.employeeFormControl.dob.value
		this.minretiredDate = moment(new Date(res)).add(60, 'years').format('YYYY-MM-DD');
		this.employeeFormControl.lwd.setValue(this.minretiredDate);
   	}

	changeLastDay() {
		let res = this.employeeFormControl.doj.value
		this.minLastDay = moment(new Date(res)).add(1, 'day').format('YYYY-MM-DD');
		this.maxDate = moment(new Date()).subtract(1, 'day').format('YYYY-MM-DD');
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
			emp_code: ['', [Validators.required, Validators.maxLength(10), alphaNumeric]],
			first_name: ['', [Validators.required, Validators.maxLength(50)]],
			middle_name: [''],
			last_name: ['', [Validators.required, Validators.maxLength(50)]],
			salutation: [''],
			status: ['', [Validators.required, Validators.maxLength(10)]],
			gender: ['', Validators.required],
			email: ['', [Validators.required, Validators.maxLength(50)]],
			mobile: ['',[Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")] ],
			dob: ['', [Validators.required, this.dob(18)]],
			doj: ['', [Validators.required] ],
			lwd: ['', Validators.required],
			profile_details: ['', Validators.required],
			work_experince_during_joining_years: ['', [Validators.required ]],
			work_experince_during_joining_month: ['',[Validators.required ]],
			work_place: ['',[Validators.required]],
			dept_id:['',[Validators.required]],
			reviewer_manager_name:[''],
			reviewer_manager_id:['',[Validators.required]],
			is_deleted: false,
			created_by: ['1'], 
			updated_by: ['1'],
			reporting_manager_id: ['',[Validators.required]],
			location_country: ['', Validators.required],
			location_state: ['', Validators.required],
			location_city: ['', Validators.required],
			grade_id: ['', Validators.required],
			role_id: ['', Validators.required],
			des_id: ['', Validators.required],
			emp_type_id: ['',Validators.required],
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
		this.fileinput.nativeElement.value = "";
		this.file = null
		this.actionBtn == "Save" ? 
		this.employeeForm.controls.profile_details.setValue(this.img): this.setIconImage(this.intialValue.profile_details);
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
			formData.append('reviewer_manager_name', this.employeeFormControl.reviewer_manager_name.value);
			formData.append('reviewer_manager_id', this.employeeFormControl.reviewer_manager_id.value);
			formData.append('dept_id', this.employeeFormControl.dept_id.value);
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
					subscribe((sucess) => {						
						this.alertServices.success("Record Added Successfully", this.alertOptions);
						this.router.navigate(['/performance/performance/employee-table']);
					}, error => {
						this.alertServices.info("Employee Already exist");
					})
			}
			else {				
				this.employeeService.update(formData, this.employeeFormControl.emp_code.value).
					subscribe((sucess) => {
						this.alertServices.success("Record Updated Successfully", this.alertOptions);
						this.router.navigate(['/performance/performance/employee-table']);
					},error => {
						this.alertServices.info("Id Already exist");
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
