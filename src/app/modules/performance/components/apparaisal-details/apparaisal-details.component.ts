import { ActivatedRoute, Router } from '@angular/router';
import { Employee } from './../../model/employee.model';
import { FormBuilder, FormGroup, Validators, FormControl, AbstractControl } from '@angular/forms';
import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';
import { GoalsKeyPerformanceAreasRole } from '../../model/golas-key-performance-areas-role.model';
import { PerformanceReviewGrades } from '../../model/performance-review-grade.model';
import { EmployeeService } from '../../services/employee.service';
import { AlertOptions } from 'src/app/modules/shared/model/alert.model';
import { AppraisalService } from '../../services/appraisal.service';



@Component({
  selector: 'app-apparaisal-details',
  templateUrl: './apparaisal-details.component.html',
  styleUrls: ['./apparaisal-details.component.scss']
})
export class ApparaisalDetailsComponent implements OnInit {

  actionBtn: string = 'Save';
  appraisalRoleData :Array <Employee>
  appraisalForm:FormGroup;
  alertOptions: AlertOptions = { autoClose: true, keepAfterRouteChange: true };
  dataDescription: Array<GoalsKeyPerformanceAreasRole> = []; 
  EMP :any =  [];
  empData:Array <Employee>;
  gradeDescription : Array<PerformanceReviewGrades> = [];
  intialValue:Employee;
  params: HttpParams = new HttpParams();
  roleData :Array <Employee>;
  roleId : string

  constructor(
    private appraisalService:AppraisalService,
    private fb:FormBuilder,
    private employeeService: EmployeeService,
    private router:Router,
    private route: ActivatedRoute,
  ) { 

    this.appraisalForm=this.initForm();
  }


  initForm(): FormGroup {
		return this.fb.group({
			emp_code: [''],
			first_name: [''],
			middle_name: [''],
			last_name: [''],
			salutation: [''],
			status: [''],
			gender: [''],
			email: [''],
			mobile: [''],
      des_name:[''],
			dob: [''],
			doj: ['' ],
      department_name:[''],
      emp_fullname:[''],
      reporting_manager_name:[''],
			lwd: [''],
			profile_details: [''],
			work_experince_during_joining_years: [''],
			work_experince_during_joining_month: [''],
			work_place: [''],
			dept_id:[''],
      dept_name:[''],
			is_deleted: false,
			created_by: ['1'], 
			updated_by: ['1'],
			reporting_manager_id: [''],
			location_country: [''],
			location_state: [''],
			location_city: [''],
			grade_id: [''],
			role_id: [''],
			des_id: [''],
			emp_type_id: [''],
			div_id: [''],
			org_code: ['AVISYS']
		
		})
	}
  
  ngOnInit(): void {   


    this.intialValue = this.appraisalForm.value;

    this.params = this.params.append("offset", 0);
		this.params = this.params.append("limit", 5);


    forkJoin({
			tableData: this.appraisalService.getGoalsKeyPerformanceAreasRoleListContent(),
      tableGradeData: this.appraisalService.getPerformanceReviewGradesListContent(),
      
		}).subscribe(
			(response: any) => {
				this.dataDescription = response.tableData.results;
        this.gradeDescription = response.tableGradeData.results;        

    for(let i=0; i < this.gradeDescription.length;i++){
      for(let j=i+1;j< this.gradeDescription.length;j++){
        if( this.gradeDescription[i].rating_from <=  this.gradeDescription[j].rating_from){
          let temp =  this.gradeDescription[i];
          this.gradeDescription[i] =  this.gradeDescription[j];
          this.gradeDescription[j] = temp;
        }
      }
     }
	},
			(error) => { error}
		);

    this.route.queryParams.subscribe((params: any) => {
      if (params.data) {
        this.actionBtn = "Update";
        this.getById(params.data);
        this.appraisalForm.disable();
        this.employeeService.getEmployeeContent(this.params).subscribe(res => {
          this.empData = res.results
          let EMP = this.empData.filter((x: { emp_code: string; }) => x.emp_code == params.data);
          this.roleId = EMP[0].role_id


        })

        this.appraisalService.getGoalsKeyPerformanceAreasRoleListContent().subscribe(res => {
          this.roleData = res.results
          this.appraisalRoleData = this.roleData.filter((x: { role_code: string; }) => x.role_code == this.roleId);

        })
      }
    })



  }

  

  get rollno(): any {
    return this.employeeFormControl.role_id.value;
    
  }

  get employeeFormControl(): { [key: string]: AbstractControl } {
		return this.appraisalForm.controls;
	}
  
  
  getById(empId:number){
		this.employeeService.getById(empId).
		subscribe((res)=>{
			this.intialValue = res;
			this.appraisalForm.patchValue(res);

    })
  
  }

  submit(){
    const formData = new FormData();
    if (this.actionBtn == "Update") {
      this.employeeService.update(formData,this.appraisalForm.value).subscribe((sucess: Employee) => {
        this.router.navigate(['/performance/performance/employee-details']);
      });
    }
    // else {
    //   this.companyAddressServices.create(this.appraisalForm.value).subscribe((sucess: Employee) => {
    //     this.alertServices.success('Record added successfully', this.alertOptions);
    //     this.router.navigate(['/customer/customer/company-address-table']);
    //   }, error => {
    //     this.alertServices.warn("Contact already exist");
    //   });
    // }
  }
 

}
