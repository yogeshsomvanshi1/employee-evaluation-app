import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoalsKeyPerformanceAreasRoleComponent } from './goals-key-performance-areas-role.component';

describe('GoalsKeyPerformanceAreasRoleComponent', () => {
  let component: GoalsKeyPerformanceAreasRoleComponent;
  let fixture: ComponentFixture<GoalsKeyPerformanceAreasRoleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GoalsKeyPerformanceAreasRoleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GoalsKeyPerformanceAreasRoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
