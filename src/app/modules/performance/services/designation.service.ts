import { Designation } from './../model/designation.model';
import { Division } from './../model/division.model';
import { environment } from './../../../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class DesignationService {

	constructor(private httpClient: HttpClient) { }

	getDesignationContent(param: HttpParams): Observable<{ results: Array<Designation>, count: number }> {
		const options = { params: param };
		return this.httpClient.get<{ results: Array<Designation>, count: number }>(`${environment.performance}core/designation/`, options)
	}

	create(designationForm: Designation): Observable<Designation> {
		return this.httpClient.post<Designation>(`${environment.performance}core/designation/`, designationForm)
	}

	getById(id: number): Observable<Designation> {
		return this.httpClient.get<Designation>(`${environment.performance}core/designation/${id}/`);
	}

	getAll(): Observable<{ content: Array<Designation>; totalPages: number }> {
		return this.httpClient.get<{ content: Array<Designation>; totalPages: number; }>(`${environment.performance}core/designation/`);
	}

	update(designation: Designation, des_code: number) {
		return this.httpClient.put(`${environment.performance}core/designation/${des_code}/`, designation);
	}

	softDelete(des_code: number) {
		return this.httpClient.delete(`${environment.performance}core/designation/${des_code}/`);
	}

}
