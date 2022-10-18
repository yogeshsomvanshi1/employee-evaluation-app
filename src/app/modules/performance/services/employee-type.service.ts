import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { EmployeeType } from './../model/employee-type.model';


@Injectable()
export class EmployeeTypeService {

    constructor(private httpClient: HttpClient){}
    
    getEmployeeTypeContent(param: HttpParams): Observable<{ results: Array<EmployeeType>, count: number }> {
		const options = { params: param };
		return this.httpClient.get<{ results: Array<EmployeeType>, count: number }>(`${environment.performance}core/employeetype/`, options);
	}

	getAllEmployeeType(): Observable<{ results: Array<EmployeeType>, count: number }> {
		return this.httpClient.get<{ results: Array<EmployeeType>, count: number }>(`${environment.performance}core/employeetype/`);
	}

	create(empTypeForm: EmployeeType): Observable<EmployeeType> {
		return this.httpClient.post<EmployeeType>(`${environment.performance}core/employeetype/`, empTypeForm)
	}

	getById(id: number): Observable<EmployeeType> {
		return this.httpClient.get<EmployeeType>(`${environment.performance}core/employeetype/${id}/`);
	}

	update(empTypeForm: EmployeeType, emp_code: number) {
		return this.httpClient.put(`${environment.performance}core/employeetype/${emp_code}/`, empTypeForm);
	}

	softDelete(emp_code: number) {
		return this.httpClient.delete(`${environment.performance}core/employeetype/${emp_code}/`);
	}
}