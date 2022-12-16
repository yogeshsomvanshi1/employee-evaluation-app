import { KeyPerformanceList } from './../../model/key-performance-list.model';
import { DropdownService } from './../../services/dropdown.service';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { forkJoin } from 'rxjs';
import { AlertOptions } from 'src/app/modules/shared/model/alert.model';
import { Employee } from '../../model/employee.model';
import { GoalsKeyPerformanceAreasRole } from '../../model/golas-key-performance-areas-role.model';
import { PerformanceReviewGrades } from '../../model/performance-review-grade.model';
import { AppraisalService } from '../../services/appraisal.service';
import { EmployeeService } from '../../services/employee.service';
import { __values } from 'tslib';
import { AlertService } from 'src/app/modules/shared/services/alert.service';


@Component({
  selector: 'app-appraisal-form',
  templateUrl: './appraisal-form.component.html',
  styleUrls: ['./appraisal-form.component.scss']
})
export class AppraisalFormComponent implements OnInit {
  
  istrue: boolean = false;
  emp_id=sessionStorage.getItem('emp_code')
  appraisalMainForm: FormGroup = this.fb.group({});
  actionBtn: string = 'Save';
  alertOptions: AlertOptions = { autoClose: true, keepAfterRouteChange: true };
  dataDescription: Array<GoalsKeyPerformanceAreasRole> = [];
  empData: Array<Employee>;
  gradeDescription: Array<PerformanceReviewGrades> = [];
  intialValue: Employee;
  kpaIds: Array<KeyPerformanceList> = []
  roleData: Array<Employee>;
  role:string='self';
  id :number;

  constructor(
    private appraisalService: AppraisalService,
    private dropdownService: DropdownService,
    private fb: FormBuilder,
    private employeeService: EmployeeService,
    private route: ActivatedRoute,
    private alertService:AlertService
  ) {
  
  }




  ngOnInit(): void {
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
      (error) => { error }
    );


    this.route.queryParams.subscribe((params: any) => {
      if (params.data) {
        this.actionBtn = "Update";
        this.getById(params.data);
        this.getApprasal(params.data);
        this.appraisalService.getEmployeeContent().subscribe(res => {
          this.empData = res.results
          this.id = params.data
          
        })

     
      }
    })
  }

  getApprasal(empId) {
    let a1;
    let b1: any;
   
    let c = []
    forkJoin({
      a: this.appraisalService.getApprisalDetails(empId),
      b: this.dropdownService.getDropdowntKeyPerformanceListContent(),
      d: this.employeeService.getById(empId)
    
    }).subscribe(
      (response: any) => {
        a1 = response.a.results;
        b1 = response.b.results;
       
        this.intialValue =response.d;
        // debugger
        if(this.intialValue.reporting_manager_id==this.emp_id){
          this.role='reporting_manager';
        }else if(this.intialValue.reviewer_manager_id==this.emp_id){
          this.role='reviewer_manager';
        }else if(this.emp_id==empId){
          this.role='self';
        }else{
          this.role='nothing';
        }

        // alert(this.role)
     
        for (let i = 0; i < b1.length; i++) {
          const result = a1.filter((obj) => {
            return obj.kpa_id === b1[i].kpa_id;
          });

          c.push({ [b1[i].kpa_id]: result })

        }

        for (let k = 0; k < c.length; k++) {
          let key = Object.keys(c[k])[0]
          this.appraisalMainForm.addControl(key, this.fb.array([]));
          for (let j = 0; j < c[k][key].length; j++) {
            let values = c[k][key][j]
            this.skills(key).push(this.fb.group({
              id: [values.id],
              goal_description: [values.goal_description],
              kpa_description: [values.kpa_description],
              appraise_rating: [this.role=='reporting_manager' ? {value: values.appraise_rating, disabled: true} 
                                :values.appraise_rating ,this.role=='self' ? [Validators.required]:[]],
                                
              appraiser_rating: [(this.role=='self' || this.role== "reviewer_manager" )? {value: values.appraiser_rating, disabled: true}
                                :values.appraiser_rating,(this.role=='reporting_manager') ? [Validators.required]:[]],
                                
              appraise_comments: [this.role=='reporting_manager' ? {value: values.appraise_comments, disabled: true}
                                :values.appraise_comments,this.role=='self' ? [Validators.required]:[]],
                                
              appraiser_comments: [(this.role=='self' || this.role== "reviewer_manager" )? {value: values.appraiser_comments==null?''
                                :values.appraiser_comments, disabled: true}  :values.appraiser_comments==null ? '':values.appraiser_comments ,
                                (this.role=='reporting_manager' || this.role== "reviewer_manager") ? [Validators.required]:[]],
              preformance_review_cycle_id: [values.preformance_review_cycle_id],
              employee_id: [values.employee_id],
              goal_id: [values.goal_id],
              kpa_id: [values.kpa_id],
              org_code: ["AVISYS"],
              is_deleted: [false],
              created_by: ["1"],
            }));
          }
        }
        this.kpaIds = b1;
        this.istrue = true;
      },
      (error) => { error }
    );
  }


  getById(empId: number) {
    this.employeeService.getById(empId).
      subscribe((res) => {
        this.intialValue = res;
      })
  }

  submit() {
    let sub = [];
    let value = this.appraisalMainForm.getRawValue();
    for (let i = 0; i < this.kpaIds.length; i++) {
      sub = sub.concat(value[this.kpaIds[i].kpa_id]);
    }
    this.appraisalService.create(sub).subscribe((sucess) => {
      this.getById(this.id);
      this.getApprasal(this.id)
      console.log(sucess,"response");
      this.alertService.success("updated sucessfully...!",this.alertOptions)
    })
  }

  getArray(kpa) {
    let a = this.appraisalMainForm.controls[kpa]
    return a.value
  }

  skills(id: any): FormArray {
    return this.appraisalMainForm.get(id) as FormArray
  }

  getData(skill) {
    return skill.value.goal_description;
  }
}
