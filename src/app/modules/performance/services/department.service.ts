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

	update(department: Department, dept_code: number) {
		return this.httpCilent.put(`${environment.performance}core/department/${dept_code}/`, department);
	}

	softDelete(dept_code: number) {
		return this.httpCilent.delete(`${environment.performance}core/department/${dept_code}/`);
	}

	getDepartmentContent(param: HttpParams): Observable<{ results: Array<Department>, count: number }>{
		const options = {params: param};
		return this.httpCilent.get<{ results: Array<Department>, count: number }>(`${environment.performance}core/department/`,options);
	}

}
