import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { KeyPerformanceList } from "../model/key-performance-areas.model";


@Injectable()
export class KeyPerformanceAreaService {
    
	constructor(private httpClient: HttpClient) { }

    getKeyPerformanceListContent(param: HttpParams): Observable<{ results: Array<KeyPerformanceList>, count: number }> {
		const options = { params: param };
		return this.httpClient.get<{ results: Array<KeyPerformanceList>, count: number }>(`${environment.performance}core/keyperformance/`, options);
	}

	create(keyPerformance: KeyPerformanceList): Observable<KeyPerformanceList> {
		return this.httpClient.post<KeyPerformanceList>(`${environment.performance}core/keyperformance/`, keyPerformance)
	}

	getById(id: number): Observable<KeyPerformanceList> {
		return this.httpClient.get<KeyPerformanceList>(`${environment.performance}core/keyperformance/${id}/`);
	}

	update(keyPerformance: KeyPerformanceList, kpa_id: number) {
		return this.httpClient.put(`${environment.performance}core/keyperformance/` + kpa_id + `/`, keyPerformance);
	}

	softDelete(kp_id: number) {
		return this.httpClient.delete(`${environment.performance}core/keyperformance/` + kp_id + `/`);
	}
}