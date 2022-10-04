import { Grade } from './../model/grade.model';
import { environment } from './../../../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class GradeService {

  
  getDivisionContentColumes2(param: HttpParams){
    const options = {
      params: param
  };
    return this.httpClient.get("http://192.168.1.11:9999/core/grade/", options);
  }


  constructor(private httpClient : HttpClient) { }

  create(gradeForm: FormData): Observable<Grade>{
  return this.httpClient.post<Grade>(`${environment.performance}core/grade/` , gradeForm)
  }

 
   getById(id: number): Observable<Grade> {
     return this.httpClient.get<Grade>(`${environment.performance}core/grade/${id}/`);
   }
 
   getAll(
     param: HttpParams
   ): Observable<{ content: Array<Grade>; totalPages: number }> {
     const options = {
       params: param,
     };
     
     return this.httpClient.get<{
       content: Array<Grade>;
       totalPages: number;
     }>(`${environment.performance}core/grade/`, options);
   }

   update(grade: FormData, grade_code : number ) {
    return this.httpClient.put(`${environment.performance}core/grade/`+ grade_code+`/` ,grade);
  }
  
  softDelete(grade_code : number) {
    return this.httpClient.delete(`${environment.performance}core/grade/` + grade_code + `/`);
  }
  
}
