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
import { WelcomeComponent } from './components/welcome/welcome.component';
import { EmployeeComponent } from './components/employee/employee.component';
import { DepartmentService } from './services/department.service';
import { PerformanceService } from './services/performance.service';
import { DivisionService } from './services/division.service';
import { DesignationService } from './services/designation.service';
import { GradeService } from './services/grade.service';
import { RoleService } from './services/role.service';
import { EmployeeTypeService } from './services/employee-type.service';
import { EmployeeFormComponent } from './components/employee-form/employee-form.component';
import { EmployeeService } from './services/employee.service';
import { CommonService } from './services/common.service';
import { EmployeeTypeComponent } from './components/employee-type/employee-type.component';


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
    PerformanceService, 
    DepartmentService,
    DivisionService,
    DesignationService,
    GradeService,
    RoleService,
    EmployeeService,
    EmployeeTypeService,
    CommonService
  ]
})
export class PerformanceModule { }
