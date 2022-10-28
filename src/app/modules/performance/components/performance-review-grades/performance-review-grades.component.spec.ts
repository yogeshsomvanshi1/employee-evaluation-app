import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerformanceReviewGradesComponent } from './performance-review-grades.component';

describe('PerformanceReviewGradesComponent', () => {
  let component: PerformanceReviewGradesComponent;
  let fixture: ComponentFixture<PerformanceReviewGradesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PerformanceReviewGradesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PerformanceReviewGradesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
