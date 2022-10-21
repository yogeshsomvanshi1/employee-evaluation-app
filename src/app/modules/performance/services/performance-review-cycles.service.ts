import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PerformanceReviewCycles } from '../model/performance-review-cycles.model';

@Injectable()
export class PerformanceReviewCyclesService {

  constructor(private httpClient:HttpClient) { }

  getPerformanceReviewCycleListContent(param: HttpParams): Observable<{ results: Array<PerformanceReviewCycles>, count: number }> {
    const options = { params: param };
    return this.httpClient.get<{ results: Array<PerformanceReviewCycles>, count: number }>(`${environment.performance}core/performance-review-cycles/`, options);
  }

  getById(id: number): Observable<PerformanceReviewCycles> {
		return this.httpClient.get<PerformanceReviewCycles>(`${environment.performance}core/performance-review-cycles/${id}/`);
	}

  softDelete(reviewCycle_id: number) {
		return this.httpClient.delete(`${environment.performance}core/performance-review-cycles/` + reviewCycle_id + `/`);
	}

  create(reviewCycle: PerformanceReviewCycles): Observable<PerformanceReviewCycles> {
		return this.httpClient.post<PerformanceReviewCycles>(`${environment.performance}core/performance-review-cycles/`, reviewCycle)
	}

  update(cycleId: PerformanceReviewCycles, reviewCycle: number) {
		return this.httpClient.put(`${environment.performance}core/performance-review-cycles/` + reviewCycle + `/`, cycleId);
	}


}
