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

const routes: Routes = [
  {path: 'performance' , component: LayoutCrmComponent , children: [
    {path:'welcome' , component: WelcomeComponent},
    {path: 'department-table' , component : DepartmentComponent},
    {path: 'division-table' , component : DivisionComponent},
    {path: 'grades-table' , component : GradeComponent},
    {path: 'role-table' , component : RoleComponent},
    {path: 'designation-table' , component : DesignationComponent},
    {path:'' , redirectTo: 'welcome' , pathMatch:'full'}
  ]},
  

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PerformanceRoutingModule { }
