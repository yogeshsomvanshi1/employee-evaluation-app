import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class PerformanceService {

	constructor(private httpClient: HttpClient) { }

	getHeaderColumn() {
		return this.httpClient.get("./assets/data-table-header.json");
	}

	getDivisionHeaderColumn() {
		return this.httpClient.get("./assets/data-table-division-header.json");
	}

	getDivisionContentColumn() {
		return this.httpClient.get("./assets/data-table-division-content.json");
	}

	getGradeHeaderColumn() {
		return this.httpClient.get("./assets/data-table-grade-header.json");
	}

	getGradeContentColumn() {
		return this.httpClient.get("./assets/data-table-grade-content.json");
	}

	getRoleHeaderColumn() {
		return this.httpClient.get("./assets/data-table-role-header.json");
	}

	getRoleContentColumn() {
		return this.httpClient.get("./assets/data-table-role-content.json");
	}

	getDesignationHeaderColumn() {
		return this.httpClient.get("./assets/data-table-designation-header.json");
	}

	getDesignationContentColumn() {
		return this.httpClient.get("./assets/data-table-designation-content.json");
	}

	getEmployeHeader(){
		return this.httpClient.get("./assets/data-table-employee-header.json");
	}

	getEmployeeTypeHeader(){
		return this.httpClient.get("./assets/data-table-employee-type-header.json");
	}

	
}
