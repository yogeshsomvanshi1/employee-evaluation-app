import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerformanceReviewPhasesComponent } from './performance-review-phases.component';

describe('PerformanceReviewPhasesComponent', () => {
  let component: PerformanceReviewPhasesComponent;
  let fixture: ComponentFixture<PerformanceReviewPhasesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PerformanceReviewPhasesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PerformanceReviewPhasesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
