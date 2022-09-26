import { Router } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import { PerformanceService } from "../services/performance.service";
import { forkJoin } from "rxjs";
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: "app-department",
  templateUrl: "./department.component.html",
  styleUrls: ["./department.component.scss"],
  providers: [PerformanceService],
})
export class DepartmentComponent implements OnInit {
  actionbtn1: string;
  columnsMetadata: any;
  dataDataTable: any;
  modalRef: BsModalRef;
  permission: Array<boolean> = [true, true, true];
 
  departmentForm: FormGroup;

  constructor(
    private router: Router,
    private performanceService: PerformanceService,
    private modalService: BsModalService,
    private formbuilder: FormBuilder
  )
   { this.departmentForm = this.initForm();
  }

  ngOnInit(): void {
    forkJoin({
      tableHeader: this.performanceService.getHeaderColumes(),

      tableData: this.performanceService.getContentColumes(),
    }).subscribe(
      (response) => {
        console.log(response);

        this.columnsMetadata = response.tableHeader;

        this.dataDataTable = response.tableData;
      },

      (error) => {}
    );
  }
 
  initForm(): FormGroup {
    return this.formbuilder.group({

      dept_code: ['', Validators.required],
      dept_name: ['', Validators.required],
      dept_description: ['', Validators.required],
      org_code:['dept', Validators.required]
    });
  }


  editConsumerAttribute(template2) {
    this.modalRef = this.modalService.show(template2, Object.assign({}, { class: 'gray modal-lg ' }));
  }

  submit() {
    console.log(this.departmentForm.value)
  }

  buttonEvent1(data: any , template2) {
    if (data.event == "add") {
      this.editConsumerAttribute(template2)
    } else if (data.event == "edit") {
     
    } else if (data.event == "delete") {
    }
  }
}
