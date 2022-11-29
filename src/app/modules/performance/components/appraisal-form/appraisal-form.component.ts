import { HttpParams } from '@angular/common/http';
import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { AlertOptions } from 'src/app/modules/shared/model/alert.model';
import { Employee } from '../../model/employee.model';
import { GoalsKeyPerformanceAreasRole } from '../../model/golas-key-performance-areas-role.model';
import { PerformanceReviewGrades } from '../../model/performance-review-grade.model';
import { AppraisalService } from '../../services/appraisal.service';
import { EmployeeService } from '../../services/employee.service';

@Component({
  selector: 'app-appraisal-form',
  templateUrl: './appraisal-form.component.html',
  styleUrls: ['./appraisal-form.component.scss']
})
export class AppraisalFormComponent implements OnInit {

  actionBtn: string = 'Save';
  appraisalRoleData :Array <Employee>
  appraisalForm:FormGroup;
  alertOptions: AlertOptions = { autoClose: true, keepAfterRouteChange: true };
  dataDescription: Array<GoalsKeyPerformanceAreasRole> = []; 
  EMP :any =  [];
  empData:any;
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
      
			lwd: [''],
			profile_details: [''],
			work_experince_during_joining_years: [''],
			work_experince_during_joining_month: [''],
			work_place: [''],
			dept_id:[''],
      reviewer_manager_id:[''],
      reviewer_manager_name:[''],
      reporting_manager_id:[''],
      reporting_manager_name:[''],
      dept_name:[''],
			is_deleted: false,
			created_by: ['1'], 
			updated_by: ['1'],
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
        this.appraisalService.getEmployeeContent().subscribe(res => {
          this.empData = res.results
          console.log(res);
          
          let EMP = this.empData.filter((x: { emp_code: string; }) => x.emp_code == params.data);
          this.roleId = EMP[0].role_id
          console.log(this.empData ,"data" );
          console.log(this.roleId ,"role id2" );
          

        })

        this.appraisalService.getGoalsKeyPerformanceAreasRoleListContent().subscribe(res => {
          this.roleData = res.results
          console.log(this.roleData , "role data")
          // this.appraisalRoleData = this.roleData.filter((x: { role_code: string; }) => x.role_code == this.roleId);
          this.appraisalRoleData = this.roleData.filter((x => x.role_code == this.roleId))
          console.log(this.appraisalRoleData,"goals");
          
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
        this.router.navigate(['/performance/performance/apparaisal-details']);
      });
    }
    
  }
 

}
