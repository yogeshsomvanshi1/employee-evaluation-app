import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Division } from '../model/division.model';

@Injectable()
export class DivisionService {

	constructor(private httpClient: HttpClient) { }

	getDivisionContent(param: HttpParams): Observable<{ results: Array<Division>, count: number }> {
		const options = { params: param };
		return this.httpClient.get<{ results: Array<Division>, count: number }>(`${environment.performance}core/division/`, options);
	}

	getAllDivision():Observable<{ results: Array<Division>, count: number }>{
		return this.httpClient.get<{ results: Array<Division>, count: number }>(`${environment.performance}core/division/`);
	}

	create(divisionForm: Division): Observable<Division> {
		return this.httpClient.post<Division>(`${environment.performance}core/division/`, divisionForm)
	}

	getById(id: number): Observable<Division> {
		return this.httpClient.get<Division>(`${environment.performance}core/division/${id}/`);
	}

	update(division: Division, dept_code: number) {
		return this.httpClient.put(`${environment.performance}core/division/${dept_code}/`, division);
	}

	softDelete(dept_code: number) {
		return this.httpClient.delete(`${environment.performance}core/division/${dept_code}/`);
	}

}
