import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from './../shared/shared-models/shared/shared.module';
import { CoreModule } from './../core/core.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PerformanceRoutingModule } from './performance-routing.module';
import { DepartmentComponent } from './components/department/department.component';
import { DivisionComponent } from './components/division/division.component';
import { GradeComponent } from './components/grade/grade.component';
import { RoleComponent } from './components/role/role.component';
import { DesignationComponent } from './components/designation/designation.component';
import { BsModalService } from 'ngx-bootstrap/modal';
import { WelcomeComponent } from './welcome/welcome.component';
import { EmployeeComponent } from './components/employee/employee.component';
import { DepartmentService } from './services/department.service';
import { PerformanceService } from './services/performance.service';
import { DivisionService } from './services/division.service';
import { DesignationService } from './services/designation.service';
import { GradeService } from './services/grade.service';
import { RoleService } from './services/role.service';
import { EmployeeService } from './services/employee.service';
import { EmployeeFormComponent } from './components/employee-form/employee-form.component';
import { CommonService } from './services/common.service';
import { KeyPerformanceListComponent } from './components/key-performance-list/key-performance-list.component';
import { EmployeeTypeComponent } from './components/employee-type/employee-type.component';
import { EmployeeTypeService } from './services/employee-type.service';


@NgModule({
  declarations: [
    DepartmentComponent,
    DivisionComponent,
    GradeComponent,
    RoleComponent,
    DesignationComponent,
    WelcomeComponent,
    EmployeeComponent,
    EmployeeFormComponent,
    KeyPerformanceListComponent,
    EmployeeTypeComponent
  ],
  imports: [
    CommonModule,
    PerformanceRoutingModule,
    CoreModule,
    SharedModule,
    ReactiveFormsModule
  ],
  providers:[
    BsModalService,
    CommonService,
    PerformanceService, 
    DepartmentService,
    DivisionService,
    DesignationService,
    GradeService,
    RoleService,
    EmployeeService,
    EmployeeTypeService
  ]
})
export class PerformanceModule { }
