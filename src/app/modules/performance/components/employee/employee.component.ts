import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { TableHeaderMetaData } from '../../../shared/model/table-header-list.model';
import { EmployeeService } from '../../services/employee.service';
import { PerformanceService } from '../../services/performance.service';
import { Employee } from '../../model/employee.model';
import { AlertService } from 'src/app/modules/shared/services/alert.service';
import { AlertOptions } from 'src/app/modules/shared/model/alert.model';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent implements OnInit {

  alertOptions: AlertOptions = { autoClose: true, keepAfterRouteChange: true };
	columnsMetadata: TableHeaderMetaData;
	dataDataTable: { results: Array<Employee>, count: number } = { results: [], count: 0 };
	permission: Array<boolean> = [true, true, true];
	params: HttpParams = new HttpParams();

  constructor(
    private employeeService: EmployeeService,
    private performanceService: PerformanceService,
    private alertServices: AlertService,
    private router: Router
  ) { }

  ngOnInit(): void {

	this.params = this.params.append('offset', 0);
	this.params = this.params.append('limit', 5);
    forkJoin({
		tableHeader: this.performanceService.getEmployeHeader(),
		tableData: this.employeeService.getEmployeeContent(this.params)
	}).subscribe((res:any)=>{
		this.columnsMetadata = res.tableHeader;
		this.dataDataTable = res.tableData;
    })
  }

  changePageSortSearch(data: HttpParams){
	this.employeeService.getEmployeeContent(data).subscribe((response: { results: Array<Employee>, count: number })=>{
		this.dataDataTable = response;
	})
  }

	buttonEvent1(data: any) {
		if (data.event == "add") {
			this.router.navigate(['/performance/performance/employee-form'])
    } 
		else if (data.event == "edit") {
      this.router.navigate(['/performance/performance/employee-form'], { queryParams: { data: data.data.emp_code } });
      console.log(data.data.emp_code)
    }
    else if (data.event == "delete") {
      this.employeeService.softDelete( data.data.emp_code).subscribe((res:Employee) => {
        this.alertServices.success('Record deleted successfully', this.alertOptions);
        this.changePageSortSearch(this.params);
      })
    }
  }

}
