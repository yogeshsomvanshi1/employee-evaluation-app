import { HttpParams, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { KeyPerformanceAreasEmployeeGrade } from '../model/key-performance-areas-employee-grade.model';

@Injectable()
export class KeyPerformanceAreasEmployeeGradeService {

  constructor(private httpClient:HttpClient) { }

  getKeyPerformanceAreaEmployeeGradeListContent(param: HttpParams): Observable<{ results: Array<KeyPerformanceAreasEmployeeGrade>, count: number }> {
		const options = { params: param };
		return this.httpClient.get<{ results: Array<KeyPerformanceAreasEmployeeGrade>, count: number }>(`${environment.performance}core/keyperfomanceareasemployeegrades/`, options);
	}

	create(keyPerformance: KeyPerformanceAreasEmployeeGrade): Observable<KeyPerformanceAreasEmployeeGrade> {
		return this.httpClient.post<KeyPerformanceAreasEmployeeGrade>(`${environment.performance}core/keyperfomanceareasemployeegrades/`, keyPerformance)
	}

	getById(id: number): Observable<KeyPerformanceAreasEmployeeGrade> {
		return this.httpClient.get<KeyPerformanceAreasEmployeeGrade>(`${environment.performance}core/keyperfomanceareasemployeegrades/${id}/`);
	}

	update(keyPerformanceGrade: KeyPerformanceAreasEmployeeGrade, id: number) {
		return this.httpClient.put(`${environment.performance}core/keyperfomanceareasemployeegrades/` + id + `/`, keyPerformanceGrade);
	}

	softDelete(kp_id: number) {
		return this.httpClient.delete(`${environment.performance}core/keyperfomanceareasemployeegrades/` + kp_id + `/`);
	}
}
