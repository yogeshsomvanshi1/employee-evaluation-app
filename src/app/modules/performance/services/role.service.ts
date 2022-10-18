import { Role } from './../model/role.model';
import { environment } from './../../../../environments/environment';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class RoleService {
	
	constructor(private httpClient: HttpClient) { }

	getRoleContent(param: HttpParams): Observable<{ results: Array<Role>, count: number }> {
		const options = { params: param };
		return this.httpClient.get<{ results: Array<Role>, count: number }>(`${environment.performance}core/role/`, options);
	}

	getAllRole(): Observable<{ results: Array<Role>, count: number }> {
		return this.httpClient.get<{ results: Array<Role>, count: number }>(`${environment.performance}core/role/`);
	}

	create(roleForm: Role): Observable<Role> {
		return this.httpClient.post<Role>(`${environment.performance}core/role/`, roleForm)
	}

	getById(id: number): Observable<Role> {
		return this.httpClient.get<Role>(`${environment.performance}core/role/${id}/`);
	}

	update(role: Role, role_code: number) {
		return this.httpClient.put(`${environment.performance}core/role/${role_code}/`, role);
	}

	softDelete(role_code: number) {
		return this.httpClient.delete(`${environment.performance}core/role/${role_code}/`);
	}

}
