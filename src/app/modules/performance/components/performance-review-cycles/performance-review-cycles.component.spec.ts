import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerformanceReviewCyclesComponent } from './performance-review-cycles.component';

describe('PerformanceReviewCyclesComponent', () => {
  let component: PerformanceReviewCyclesComponent;
  let fixture: ComponentFixture<PerformanceReviewCyclesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PerformanceReviewCyclesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PerformanceReviewCyclesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
