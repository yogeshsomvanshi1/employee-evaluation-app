import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerformanceReviewCycleScheduleComponent } from './performance-review-cycle-schedule.component';

describe('PerformanceReviewCycleScheduleComponent', () => {
  let component: PerformanceReviewCycleScheduleComponent;
  let fixture: ComponentFixture<PerformanceReviewCycleScheduleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PerformanceReviewCycleScheduleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PerformanceReviewCycleScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
