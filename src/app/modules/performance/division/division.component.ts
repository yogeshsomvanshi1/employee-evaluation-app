import { DivisionService } from './../services/division.service';
import { PerformanceService } from "./../services/performance.service";
import { Router } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import { forkJoin } from "rxjs";
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { HttpParams } from "@angular/common/http";

@Component({
  selector: "app-division",
  templateUrl: "./division.component.html",
  styleUrls: ["./division.component.scss"],
  providers: [PerformanceService , DivisionService],
})
export class DivisionComponent implements OnInit {
  columnsMetadata: any;
  permission: Array<boolean> = [true, true, true];
  dataDataTable: any;
  modalRef: BsModalRef;
  divisionForm: FormGroup;
  params: HttpParams = new HttpParams();
  submitBtn: string = "submit";
  res: any;
  response: any;

  constructor(
    private router: Router,
    private performanceService: PerformanceService,
    private formbuilder: FormBuilder,
    private modalService: BsModalService,
    private divisionService : DivisionService
  ) {
    this.divisionForm = this.initForm();
  }

  ngOnInit(): void {
    this.params = this.params.append('offset', 0);
    this.params = this.params.append('limit', 5);
    forkJoin({
      tableHeader: this.performanceService.getDivisionHeaderColumes(),

      tableData: this.divisionService.getDivisionContentColumes1(this.params),
    }).subscribe(
      (response) => {
        console.log(response);

        this.columnsMetadata = response.tableHeader;

        this.dataDataTable = response.tableData;
      },

      (error) => {}
    );
  }

  editConsumerAttribute(template2) {
    this.modalRef = this.modalService.show(template2, Object.assign({}, { class: "gray modal-lg " })
    );
  }

  changePageSortSearch(data: HttpParams) {
    this.divisionService.getDivisionContentColumes1(data).subscribe((sucess: any) => {
      this.dataDataTable = sucess;
    });
  }

  initForm(): FormGroup {
    return this.formbuilder.group({
      div_code: ["", Validators.required],
      div_name: ["", Validators.required],
      div_description: ["", Validators.required],
      // org_code: ["AVISYS", Validators.required],
      // is_deleted: [false],
      // created_by: ["1"],
      // updated_by: ["1"],
    });
  }

  submit() {
    this.divisionService.create(this.divisionForm.value).subscribe((res) => {
      this.res;
    });

  if (this.submitBtn != "submit") {
    this.update(this.divisionForm.controls["div_code"].value);
    this.changePageSortSearch(this.params);
  } else {
    this.divisionService.create(this.divisionForm.value).subscribe((sucess) => {
      });
  }
}

update(id: number) {
  this.divisionService.update(this.divisionForm.value, id).subscribe((response) => {
    this.response;
  });
  }



  buttonEvent1(data: any, template2) {
    if (data.event == "add") {
      this.editConsumerAttribute(template2)
      this.submitBtn = "Submit";
      this.divisionForm.reset();
    } else if (data.event == "edit") {
      this.divisionService.getById(data.data.div_code).subscribe((res) => {
        this.editConsumerAttribute(template2);
        this.submitBtn = "Update";
        this.divisionForm.patchValue(res);
        this.res = res;
      });
    } else if (data.event == "delete") {
      this.divisionService.softDelete(data.data.div_code).subscribe((sucess1)=>{
        this.changePageSortSearch(this.params);
       })
    }
  }

  
 

}
