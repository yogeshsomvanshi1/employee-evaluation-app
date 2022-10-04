import { SharedModule } from './../shared/shared-models/shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { LayoutCrmComponent } from './components/layout-main/layout-crm.component';
import { LeftmenuComponent } from './components/left-menu/leftmenu.component';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { CollapseModule } from 'ngx-bootstrap/collapse';

@NgModule({
  declarations: [ 
    FooterComponent,
    LayoutCrmComponent,
    HeaderComponent,
    LeftmenuComponent,
    FooterComponent],
  imports: [
    CommonModule,
    RouterModule,
    TranslateModule,
    SharedModule,
    BsDropdownModule.forRoot(),
    CollapseModule.forRoot(),
  ],
  exports:[  
    FooterComponent,
    LayoutCrmComponent,
    HeaderComponent,
    FooterComponent,
    LeftmenuComponent
  ]
})
export class CoreModule { }
