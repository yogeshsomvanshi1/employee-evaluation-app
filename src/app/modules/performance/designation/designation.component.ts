import { DesignationService } from './../services/designation.service';
import { PerformanceService } from "./../services/performance.service";
import { Component, OnInit } from "@angular/core";
import { forkJoin } from "rxjs";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";
import { HttpParams } from "@angular/common/http";

@Component({
  selector: "app-designation",
  templateUrl: "./designation.component.html",
  styleUrls: ["./designation.component.scss"],
  providers: [PerformanceService , DesignationService],
})
export class DesignationComponent implements OnInit {
  columnsMetadata: any;
  permission: Array<boolean> = [true, true, true];
  dataDataTable: any;
  modalRef: BsModalRef;
  designationForm: FormGroup;
  params:  HttpParams = new HttpParams();
  submitBtn: string = "submit";
  res: any;
  response: any;

  constructor(
    private performanceService: PerformanceService,
    private formBuilder: FormBuilder,
    private modalService: BsModalService,
    private designationService : DesignationService
  ) {this.designationForm = this.initForm();}

  ngOnInit(): void {
    this.params = this.params.append('offset', 0);
    this.params = this.params.append('limit', 5);
    forkJoin({
      tableHeader: this.performanceService.getDesignationHeaderColumes(),

      tableData: this.designationService.getDesignationContentColumes4(this.params),
    }).subscribe(
      (response) => {
        console.log(response);

        this.columnsMetadata = response.tableHeader;

        this.dataDataTable = response.tableData;
      },

      (error) => {}
    );
  }

  
  changePageSortSearch(data: HttpParams) {
    this.designationService.getDesignationContentColumes4(data).subscribe((sucess: any) => {
        this.dataDataTable = sucess;
      });
  }


  editConsumerAttribute(template2) {
    this.modalRef = this.modalService.show(template2, Object.assign({}, { class: "gray modal-lg " })
    );
  }

  initForm(): FormGroup {
    return this.formBuilder.group({
      des_code: ['', Validators.required],
      des_name: ['', Validators.required],
      des_description: ['', Validators.required],
      // org_code:['AVISYS', Validators.required],
      // is_deleted:[false ],
      // created_by:['1'],
      // updated_by:['1']
    });
  }


  buttonEvent1(data: any, template2) {
    if (data.event == "add") {
      this.submitBtn = "Submit";
      this.designationForm.reset();
      this.editConsumerAttribute(template2);
    } else if (data.event == "edit") {
      this.designationService.getById(data.data.des_code).subscribe((res) => {
        this.editConsumerAttribute(template2);
        this.submitBtn = "Update";
        this.designationForm.patchValue(res);
        this.res = res;
      });
    
    } else if (data.event == "delete") {
      this.designationService.softDelete(data.data.des_code).subscribe((sucess1)=>{
        console.log(sucess1,"deleted")
        this.changePageSortSearch(this.params);
       })
    }

  }

  submit() {
    this.designationService.create(this.designationForm.value).subscribe((res) => {
      this.res;
    });

  if (this.submitBtn != "submit") {
    this.update(this.designationForm.controls["des_code"].value);
    this.changePageSortSearch(this.params);
  } else {
    this.designationService.create(this.designationForm.value).subscribe((sucess) => {
      });
  }
}

update(id: number) {
  this.designationService.update(this.designationForm.value, id).subscribe((response) => {
    this.response;
  });
  }
}
