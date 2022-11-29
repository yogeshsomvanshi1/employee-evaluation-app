import { AppraisalFormComponent } from './components/appraisal-form/appraisal-form.component';
import { AppraisalDetailsComponent } from './components/appraisal-details/appraisal-details.component';

import { EmployeeComponent } from './components/employee/employee.component';
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
import { EmployeeFormComponent } from './components/employee-form/employee-form.component';
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
    {path: 'employee-form' , component : EmployeeFormComponent},
    {path: 'designation-table' , component : DesignationComponent},
    {path: 'key-performance-area' , component : KeyPerformanceAreaComponent},
    {path:"key-performance-areas-employeeGrade",component:KeyPerformanceAreasEmployeeGradeComponent},
    {path:"goals-key-performance-areas-role",component:GoalsKeyPerformanceAreasRoleComponent},
    {path:"performance-review-type",component:PerformanceReviewTypeComponent},
    {path:"performance-review-phases",component:PerformanceReviewPhasesComponent},
    {path:"performance-review-grades",component:PerformanceReviewGradesComponent},
    {path:"performance-review-cycles",component:PerformanceReviewCyclesComponent},
    {path:"performance-review-cycle-schedule",component:PerformanceReviewCycleScheduleComponent},
    {path:"appraisal-details",component:AppraisalDetailsComponent},
    {path:"apparaisal-form",component:AppraisalFormComponent},
    {path:'' , redirectTo: 'welcome' , pathMatch:'full'},
  ]},
  

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PerformanceRoutingModule { }
