import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PerformanceReviewTypes } from '../model/performance-review-type.model';

@Injectable()
export class PerformanceReviewTypeService {

  constructor(private httpClient:HttpClient) { }

  getPerformanceReviewTypeListContent(param: HttpParams): Observable<{ results: Array<PerformanceReviewTypes>, count: number }> {
		const options = { params: param };
		return this.httpClient.get<{ results: Array<PerformanceReviewTypes>, count: number }>(`${environment.performance}core/performancereviewtype/`, options);
	}

	create(gradeForm: PerformanceReviewTypes): Observable<PerformanceReviewTypes> {
		return this.httpClient.post<PerformanceReviewTypes>(`${environment.performance}core/performancereviewtype/`, gradeForm)
	}

	getById(id: number): Observable<PerformanceReviewTypes> {
		return this.httpClient.get<PerformanceReviewTypes>(`${environment.performance}core/performancereviewtype/${id}/`);
	}

	update(grade: PerformanceReviewTypes, grade_code: number) {
		return this.httpClient.put(`${environment.performance}core/performancereviewtype/` + grade_code + `/`, grade);
	}

	softDelete(grade_code: number) {
		return this.httpClient.delete(`${environment.performance}core/performancereviewtype/` + grade_code + `/`);
	}
}