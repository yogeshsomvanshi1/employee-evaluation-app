import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerformanceReviewTypeComponent } from './performance-review-type.component';

describe('PerformanceReviewTypeComponent', () => {
  let component: PerformanceReviewTypeComponent;
  let fixture: ComponentFixture<PerformanceReviewTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PerformanceReviewTypeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PerformanceReviewTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
