import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Department } from '../model/department.model';
import { Division } from '../model/division.model';

@Injectable()
export class DivisionService {

  constructor(private httpClient: HttpClient) { }

  getDivisionContentColumes1(param: HttpParams){
    const options = {
      params: param
  };
    return this.httpClient.get("http://192.168.1.11:9999/core/division/", options);
  }


  create(divisionForm:FormData): Observable<Division>{
   return this.httpClient.post<Division> (`${environment.performance}/core/division/` , divisionForm)
  }

  getById(id: number): Observable<Division> {
    return this.httpClient.get<Division>(`${environment.performance}core/division/${id}/`);
  }

  getAll(
    param: HttpParams
  ): Observable<{ content: Array<Division>; totalPages: number }> {
    const options = {
      params: param,
    };
    
    return this.httpClient.get<{
      content: Array<Division>;
      totalPages: number;
    }>(`${environment.performance}core/division/`, options);
  }
  
  update(division: FormData, dept_code : number ) {
    return this.httpClient.put(`${environment.performance}core/division/`+ dept_code+`/` ,division );
  }
  
  softDelete(div_code : number) {
    return this.httpClient.delete(`${environment.performance}core/division/` + div_code + `/`);
  }
  
}
