import { GradeService } from './../services/grade.service';
import { PerformanceService } from "./../services/performance.service";
import { Component, OnInit } from "@angular/core";
import { forkJoin } from "rxjs";
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { HttpParams } from "@angular/common/http";

@Component({
  selector: "app-grade",
  templateUrl: "./grade.component.html",
  styleUrls: ["./grade.component.scss"],
  providers: [PerformanceService , GradeService],
})
export class GradeComponent implements OnInit {
  columnsMetadata: any;
  permission: Array<boolean> = [true, true, true];
  dataDataTable: any;
  modalRef: BsModalRef;
  gradeForm: FormGroup;
  params: HttpParams = new HttpParams();
  submitBtn: string = "submit";
  res: any;
  response: any;

  constructor(
    private performanceService: PerformanceService,
    private formBuilder: FormBuilder,
    private modalService: BsModalService,
    private gradeService : GradeService
  ) {this.gradeForm = this.initForm();}

  ngOnInit(): void {
    this.params = this.params.append('offset', 0);
    this.params = this.params.append('limit', 5);
    forkJoin({
      tableHeader: this.performanceService.getGradeHeaderColumes(),

      tableData: this.gradeService.getDivisionContentColumes2(this.params),
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
    this.gradeService.getDivisionContentColumes2(data).subscribe((sucess: any) => {
      this.dataDataTable = sucess;
    });
  }


  editConsumerAttribute(template2) {
    this.modalRef = this.modalService.show(
      template2,
      Object.assign({}, { class: "gray modal-lg " })
    );
  }

  initForm(): FormGroup {
    return this.formBuilder.group({
      grade_code: ["", Validators.required],
      grade_name: ["", Validators.required],
      // org_code: ["AVISYS", Validators.required],
      // is_deleted: [false],
      // created_by: ["1"],
      // updated_by: ["1"]
    });
  }

  buttonEvent1(data: any, template2) {
    if (data.event == "add") {
      this.submitBtn = "Submit";
      this.gradeForm.reset();
      this.changePageSortSearch(this.params);
    this.editConsumerAttribute(template2)
    } else if (data.event == "edit") {
      this.gradeService.getById(data.data.grade_code).subscribe((res) => {
        this.editConsumerAttribute(template2);
        this.changePageSortSearch(this.params);
        this.submitBtn = "Update";
        this.gradeForm.patchValue(res);
        this.res = res;
      });
    } else if (data.event == "delete") {
      this.gradeService.softDelete(data.data.grade_code).subscribe((sucess1)=>{
        console.log(sucess1,"deleted")
        this.changePageSortSearch(this.params);
       })
    }
  }

  submit() {
    this.gradeService.create(this.gradeForm.value).subscribe((res) => {
      this.res;
    });

  if (this.submitBtn != "submit") {
    this.update(this.gradeForm.controls["grade_code"].value);
    this.changePageSortSearch(this.params);
  } else {
    this.gradeService.create(this.gradeForm.value).subscribe((sucess) => {
      });
  }
  }

  update(id: number) {
    this.gradeService.update(this.gradeForm.value, id).subscribe((response) => {
      this.response;
    });
  }
}
