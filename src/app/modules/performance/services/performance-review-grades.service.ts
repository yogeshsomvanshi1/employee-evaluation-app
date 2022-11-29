import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PerformanceReviewGrades } from '../model/performance-review-grade.model';

@Injectable()
export class PerformanceReviewGradesService {

  constructor(private httpClient:HttpClient) { }


  getPerformanceReviewGradesListContent(param: HttpParams): Observable<{ results: Array<PerformanceReviewGrades>, count: number }> {
    const options = { params: param };
    return this.httpClient.get<{ results: Array<PerformanceReviewGrades>, count: number }>(`${environment.performance}core/performance-review-grades/`, options);
  }

  getById(id: number): Observable<PerformanceReviewGrades> {
		return this.httpClient.get<PerformanceReviewGrades>(`${environment.performance}core/performance-review-grades/${id}/`);
	}

  softDelete(grade_id: number) {
		return this.httpClient.delete(`${environment.performance}core/performance-review-grades/` + grade_id + `/`);
	}

  create(reviewGrade: PerformanceReviewGrades): Observable<PerformanceReviewGrades> {
		return this.httpClient.post<PerformanceReviewGrades>(`${environment.performance}core/performance-review-grades/`, reviewGrade)
	}

  update(grade: PerformanceReviewGrades, grade_code: number) {
		return this.httpClient.put(`${environment.performance}core/performance-review-grades/` + grade_code + `/`, grade);
	}

  
}

