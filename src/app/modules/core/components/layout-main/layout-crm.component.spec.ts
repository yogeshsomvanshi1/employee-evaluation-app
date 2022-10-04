import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { LayoutCrmComponent } from './layout-crm.component';

describe('LayoutCrmComponent', () => {
  let component: LayoutCrmComponent;
  let fixture: ComponentFixture<LayoutCrmComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ LayoutCrmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LayoutCrmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
