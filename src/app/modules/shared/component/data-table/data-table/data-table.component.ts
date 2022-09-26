import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import Swal from 'sweetalert2';
import { SelectRecord } from '../../sweetalert/sweetalert';
import { ColumnComponent } from '../column/column.component';

@Component({
  selector: 'app-datatable',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss'],
  providers: []
})

export class DatatableComponent implements OnInit {
  @Input() dataset: any = {};
  @Input() permission: any;
  @Input() checkedArray = [];
  @Output() changePageSortSearch = new EventEmitter<any>();
  @Output() buttonEvent1 = new EventEmitter<any>();

  columns: ColumnComponent[] = [];
  pageSize: number = 5;
  content: any = [];
  pageno: number = 0;
  result: number = 0;
  selectedData: any = null;
  serchingParmeter: string | undefined;
  sortKey: string = "";
  sortType: String = 'ASC';
  pageList = [];

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    // this.sortKey = this.dataset.sortObjects?.key;
    this.selectedData = null;
    // this.sortType = this.dataset.sortObjects?.value;
    this.content = this.dataset.content;
    let pageListTemp = [];
    for (let i = 0; i < this.dataset.totalPages; i++) {
      pageListTemp.push(i);
    }
    this.pageList = pageListTemp;
  }

  ngOnInit() { }


  addColumn(column: ColumnComponent) {
    this.columns.push(column);
  }
  confirmDelete() {
    let data = {
      event: 'delete',
      data: this.selectedData
    }
    this.buttonEvent1.emit(data);
    let deletemodal = document.getElementById('openModalforDelete');
    deletemodal.style.display = 'none';

  }

  chnagePageNo(event: any) {
    this.pageno = event;
    this.createUrl();

  }

  sorting(column: any) {
    if (this.sortKey == column) {
      this.sortType = this.sortType == "ASC" ? 'DESC' : 'ASC';
    } else {
      this.sortKey = column;
      this.sortType = 'ASC';
    }
    this.pageno = 0;
    this.createUrl();
  }

  changeFn(newValue: any) {
    this.pageno = 0;
    this.createUrl();
  }
  pageChane() {
    this.pageno = 0;
    this.createUrl();
  }

  createUrl() {
    let url = "page=" + this.pageno + "&size=" + this.pageSize;
    if (this.serchingParmeter != "" && this.serchingParmeter != undefined && this.serchingParmeter != null) {
      url = url + "&name=" + this.serchingParmeter;
    }
    if (this.sortKey != "" && this.sortKey != null && this.sortKey != undefined) {
      url = url + "&sort=" + this.sortKey + "," + this.sortType;
    }
    this.changePageSortSearch.emit(url);
  }


  buttonEvent(event: string) {
    let data = {
      event: event,
      data: event == 'add' ? null : this.selectedData
    }

    if (event == 'edit' || event == 'delete') {
      if (this.selectedData != "" && this.selectedData != undefined && this.selectedData != null && this.selectedData != {}) {
        if (event == 'delete') {
          this.DeleteRecord();
        }
        else {
          this.buttonEvent1.emit(data);
        }
        return;
      } else {
        SelectRecord();
        return
      }
    }
    this.buttonEvent1.emit(data);

  }

  btnEventInside(value: any, btnvalue) {
    let data = {
      event: 'inSidebtn',
      data: value,
      btnEvent: btnvalue
    }
    this.buttonEvent1.emit(data);
  }
  radioButton(value: any) {
    this.selectedData = value;
  }

  DeleteRecord() {
    let data = {
      event: 'delete',
      data: this.selectedData
    }
    Swal.fire({
      title: 'Are you sure?',
      text: 'You want to delete the data',
      icon: 'warning',
      showCancelButton: true,
      cancelButtonText: 'Cancel',
      confirmButtonColor: "rgb(220, 53, 69)",
      confirmButtonText: 'Yes  ',
      showClass: {
        backdrop: 'swal2-noanimation', // disable backdrop animation
        popup: '',                     // disable popup animation
        icon: ''                       // disable icon animation
      },
      hideClass: {
        popup: '',                     // disable popup fade-out animation
      },
    }).then((result) => {
      if (result.value) {

        this.buttonEvent1.emit(data);
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(

          {
            title: 'Cancelled',
            text: 'Your data is safe',
            confirmButtonText: 'OK',
            icon: 'success',

            showClass: {
              backdrop: 'swal2-noanimation', // disable backdrop animation
              popup: '',                     // disable popup animation
              icon: ''                       // disable icon animation
            },
            hideClass: {
              popup: '',                     // disable popup fade-out animation
            },
          }
        )
      }
    })
  }


}
