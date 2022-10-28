import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PerformanceReviewCycleSchedule } from '../model/performance-review-cycle-schedule.model';

@Injectable()
export class PerformanceReviewCycleScheduleService {

  constructor(private httpClient:HttpClient) { }

  getPerformanceReviewCycleScheduleListContent(param: HttpParams): Observable<{ results: Array<PerformanceReviewCycleSchedule>, count: number }> {
    const options = { params: param };
    return this.httpClient.get<{ results: Array<PerformanceReviewCycleSchedule>, count: number }>(`${environment.performance}core/performance-review-cycles-schedule/`, options);
  }

  getById(id: number): Observable<PerformanceReviewCycleSchedule> {
		return this.httpClient.get<PerformanceReviewCycleSchedule>(`${environment.performance}core/performance-review-cycles-schedule/${id}/`);
	}

  softDelete(reviewCycle_id: number) {
		return this.httpClient.delete(`${environment.performance}core/performance-review-cycles-schedule/` + reviewCycle_id + `/`);
	}

  create(reviewCycle: PerformanceReviewCycleSchedule): Observable<PerformanceReviewCycleSchedule> {
		return this.httpClient.post<PerformanceReviewCycleSchedule>(`${environment.performance}core/performance-review-cycles-schedule/`, reviewCycle)
	}

  update(cycleId: PerformanceReviewCycleSchedule, reviewCycle: number) {
		return this.httpClient.put(`${environment.performance}core/performance-review-cycles-schedule/` + reviewCycle + `/`, cycleId);
	}
}
