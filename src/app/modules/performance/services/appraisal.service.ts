import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Employee } from '../model/employee.model';
import { GoalsKeyPerformanceAreasRole } from '../model/golas-key-performance-areas-role.model';
import { PerformanceReviewGrades } from '../model/performance-review-grade.model';

@Injectable({
  providedIn: 'root'
})
export class AppraisalService {

  constructor(private httpClient:HttpClient) { }

  getGoalsKeyPerformanceAreasRoleListContent(): Observable<GoalsKeyPerformanceAreasRole> {
		return this.httpClient.get<GoalsKeyPerformanceAreasRole>(`${environment.performance}core/goalskeyperformanceareasroles/`);
	}

  getPerformanceReviewGradesListContent(): Observable<PerformanceReviewGrades> {
    return this.httpClient.get<PerformanceReviewGrades>(`${environment.performance}core/performance-review-grades/`);
  }

  getEmployeeContent(): Observable<Employee> {
		return this.httpClient.get<Employee>(`${environment.performance}core/employees/`);
	}
}
