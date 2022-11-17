import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Department } from '../model/department.model';
import { Designation } from '../model/designation.model';
import { EmployeeType } from '../model/employee-type.model';
import { Employee } from '../model/employee.model';
import { Grade } from '../model/grade.model';
import { KeyPerformanceList } from '../model/key-performance-areas.model';
import { PerformanceReviewCycles } from '../model/performance-review-cycles.model';
import { PerformanceReviewPhases } from '../model/performance-review-phases.model';
import { PerformanceReviewTypes } from '../model/performance-review-type.model';
import { Role } from '../model/role.model';

@Injectable()
export class DropdownService {

	constructor(private httpClient: HttpClient) { }

	getDropdowntKeyPerformanceListContent(): Observable<KeyPerformanceList> {
		return this.httpClient.get<KeyPerformanceList>(`${environment.performance}core/keyperformance/`);
	}


	getDropdownGradeContent(): Observable<Grade> {
		return this.httpClient.get<Grade>(`${environment.performance}core/grade/`);
	}

	getDropdownRoleContent(): Observable<Role> {

		return this.httpClient.get<Role>(`${environment.performance}core/role/`);
	}

	getDropdownPerformanceReviewTypeListContent(): Observable<PerformanceReviewTypes[]> {
		return this.httpClient.get<PerformanceReviewTypes[]>(`${environment.performance}core/performancereviewtype/`);
	}

	getDropdownPerformanceReviewPhasesListContent(): Observable<PerformanceReviewPhases> {
		return this.httpClient.get<PerformanceReviewPhases>(`${environment.performance}core/performance-review-phases/`);
	}

	getDropdownPerformanceReviewCycleListContent(): Observable<PerformanceReviewCycles> {
		return this.httpClient.get<PerformanceReviewCycles>(`${environment.performance}core/performance-review-cycles/`);
	}

	getDropdownDepartmentContent(): Observable<Department> {
		return this.httpClient.get<Department>(`${environment.performance}core/department/`);
	}

	getDropdownEmployeeContent(): Observable<Employee> {
		return this.httpClient.get<Employee>(`${environment.performance}core/employees/`);
	}

	getDropdownAllGrade(): Observable<Grade> {
		return this.httpClient.get<Grade>(`${environment.performance}core/grade/`);
	}

	getDropdownAllRole(): Observable<Role> {
		return this.httpClient.get<Role>(`${environment.performance}core/role/`);
	}

	getDropdownDesignationAll(): Observable<Designation> {
		return this.httpClient.get<Designation>(`${environment.performance}core/designation/`);
	}

	getDropdownAllEmployeeType(): Observable<EmployeeType> {
		return this.httpClient.get<EmployeeType>(`${environment.performance}core/employeetype/`);
	}
}
