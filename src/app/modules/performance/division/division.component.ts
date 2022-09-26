import { PerformanceService } from "./../services/performance.service";
import { Router } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import { forkJoin } from "rxjs";
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: "app-division",
  templateUrl: "./division.component.html",
  styleUrls: ["./division.component.scss"],
  providers: [PerformanceService],
})
export class DivisionComponent implements OnInit {
  columnsMetadata: any;
  permission: Array<boolean> = [true, true, true];
  dataDataTable: any;
  modalRef: BsModalRef;
  divisionForm: FormGroup;


  constructor(
    private router: Router,
    private performanceService: PerformanceService,
    private formbuilder: FormBuilder,
    private modalService: BsModalService,
  ) {
    this.divisionForm = this.initForm();
  }

  ngOnInit(): void {
    forkJoin({
      tableHeader: this.performanceService.getDivisionHeaderColumes(),

      tableData: this.performanceService.getDivisionContentColumes(),
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
    return this.formbuilder.group({
      divisionId: ["", Validators.required],
      divisionName: ["", Validators.required],
      divisionDescription: ["", Validators.required],
    });
  }

  buttonEvent1(data: any, template2) {
    if (data.event == "add") {
      this.editConsumerAttribute(template2)
    } else if (data.event == "edit") {
     
    } else if (data.event == "delete") {
    }
  }

  
  submit() {
    console.log(this.divisionForm.value);
  }
}
