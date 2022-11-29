import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Employee } from "../model/employee.model";

@Injectable()
export class EmployeeService {
    
    constructor(private httpClient: HttpClient){}

    create(formData: FormData){
        return this.httpClient.post(`${environment.performance}core/employees/`,formData)
    }

    update(formData: FormData, emp_code: number){
        return this.httpClient.put(`${environment.performance}core/employees/${emp_code}/`,formData)
    }

    softDelete(emp_code: number) {
		return this.httpClient.delete(`${environment.performance}core/employees/${emp_code}/`);
	}

    getById(id: number): Observable<Employee> {
		return this.httpClient.get<Employee>(`${environment.performance}core/employees/${id}/`);
	}
    
    getEmployeeContent(param: HttpParams): Observable<{ results: Array<Employee>, count: number }> {
		const options = { params: param };
		return this.httpClient.get<{ results: Array<Employee>, count: number }>(`${environment.performance}core/employees/`, options);
	}


   


}