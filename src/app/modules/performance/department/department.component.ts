import { DepartmentService } from "./../services/department.service";
import { Router } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import { PerformanceService } from "../services/performance.service";
import { forkJoin } from "rxjs";
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { HttpParams } from "@angular/common/http";
import { Department } from "../model/department.model";

@Component({
  selector: "app-department",
  templateUrl: "./department.component.html",
  styleUrls: ["./department.component.scss"],
  providers: [PerformanceService ,DepartmentService],
})
export class DepartmentComponent implements OnInit {
  actionbtn1: string;
  columnsMetadata: any;
  dataDataTable: any;
  modalRef: BsModalRef;
  permission: Array<boolean> = [true, true, true];
  params: HttpParams = new HttpParams();
  departmentForm: FormGroup;
  actionBtn: "save";
  res: any;

  constructor(
    private router: Router,
    private performanceService: PerformanceService,
    private modalService: BsModalService,
    private formbuilder: FormBuilder,
    private departmentService: DepartmentService
  ) {
    this.departmentForm = this.initForm();
  }

  ngOnInit(): void {

    this.params = this.params.append("offset", 0);
    this.params = this.params.append("limit", 5);
    forkJoin({
      tableHeader: this.performanceService.getHeaderColumes(),
      tableData: this.performanceService.getContentColumes(this.params),
    }).subscribe(
      (response) => {
        console.log(response);

        this.columnsMetadata = response.tableHeader;
        this.dataDataTable = response.tableData;
      },

      (error) => {}
    );

    if(this.res =! undefined){
      
    }
  }

  changePageSortSearch(data: HttpParams) {
    this.performanceService.getContentColumes(data).subscribe((sucess: any) => {
      this.dataDataTable = sucess;
    });
  }

  initForm(): FormGroup {
    return this.formbuilder.group({
      dept_code: ["", Validators.required],
      dept_name: ["", Validators.required],
      dept_description: ["", Validators.required],
      org_code: ["AVISYS", Validators.required],
      is_deleted: [false],
      created_by: ["1"],
      updated_by: ["1"],
    });
  }

  editConsumerAttribute(template2) {
    this.modalRef = this.modalService.show(
      template2,
      Object.assign({}, { class: "gray modal-lg " })
    );
  }

  submit() {
    console.log(this.departmentForm.value);
  }


  buttonEvent1(data: any, template2) {
    if (data.event == "add") {
      this.departmentForm.reset();
      this.editConsumerAttribute(template2);
    } else if (data.event == "edit") {
      console.log(data);
      this.departmentService.getById(data.data.dept_code).subscribe((res) => {
        this.editConsumerAttribute(template2);
        this.departmentForm.patchValue(res);
        this.res = res;
      });
    } else if (data.event == "delete") {
    }
  }
}
