import { HttpParams } from '@angular/common/http';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { forkJoin } from 'rxjs';
import { AlertOptions } from 'src/app/modules/shared/model/alert.model';
import { TableHeaderMetaData } from 'src/app/modules/shared/model/table-header-list.model';
import { AlertService } from 'src/app/modules/shared/services/alert.service';
import { Employee } from '../../model/employee.model';
import { GoalsKeyPerformanceAreasRole } from '../../model/golas-key-performance-areas-role.model';
import { PerformanceReviewGrades } from '../../model/performance-review-grade.model';
import { EmployeeService } from '../../services/employee.service';
import { PerformanceService } from '../../services/performance.service';

@Component({
  selector: 'app-appraisal-details',
  templateUrl: './appraisal-details.component.html',
  styleUrls: ['./appraisal-details.component.scss']
})
export class AppraisalDetailsComponent implements OnInit {

  @ViewChild('apparaisalDetails') gradeTemplate: TemplateRef<BsModalRef>;
  alertOptions: AlertOptions = { autoClose: true, keepAfterRouteChange: true };
  currentPage=0;
  columnsMetadata: TableHeaderMetaData;
  dataDescription: Array<GoalsKeyPerformanceAreasRole> = []; 
	dataDataTable: { results: Array<Employee>, count: number } = { results: [], count: 0 };
  gradeDescription : Array<PerformanceReviewGrades> = [];
	modalRef: BsModalRef;
  params: HttpParams = new HttpParams();
  permission: Array<boolean> = [true, true, true];
  
  constructor(
    private employeeService: EmployeeService,
    private modalService: BsModalService,
    private performanceService: PerformanceService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.params = this.params.append('offset', 0);
    this.params = this.params.append('limit', 5);
    forkJoin({
      tableHeader: this.performanceService.getEmployeHeader(),
      tableData: this.employeeService.getEmployeeContent(this.params)
    }).subscribe((res: any) => {
      this.columnsMetadata = res.tableHeader;
      this.dataDataTable = res.tableData;
    })

  }

  openTemplate() {
		this.modalRef = this.modalService.show(this.gradeTemplate, Object.assign({}, { class: "gray modal-lg " })
		);
	}

  buttonEvent1(data: any){
   
    if (data.event == "add") {
			// this.router.navigate(['/performance/performance/apparaisal-details'])
    } 
		else if (data.event == "edit") {
      this.router.navigate(['/performance/performance/apparaisal-form'], { queryParams: { data: data.data.emp_code } });
    }
    // else if (data.event == "delete") {
    //   this.employeeService.softDelete( data.data.emp_code).subscribe((res) => {
    //     this.alertServices.success('Record deleted successfully', this.alertOptions);
    //     this.changePageSortSearch(this.params);
    //   })
    // }

  }

  changePageSortSearch(data:HttpParams){
    let offset = data.get('offset')
		let limit =data.get('limit')
		this.currentPage =Number (offset) / Number (limit)
    this.params = data;
	  this.employeeService.getEmployeeContent(data).subscribe((response: { results: Array<Employee>, count: number })=>{
		this.dataDataTable = response;
	})
  }
}