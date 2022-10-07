import { Department } from './../model/department.model';
import { environment } from 'src/environments/environment';;
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class DepartmentService {

	constructor(private httpCilent: HttpClient) { }

	create(departmentForm: Department): Observable<Department> {
		return this.httpCilent.post<Department>(`${environment.performance}core/department/`, departmentForm);
	}

	getById(id: number): Observable<Department> {
		return this.httpCilent.get<Department>(`${environment.performance}core/department/${id}/`);
	}

	getAll(param: HttpParams): Observable<{ content: Array<Department>; totalPages: number }> {
		const options = { params: param };
		return this.httpCilent.get<{ content: Array<Department>; totalPages: number; }>(`${environment.performance}core/department/`, options);
	}

	update(department: FormData, dept_code: number) {
		return this.httpCilent.put(`${environment.performance}core/department/` + dept_code + `/`, department);
	}

	softDelete(dept_code: number) {
		return this.httpCilent.delete(`${environment.performance}core/department/` + dept_code + `/`);
	}

	getDepartmentContent(param: HttpParams){
		const options = {params: param};
		return this.httpCilent.get(`${environment.performance}core/department/`,options);
	}

}
