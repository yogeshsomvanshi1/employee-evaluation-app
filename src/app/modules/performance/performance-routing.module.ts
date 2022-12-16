import { PersonalDetailsComponent } from './components/employee-details/personal-details/personal-details.component';
import { ProfessionalInfoComponent } from './components/employee-details/professional-info/professional-info.component';
import { AddressContactDetailsComponent } from './components/employee-details/address-contact-details/address-contact-details.component';
import { JoiningDetailsComponent } from './components/employee-details/joining-details/joining-details.component';
import { CompanyDetailsComponent } from './components/employee-details/company-details/company-details.component';
import { EmployeeInfoComponent } from './components/employee-details/employee-info/employee-info.component';
import { GoalsKeyPerformanceAreasRolesFormComponent } from './components/goals-key-performance-areas-roles-form/goals-key-performance-areas-roles-form.component';
import { AppraisalFormComponent } from './components/appraisal-form/appraisal-form.component';
import { AppraisalDetailsComponent } from './components/appraisal-details/appraisal-details.component';

import { EmployeeComponent } from './components/employee-details/employee/employee.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { DesignationComponent } from './components/designation/designation.component';
import { GradeComponent } from './components/grade/grade.component';
import { DepartmentComponent } from './components/department/department.component';
import { LayoutCrmComponent } from './../core/components/layout-main/layout-crm.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DivisionComponent } from './components/division/division.component';
import { RoleComponent } from './components/role/role.component';
import { EmployeeTypeComponent } from './components/employee-type/employee-type.component';
import { EmployeeFormComponent } from './components/employee-details/employee-form/employee-form.component';
import { KeyPerformanceAreasEmployeeGradeComponent } from './components/key-performance-areas-employee-grade/key-performance-areas-employee-grade.component';
import { GoalsKeyPerformanceAreasRoleComponent } from './components/goals-key-performance-areas-role/goals-key-performance-areas-role.component';
import { PerformanceReviewTypeComponent } from './components/performance-review-type/performance-review-type.component';
import { PerformanceReviewPhasesComponent } from './components/performance-review-phases/performance-review-phases.component';
import { PerformanceReviewGradesComponent } from './components/performance-review-grades/performance-review-grades.component';
import { PerformanceReviewCyclesComponent } from './components/performance-review-cycles/performance-review-cycles.component';
import { PerformanceReviewCycleScheduleComponent } from './components/performance-review-cycle-schedule/performance-review-cycle-schedule.component';
import { KeyPerformanceAreaComponent } from './components/key-performance-area/key-performance-area.component';

const routes: Routes = [
  {path: 'performance' , component: LayoutCrmComponent , children: [
    {path:'welcome' , component: WelcomeComponent},
    {path: 'department-table' , component : DepartmentComponent},
    {path: 'division-table' , component : DivisionComponent},
    {path: 'grades-table' , component : GradeComponent},
    {path: 'role-table' , component : RoleComponent},
    {path: 'designation-table' , component : DesignationComponent},  
    {path: 'employee-table' , component : EmployeeComponent},
    {path: 'employee-type' , component : EmployeeTypeComponent},
    {path: 'designation-table' , component : DesignationComponent},
    {path: 'key-performance-area' , component : KeyPerformanceAreaComponent},
    {path:"key-performance-areas-employeeGrade",component:KeyPerformanceAreasEmployeeGradeComponent},
    {path:"goals-key-performance-areas-role",component:GoalsKeyPerformanceAreasRoleComponent},
    {path:"goals-key-performance-areas-role-form",component:GoalsKeyPerformanceAreasRolesFormComponent},
    {path:"performance-review-type",component:PerformanceReviewTypeComponent},
    {path:"performance-review-phases",component:PerformanceReviewPhasesComponent},
    {path:"performance-review-grades",component:PerformanceReviewGradesComponent},
    {path:"performance-review-cycles",component:PerformanceReviewCyclesComponent},
    {path:"performance-review-cycle-schedule",component:PerformanceReviewCycleScheduleComponent},
    {path:"appraisal-details",component:AppraisalDetailsComponent},
    {path:"appraisal-form",component:AppraisalFormComponent},
    {path:'' , redirectTo: 'welcome' , pathMatch:'full'},
    {path: 'employee-form' , component : EmployeeFormComponent , children:[
      {path:'employee-info',component : EmployeeInfoComponent},
      {path:'company-details',component : CompanyDetailsComponent},
      {path:'joining-details',component : JoiningDetailsComponent},
      {path:'adress-contact-details',component : AddressContactDetailsComponent},
      {path:'professional-details',component : ProfessionalInfoComponent},
      {path:'personal-details',component : PersonalDetailsComponent}
    ]},

  ]},
  

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PerformanceRoutingModule { }
