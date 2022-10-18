import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { KeyPerformanceList } from "../model/key-performance-list.model";


@Injectable()
export class KeyPerformanceListService {
    
	constructor(private httpClient: HttpClient) { }

    getKeyPerformanceListContent(param: HttpParams): Observable<{ results: Array<KeyPerformanceList>, count: number }> {
		const options = { params: param };
		return this.httpClient.get<{ results: Array<KeyPerformanceList>, count: number }>(`${environment.performance}core/key-performance-list/`, options);
	}

	getAllKeyPerformanceList(): Observable<{ results: Array<KeyPerformanceList>, count: number }> {
		return this.httpClient.get<{ results: Array<KeyPerformanceList>, count: number }>(`${environment.performance}core/key-performance-list/`);
	}

	create(keyPerformance: KeyPerformanceList): Observable<KeyPerformanceList> {
		return this.httpClient.post<KeyPerformanceList>(`${environment.performance}core/key-performance-list/`, keyPerformance)
	}

	getById(id: number): Observable<KeyPerformanceList> {
		return this.httpClient.get<KeyPerformanceList>(`${environment.performance}core/keyperformancelist/${id}/`);
	}

	update(keyPerformance: KeyPerformanceList, kp_id: number) {
		return this.httpClient.put(`${environment.performance}core/key-performance-list/` + kp_id + `/`, keyPerformance);
	}

	softDelete(kp_id: number) {
		return this.httpClient.delete(`${environment.performance}core/key-performance-list/` + kp_id + `/`);
	}
}