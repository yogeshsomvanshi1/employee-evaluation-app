import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { DatatableComponent } from '../data-table/data-table.component';
import { DataTableModel } from '../datatableModel';

import { ColumnComponent } from './column.component';

describe('ColumnComponent', () => {
  let component: ColumnComponent;
  let fixture: ComponentFixture<ColumnComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ColumnComponent ],
      providers:[DatatableComponent,DataTableModel]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ColumnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
