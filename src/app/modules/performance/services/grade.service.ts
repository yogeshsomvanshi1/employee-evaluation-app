import { Grade } from './../model/grade.model';
import { environment } from './../../../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class GradeService {

	constructor(private httpClient: HttpClient) { }

	getGradeContent(param: HttpParams): Observable<{ results: Array<Grade>, count: number }> {
		const options = { params: param };
		return this.httpClient.get<{ results: Array<Grade>, count: number }>(`${environment.performance}core/grade/`, options);
	}

	getAllGrade(): Observable<{ results: Array<Grade>, count: number }> {
		return this.httpClient.get<{ results: Array<Grade>, count: number }>(`${environment.performance}core/grade/`);
	}

	create(gradeForm: Grade): Observable<Grade> {
		return this.httpClient.post<Grade>(`${environment.performance}core/grade/`, gradeForm)
	}

	getById(id: number): Observable<Grade> {
		return this.httpClient.get<Grade>(`${environment.performance}core/grade/${id}/`);
	}

	update(grade: Grade, grade_code: number) {
		return this.httpClient.put(`${environment.performance}core/grade/${grade_code}/`, grade);
	}

	softDelete(grade_code: number) {
		return this.httpClient.delete(`${environment.performance}core/grade/${grade_code}/`);
	}

}
