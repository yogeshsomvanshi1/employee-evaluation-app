import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from './../shared/shared-models/shared/shared.module';
import { CoreModule } from './../core/core.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PerformanceRoutingModule } from './performance-routing.module';
import { DepartmentComponent } from './department/department.component';
import { DivisionComponent } from './division/division.component';
import { GradeComponent } from './grade/grade.component';
import { RoleComponent } from './role/role.component';
import { DesignationComponent } from './designation/designation.component';
import { BsModalService } from 'ngx-bootstrap/modal';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { EmployeeComponent } from './employee/employee.component';
import { DepartmentService } from './services/department.service';
import { PerformanceService } from './services/performance.service';
import { DivisionService } from './services/division.service';
import { DesignationService } from './services/designation.service';
import { GradeService } from './services/grade.service';
import { RoleService } from './services/role.service';


@NgModule({
  declarations: [
    DepartmentComponent,
    DivisionComponent,
    GradeComponent,
    RoleComponent,
    DesignationComponent,
    WelcomeComponent,
    EmployeeComponent
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
    RoleService
  ]
})
export class PerformanceModule { }
