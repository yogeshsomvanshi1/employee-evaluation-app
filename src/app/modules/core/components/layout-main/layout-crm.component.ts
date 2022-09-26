import { AfterViewInit, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-layout-crm',
  templateUrl: './layout-crm.component.html',
  styleUrls: ['./layout-crm.component.scss']
})
export class LayoutCrmComponent implements OnInit,AfterViewInit {

  isLoading:boolean;
  constructor() { 
    
  }

  ngOnInit(): void {  }

  ngAfterViewInit(): void {
    var data=document.getElementById('page_top')
    if(data!=null){
      data.classList?.add('top_dark')
    }
   
  }

}
