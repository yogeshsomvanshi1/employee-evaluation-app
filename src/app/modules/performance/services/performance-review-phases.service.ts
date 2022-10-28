import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PerformanceReviewPhases } from '../model/performance-review-phases.model';

@Injectable()
export class PerformanceReviewPhasesService {

  constructor(private httpClient: HttpClient) { }

  getPerformanceReviewPhasesListContent(param: HttpParams): Observable<{ results: Array<PerformanceReviewPhases>, count: number }> {
    const options = { params: param };
    return this.httpClient.get<{ results: Array<PerformanceReviewPhases>, count: number }>(`${environment.performance}core/performance-review-phases/`, options);
  }

  getById(id: number): Observable<PerformanceReviewPhases> {
		return this.httpClient.get<PerformanceReviewPhases>(`${environment.performance}core/performance-review-phases/${id}/`);
	}

  softDelete(phase_id: number) {
		return this.httpClient.delete(`${environment.performance}core/performance-review-phases/` + phase_id + `/`);
	}

  create(reviewPhase: PerformanceReviewPhases): Observable<PerformanceReviewPhases> {
		return this.httpClient.post<PerformanceReviewPhases>(`${environment.performance}core/performance-review-phases/`, reviewPhase)
	}

  update(grade: PerformanceReviewPhases, grade_code: number) {
		return this.httpClient.put(`${environment.performance}core/performance-review-phases/` + grade_code + `/`, grade);
	}
}
