import { PerformanceService } from "./../services/performance.service";
import { Component, OnInit } from "@angular/core";
import { forkJoin } from "rxjs";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";

@Component({
  selector: "app-designation",
  templateUrl: "./designation.component.html",
  styleUrls: ["./designation.component.scss"],
  providers: [PerformanceService],
})
export class DesignationComponent implements OnInit {
  columnsMetadata: any;
  permission: Array<boolean> = [true, true, true];
  dataDataTable: any;
  modalRef: BsModalRef;
  designationForm: FormGroup;

  constructor(
    private performanceService: PerformanceService,
    private formBuilder: FormBuilder,
    private modalService: BsModalService,
  ) {this.designationForm = this.initForm();}

  ngOnInit(): void {
    forkJoin({
      tableHeader: this.performanceService.getDesignationHeaderColumes(),

      tableData: this.performanceService.getDesignationContentColumes(),
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

  initForm(): FormGroup {
    return this.formBuilder.group({
      designationId: ["", Validators.required],
      designationName: ["", Validators.required],
      designationDescription: ["", Validators.required],
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
    console.log(this.designationForm.value);
  }
}
