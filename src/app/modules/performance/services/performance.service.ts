import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class PerformanceService {

  constructor(private httpClient: HttpClient) { }

  getHeaderColumes(){
    return this.httpClient.get("./assets/data-table-header.json");
  }

  getContentColumes(){
    return this.httpClient.get("./assets/data-table-content.json");
  }

  getDivisionHeaderColumes(){
    return this.httpClient.get("./assets/data-table-division-header.json");
  }

  getDivisionContentColumes(){
    return this.httpClient.get("./assets/data-table-division-content.json");
  }

  getGradeHeaderColumes(){
    return this.httpClient.get("./assets/data-table-grade-header.json");
  }

  getGradeContentColumes(){
    return this.httpClient.get("./assets/data-table-grade-content.json");
  }

  getRoleHeaderColumes(){
    return this.httpClient.get("./assets/data-table-role-header.json");
  }

  getRoleContentColumes(){
    return this.httpClient.get("./assets/data-table-role-content.json");
  }

  getDesignationHeaderColumes(){
    return this.httpClient.get("./assets/data-table-designation-header.json");
  }

  getDesignationContentColumes(){
    return this.httpClient.get("./assets/data-table-designation-content.json");
  }
}
