import { Designation } from './../model/designation.model';
import { Division } from './../model/division.model';
import { environment } from './../../../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class DesignationService {

	constructor(private httpClient: HttpClient) { }

	getDesignationContent(param: HttpParams) {
		const options = { params: param };
		return this.httpClient.get(`${environment.performance}core/designation/`, options)
	}

	create(designationForm: FormData): Observable<Designation> {
		return this.httpClient.post<Designation>(`${environment.performance}core/designation/`, designationForm)
	}

	getById(id: number): Observable<Designation> {
		return this.httpClient.get<Designation>(`${environment.performance}core/designation/${id}/`);
	}

	getAll(param: HttpParams): Observable<{ content: Array<Designation>; totalPages: number }> {
		const options = { params: param };
		return this.httpClient.get<{ content: Array<Designation>; totalPages: number; }>(`${environment.performance}core/designation/`, options);
	}

	update(designation: FormData, des_code: number) {
		return this.httpClient.put(`${environment.performance}core/designation/` + des_code + `/`, designation);
	}

	softDelete(des_code: number) {
		return this.httpClient.delete(`${environment.performance}core/designation/` + des_code + `/`);
	}

}
