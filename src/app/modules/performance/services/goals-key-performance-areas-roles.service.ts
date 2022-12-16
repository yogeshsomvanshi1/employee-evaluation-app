import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { GoalsKeyPerformanceAreasRole } from '../model/golas-key-performance-areas-role.model';

@Injectable()
export class GoalsKeyperformanceAreasRolesService {

  constructor(private httpClient:HttpClient) { }

  getGoalsKeyPerformanceAreasRoleListContent(param: HttpParams): Observable<{
    [x: string]: any; results: Array<GoalsKeyPerformanceAreasRole>, count: number}> {
		const options = { params: param };
		return this.httpClient.get<{ results: Array<GoalsKeyPerformanceAreasRole>, count: number }>(`${environment.performance}core/goalskeyperformanceareasroles/`, options);
	}

	create(keyPerformance: GoalsKeyPerformanceAreasRole): Observable<GoalsKeyPerformanceAreasRole> {
		return this.httpClient.post<GoalsKeyPerformanceAreasRole>(`${environment.performance}core/goalskeyperformanceareasroles/`, keyPerformance)
	}

	getById(id: number): Observable<GoalsKeyPerformanceAreasRole> {
		return this.httpClient.get<GoalsKeyPerformanceAreasRole>(`${environment.performance}core/goalskeyperformanceareasroles/${id}/`);
	}

	update(keyPerformanceGrade: GoalsKeyPerformanceAreasRole, id: number) {
		return this.httpClient.put(`${environment.performance}core/goalskeyperformanceareasroles/` + id + `/`, keyPerformanceGrade);
	}

	softDelete(kp_id: number) {
		return this.httpClient.delete(`${environment.performance}core/goalskeyperformanceareasroles/` + kp_id + `/`);
	}

	getGoalsKeyPerformanceAreasRoleListContents(): Observable<GoalsKeyPerformanceAreasRole> {
			return this.httpClient.get<GoalsKeyPerformanceAreasRole>(`${environment.performance}core/goalskeyperformanceareasroles/`);
		}
}
