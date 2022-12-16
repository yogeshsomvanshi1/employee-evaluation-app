import { filter, map } from 'rxjs/operators';
import { AlertService } from 'src/app/modules/shared/services/alert.service';
import { ValidatorServiceService } from 'src/app/modules/shared/component/validator-service/validator-service.service';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DropdownService } from './../../services/dropdown.service';
import { Component, OnInit } from '@angular/core';
import { AlertOptions } from '../../../shared/model/alert.model';
import { forkJoin } from 'rxjs';
import { GoalsKeyPerformanceAreasRole } from '../../model/golas-key-performance-areas-role.model';
import { alphaNumeric, nameAndDescription } from 'src/app/modules/shared/component/validators/validation';
import { ActivatedRoute, Router } from '@angular/router';
import { GoalsKeyperformanceAreasRolesService } from '../../services/goals-key-performance-areas-roles.service';
import { invalid } from 'moment';

@Component({
  selector: 'app-goals-key-performance-areas-roles-form',
  templateUrl: './goals-key-performance-areas-roles-form.component.html',
  styleUrls: ['./goals-key-performance-areas-roles-form.component.scss']
})
export class GoalsKeyPerformanceAreasRolesFormComponent implements OnInit {

  totalWeightage : number;
  goalDataLength : number
  goalData: Array<GoalsKeyPerformanceAreasRole>
  alertOptions: AlertOptions = { autoClose: true, keepAfterRouteChange: true };
  actionBtn: string = "Save";
  goalsKeyPerformanceRoleForm:FormGroup
  kpaIds: Array<GoalsKeyPerformanceAreasRole> = [];
  roleIds: Array<GoalsKeyPerformanceAreasRole>=[];
  defaultIntialValue: GoalsKeyPerformanceAreasRole;
  intialValue: GoalsKeyPerformanceAreasRole;

  constructor(
    private dropdownService:DropdownService , 
    private formBuilder:FormBuilder,
    private pattern:ValidatorServiceService,
    private route: ActivatedRoute,
    private goalsKeyPerformanceRolesService: GoalsKeyperformanceAreasRolesService,
    private alertServices:AlertService,
    private router:Router

  ) {
		this.goalsKeyPerformanceRoleForm = this.initForm();
	}

	initForm(): FormGroup {
		return this.formBuilder.group({
            goal_id: ["", [Validators.required, Validators.maxLength(10),alphaNumeric]],
            goal_description: ["", [Validators.required, Validators.maxLength(200), Validators.pattern(this.pattern.descriptionValidation()),nameAndDescription]],
            kpa_id: ["", Validators.required],
            role_code: ["", Validators.required],
            weightage :[""],
            org_code: ["AVISYS"],
            is_deleted: [false],
            created_by: ["1"],
            updated_by: ["1"] ,
        sum : this.formBuilder.group({
            weightage__sum :[""]
      })

		});
	}

  onKpaChange(){
    let kpaData = this.goalsKeyPerformanceRoleForm.get('kpa_id').value;
    let roleData = this.goalsKeyPerformanceRoleForm.get('role_code').value

    
    if (kpaData && roleData){
      this.goalsKeyPerformanceRolesService.getGoalsKeyPerformanceAreasRoleListContents().subscribe(res =>{
       let goalsData = res.results
        
      
       this.goalData = goalsData.filter((x: { kpa_id: string , role_code:string }) => x.kpa_id == kpaData && x.role_code == roleData);      
         this.goalDataLength = this.goalData.length
         this.totalWeightage = this.goalData[0].sum.weightage__sum

        if (this.totalWeightage > 100 ){
          console.log("sorry ")
        }else {
          console.log("we can proceess");
        }
        
        
      })
      
    }
        
  }

  

  ngOnInit(): void {
    this.defaultIntialValue = this.goalsKeyPerformanceRoleForm.value;
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


    this.route.queryParams.subscribe((params: any) => {
      // this.goalsKeyPerformanceRoleFormControl.goal_id.disable();				
      // this.goalsKeyPerformanceRoleFormControl.weightage.disable();				
			if (params.data) {
				this.actionBtn = "Update";
				this.getById(params.data);
			} 
		})	
    
  }

  getById(goalId:number){
		this.goalsKeyPerformanceRolesService.getById(goalId).
		subscribe((res)=>{
			this.intialValue = res;
			this.goalsKeyPerformanceRoleForm.patchValue(res);
      this.onKpaChange();
      
	})}

  get goalsKeyPerformanceRoleFormControl(): { [key: string]: AbstractControl } {
		return this.goalsKeyPerformanceRoleForm.controls;
	}

  submit(){


    if (this.totalWeightage > 100 ){
          
      if (this.actionBtn == "Save") {
        this.goalsKeyPerformanceRolesService.create(this.goalsKeyPerformanceRoleForm.value).
          subscribe((sucess) => {						
            this.alertServices.success("Record Added Successfully", this.alertOptions);
            this.router.navigate(['/performance/performance/goals-key-performance-areas-role']);
          }, error => {
            this.alertServices.info("Id Already exist");
          })
      }
      else {
        this.goalsKeyPerformanceRolesService.update(this.goalsKeyPerformanceRoleForm.value,this.goalsKeyPerformanceRoleFormControl.goal_id.value).
          subscribe((sucess) => {
            this.alertServices.success("Record Updated Successfully", this.alertOptions);
            this.router.navigate(['/performance/performance/goals-key-performance-areas-role']);
          },error => {
            this.alertServices.info("Id Already exist");
          })
      
     }
    }else { this.alertServices.info("max weightage");
    }
    
  }

  resetForm() {
    
		this.goalsKeyPerformanceRoleForm.reset(this.actionBtn === 'Submit' ? this.defaultIntialValue : this.intialValue);
    this.onKpaChange();
	}
}
