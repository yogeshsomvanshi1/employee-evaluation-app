import { HttpParams } from '@angular/common/http';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { TableHeaderMetaData } from 'src/app/modules/shared/model/table-header-list.model';
import { KeyPerformanceList } from '../../../model/key-performance-areas.model';

@Component({
  selector: 'app-professional-info',
  templateUrl: './professional-info.component.html',
  styleUrls: ['./professional-info.component.scss']
})
export class ProfessionalInfoComponent implements OnInit {

  @ViewChild('educationModal') educationModal!: TemplateRef<any>;
 @ViewChild('workExperience') workExperience!: TemplateRef<any>;
 
  currentPage:number = 0;
  columnsMetadata: TableHeaderMetaData;
  permission: Array<boolean> = [true, true, true];
  modalRef!: BsModalRef;
  dataDataTable: { results: Array<KeyPerformanceList>, count: number } = { results: [], count: 0 };
  
  constructor(
    private modalService: BsModalService,
    ) { }
  
    ngOnInit(): void {
    }
  
    changePageSortSearch(data: HttpParams) {
      let offset = data.get('offset')
      let limit =data.get('limit')
      this.currentPage =Number (offset) / Number (limit)
      // this.keyPerformanceService.getKeyPerformanceListContent(data).subscribe((sucess: { results: Array<KeyPerformanceList>, count: number }) => {
      // this.dataDataTable = sucess;
      // });
    }
  
    openEducationModal(){
      this.modalRef = this.modalService.show(this.educationModal,{ class: "gray modal-lg " });
    }
  
    openWorkExperienceModal(){
      this.modalRef = this.modalService.show(this.workExperience,{ class: "gray modal-lg " });
    }
    buttonEvent1(data: any) {
      if (data.event == "add") {
      
      
      }
      else if (data.event == "edit") {
  
      
        
      }
      else if (data.event == "delete") {
      
      }
    }

}
