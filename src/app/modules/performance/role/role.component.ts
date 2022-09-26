import { PerformanceService } from "./../services/performance.service";
import { Component, OnInit } from "@angular/core";
import { forkJoin } from "rxjs";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";

@Component({
  selector: "app-role",
  templateUrl: "./role.component.html",
  styleUrls: ["./role.component.scss"],
  providers: [PerformanceService],
})
export class RoleComponent implements OnInit {
  columnsMetadata: any;
  permission: Array<boolean> = [true, true, true];
  dataDataTable: any;
  roleForm: FormGroup;
  modalRef: BsModalRef;
  
  constructor(
    private performanceService: PerformanceService,
    private formBuilder: FormBuilder,
    private modalService: BsModalService
  ) {}

  ngOnInit(): void {
    forkJoin({
      tableHeader: this.performanceService.getRoleHeaderColumes(),

      tableData: this.performanceService.getRoleContentColumes(),
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
    this.modalRef = this.modalService.show(template2,
      Object.assign({}, { class: "gray modal-lg " })
    );
  }

  initForm(): FormGroup {
    return this.formBuilder.group({
      roleId: ["", Validators.required],
      roleName: ["", Validators.required],
      roleDescription: ["", Validators.required],
    });
  }

  buttonEvent1(data: any , template2) {
    if (data.event == "add") {
     this.editConsumerAttribute(template2)
    } else if (data.event == "edit") {
      // this.router.navigate(['crm/crm/product-family-form'], { queryParams: { data: JSON.stringify(data.data.id) } });
    } else if (data.event == "delete") {
    }
  }

  submit() {
    console.log(this.roleForm.value);
  }
}
