import { RoleService } from "./../services/role.service";
import { PerformanceService } from "./../services/performance.service";
import { Component, OnInit } from "@angular/core";
import { forkJoin } from "rxjs";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";
import { HttpParams } from "@angular/common/http";

@Component({
  selector: "app-role",
  templateUrl: "./role.component.html",
  styleUrls: ["./role.component.scss"],
  providers: [PerformanceService , RoleService],
})
export class RoleComponent implements OnInit {
  columnsMetadata: any;
  permission: Array<boolean> = [true, true, true];
  dataDataTable: any;
  roleForm: FormGroup;
  modalRef: BsModalRef;
  params: HttpParams = new HttpParams();
  submitBtn: string = "submit";
  res: any;
  response: any;

  constructor(
    private performanceService: PerformanceService,
    private formBuilder: FormBuilder,
    private modalService: BsModalService,
    private roleService: RoleService
  ) {this.roleForm = this.initForm();}

  ngOnInit(): void {
    this.params = this.params.append("offset", 0);
    this.params = this.params.append("limit", 5);
    forkJoin({
      tableHeader: this.performanceService.getRoleHeaderColumes(),

      tableData: this.roleService.getRoleContentColumes3(this.params),
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
    this.roleService
      .getRoleContentColumes3(data)
      .subscribe((sucess: any) => {
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
      role_code: ["", Validators.required],
      role_name: ["", Validators.required],
      // org_code: ["AVISYS", Validators.required],
      // is_deleted: [false],
      // created_by: ["1"],
      // updated_by: ["1"],
    });
  }

  buttonEvent1(data: any, template2) {
    if (data.event == "add") {
      this.submitBtn = "submit";
      this.editConsumerAttribute(template2);
      this.changePageSortSearch(this.params);
    } else if (data.event == "edit") {
      this.roleService.getById(data.data.role_code).subscribe((res) => {
        this.editConsumerAttribute(template2);
        this.submitBtn = "Update";
        this.roleForm.patchValue(res);
        this.changePageSortSearch(this.params);
        this.res = res;
      });
    } else if (data.event == "delete") {
      this.roleService.softDelete(data.data.role_code).subscribe((sucess1)=>{
        console.log(sucess1,"deleted")
        this.changePageSortSearch(this.params);
       })
    }
  }

  submit() {
    this.roleService.create(this.roleForm.value).subscribe((res) => {
      this.res;
    });

  if (this.submitBtn != "submit") {
    this.update(this.roleForm.controls["role_code"].value);
    this.changePageSortSearch(this.params);
  } else {
    this.roleService.create(this.roleForm.value).subscribe((sucess) => {
      });
  }
}

update(id: number) {
  this.roleService.update(this.roleForm.value, id).subscribe((response) => {
    this.response;
  });

  }
}
