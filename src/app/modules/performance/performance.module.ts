import { SweetalertServiceService } from 'src/app/modules/shared/component/sweetalert/sweetalert-service.service';
import { DropdownService } from './services/dropdown.service';
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
import { EmployeeComponent } from './components/employee-details/employee/employee.component';
import { DepartmentService } from './services/department.service';
import { PerformanceService } from './services/performance.service';
import { DivisionService } from './services/division.service';
import { DesignationService } from './services/designation.service';
import { GradeService } from './services/grade.service';
import { RoleService } from './services/role.service';
import { EmployeeService } from './services/employee.service';
// import { EmployeeFormComponent } from './components/employee-form/employee-form.component';
import { CommonService } from './services/common.service';
import { EmployeeTypeComponent } from './components/employee-type/employee-type.component';
import { KeyPerformanceAreasEmployeeGradeComponent } from './components/key-performance-areas-employee-grade/key-performance-areas-employee-grade.component';
import { KeyPerformanceAreasEmployeeGradeService } from './services/key-performance-areas-employee-grade.service';
import { GoalsKeyPerformanceAreasRoleComponent } from './components/goals-key-performance-areas-role/goals-key-performance-areas-role.component';
import { PerformanceReviewTypeComponent } from './components/performance-review-type/performance-review-type.component';
import { PerformanceReviewTypeService } from './services/performance-review-type.service';
import { PerformanceReviewPhasesComponent } from './components/performance-review-phases/performance-review-phases.component';
import { PerformanceReviewPhasesService } from './services/performance-review-phases.service';
import { PerformanceReviewGradesComponent } from './components/performance-review-grades/performance-review-grades.component';
import { PerformanceReviewCycleScheduleComponent } from './components/performance-review-cycle-schedule/performance-review-cycle-schedule.component';
import { PerformanceReviewGradesService } from './services/performance-review-grades.service';
import { PerformanceReviewCycleScheduleService } from './services/performance-review-cycle-schedule.service';
import { PerformanceReviewCyclesComponent } from './components/performance-review-cycles/performance-review-cycles.component';
import { PerformanceReviewCyclesService } from './services/performance-review-cycles.service';
import { GoalsKeyperformanceAreasRolesService } from './services/goals-key-performance-areas-roles.service';
import { KeyPerformanceAreaComponent } from './components/key-performance-area/key-performance-area.component';
import { KeyPerformanceAreaService } from './services/key-performance-area.service';
import { EmployeeTypeService } from './services/employee-type.service';
import { EmployeeFormComponent } from './components/employee-details/employee-form/employee-form.component';
import { AppraisalFormComponent } from './components/appraisal-form/appraisal-form.component';
import { AppraisalDetailsComponent } from './components/appraisal-details/appraisal-details.component';
import { GoalsKeyPerformanceAreasRolesFormComponent } from './components/goals-key-performance-areas-roles-form/goals-key-performance-areas-roles-form.component';
import { EmployeeInfoComponent } from './components/employee-details/employee-info/employee-info.component';
import { CompanyDetailsComponent } from './components/employee-details/company-details/company-details.component';
import { JoiningDetailsComponent } from './components/employee-details/joining-details/joining-details.component';
import { AddressContactDetailsComponent } from './components/employee-details/address-contact-details/address-contact-details.component';
import { ProfessionalInfoComponent } from './components/employee-details/professional-info/professional-info.component';
import { PersonalDetailsComponent } from './components/employee-details/personal-details/personal-details.component';


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
    EmployeeTypeComponent,
    GoalsKeyPerformanceAreasRoleComponent,
    KeyPerformanceAreaComponent,
    KeyPerformanceAreasEmployeeGradeComponent,
    PerformanceReviewTypeComponent,
    PerformanceReviewPhasesComponent,
    PerformanceReviewGradesComponent,
    PerformanceReviewCycleScheduleComponent,
    PerformanceReviewCyclesComponent,
    AppraisalFormComponent,
    AppraisalDetailsComponent,
    GoalsKeyPerformanceAreasRolesFormComponent,
    EmployeeInfoComponent,
    CompanyDetailsComponent,
    JoiningDetailsComponent,
    AddressContactDetailsComponent,
    ProfessionalInfoComponent,
    PersonalDetailsComponent,
  
   
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
    EmployeeTypeService,
    CommonService,
    KeyPerformanceAreaService,
    KeyPerformanceAreasEmployeeGradeService,
    GoalsKeyperformanceAreasRolesService,
    PerformanceReviewTypeService,
    PerformanceReviewPhasesService,
    PerformanceReviewGradesService,
    PerformanceReviewCyclesService,
    PerformanceReviewCycleScheduleService,
    DropdownService,
    SweetalertServiceService
  ]
})
export class PerformanceModule { }
