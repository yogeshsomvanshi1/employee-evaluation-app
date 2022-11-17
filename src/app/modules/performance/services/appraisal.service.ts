import { HttpClient } from '@angular/common/http';
import { refsToArray } from '@angular/compiler/src/render3/util';
import { Injectable, Pipe } from '@angular/core';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { GoalsKeyPerformanceAreasRole } from '../model/golas-key-performance-areas-role.model';
import { PerformanceReviewGrades } from '../model/performance-review-grade.model';

@Injectable({
  providedIn: 'root'
})
export class AppraisalService {

  constructor(private httpClient:HttpClient) { }

  getGoalsKeyPerformanceAreasRoleListContent(): Observable<GoalsKeyPerformanceAreasRole> {   
		return  this.httpClient.get<GoalsKeyPerformanceAreasRole>(`${environment.performance}core/goalskeyperformanceareasroles/`)
	}  
  // .pipe(filter(res => res.role_id == 'DEV')); 
  getPerformanceReviewGradesListContent(): Observable<PerformanceReviewGrades> {
    return this.httpClient.get<PerformanceReviewGrades>(`${environment.performance}core/performance-review-grades/`);
  }

  // getAppraisalPerformanceReviewGradesListContent(): Observable<PerformanceReviewGrades> {
  //   return this.httpClient.get<PerformanceReviewGrades>(`${environment.performance}core/performance-review-grades/`);
  // }

}
