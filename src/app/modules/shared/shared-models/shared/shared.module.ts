
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { TranslateModule } from '@ngx-translate/core';
import { BsDatepickerModule, DatepickerModule } from 'ngx-bootstrap/datepicker';
import { ColumnComponent } from '../../component/data-table/column/column.component';
import { DatatableComponent } from '../../component/data-table/data-table/data-table.component';
import { AutoCompleteRefDirective } from '../../component/autocomplate/auto-complete-ref-directive.directive.spec';
import { HighlightPipe } from '../../component/autocomplate/highlight.pipe';
import { AutoCompleteComponent } from '../../component/autocomplate/auto-complete-component/auto-complete-component.component';
import { TimepickerModule } from 'ngx-bootstrap/timepicker';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
// import { DynamicRoleComponent } from 'src/app/modules/user-management/component/dynamic-role/dynamic-role.component';
import { SharedService } from '../../services/shared.service';
import { DataTableUiComponent } from '../../component/data-table-ui/data-table-ui.component';
import { OnlyNumbersDirective } from '../../component/directives/only-numbers.directive';
import { ProgressSpinnerComponent } from '../../component/progress-spinner/progress-spinner.component';
import { AlertComponent } from '../../component/alert/alert.component';
import { ProgressSpinnerService } from '../../services/progress-spinner.service';
import { DeletePopupService } from '../../services/delete-popup.service';

@NgModule({
	declarations: [
    AlertComponent,
		DatatableComponent,
		ColumnComponent,
		AutoCompleteRefDirective,
		AutoCompleteRefDirective,
		HighlightPipe,
		AutoCompleteComponent,
		// DynamicRoleComponent,
		DataTableUiComponent,
		OnlyNumbersDirective,
		ProgressSpinnerComponent
	],
	imports: [
		CommonModule,
		FormsModule,
		CollapseModule.forRoot(),
		ReactiveFormsModule,
		FormsModule,
		NgMultiSelectDropDownModule.forRoot(),
		RouterModule,
		TranslateModule,
		BsDatepickerModule.forRoot(),
		DatepickerModule.forRoot(),
		TimepickerModule.forRoot(),
		BsDropdownModule.forRoot(),

	],
	providers: [SharedService,ProgressSpinnerService,DeletePopupService],
	exports: [
    AlertComponent,
		TimepickerModule,
		BsDatepickerModule,
		DatepickerModule,
		DatatableComponent,
		ColumnComponent,
		RouterModule,
		// DynamicRoleComponent,
		TranslateModule,
		AutoCompleteRefDirective,
		AutoCompleteRefDirective,
		HighlightPipe,
		AutoCompleteComponent,
		DataTableUiComponent,
		TranslateModule,
		OnlyNumbersDirective,
		FormsModule,
		NgMultiSelectDropDownModule,
		BsDropdownModule,
		ProgressSpinnerComponent
	]
})
export class SharedModule { }
