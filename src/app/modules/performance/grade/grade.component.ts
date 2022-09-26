import { PerformanceService } from "./../services/performance.service";
import { Component, OnInit } from "@angular/core";
import { forkJoin } from "rxjs";
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: "app-grade",
  templateUrl: "./grade.component.html",
  styleUrls: ["./grade.component.scss"],
  providers: [PerformanceService],
})
export class GradeComponent implements OnInit {
  columnsMetadata: any;
  permission: Array<boolean> = [true, true, true];
  dataDataTable: any;
  modalRef: BsModalRef;
  gradeForm: FormGroup;

  constructor(
    private performanceService: PerformanceService,
    private formBuilder: FormBuilder,
    private modalService: BsModalService
  ) {this.gradeForm = this.initForm();}

  ngOnInit(): void {
    forkJoin({
      tableHeader: this.performanceService.getGradeHeaderColumes(),

      tableData: this.performanceService.getGradeContentColumes(),
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
    this.modalRef = this.modalService.show(
      template2,
      Object.assign({}, { class: "gray modal-lg " })
    );
  }

  initForm(): FormGroup {
    return this.formBuilder.group({
      gradeId: ["", Validators.required],
      gradeName: ["", Validators.required],
      gradeDescription: ["", Validators.required],
    });
  }

  buttonEvent1(data: any, template2) {
    if (data.event == "add") {
    this.editConsumerAttribute(template2)
    } else if (data.event == "edit") {
      // this.router.navigate(['crm/crm/product-family-form'], { queryParams: { data: JSON.stringify(data.data.id) } });
    } else if (data.event == "delete") {
    }
  }

  submit() {
    console.log(this.gradeForm.value);
  }
}
