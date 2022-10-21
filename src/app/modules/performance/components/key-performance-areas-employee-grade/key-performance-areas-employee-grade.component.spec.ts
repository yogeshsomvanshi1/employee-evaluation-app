import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KeyPerformanceAreasEmployeeGradeComponent } from './key-performance-areas-employee-grade.component';

describe('KeyPerformanceAreasEmployeeGradeComponent', () => {
  let component: KeyPerformanceAreasEmployeeGradeComponent;
  let fixture: ComponentFixture<KeyPerformanceAreasEmployeeGradeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KeyPerformanceAreasEmployeeGradeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KeyPerformanceAreasEmployeeGradeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
