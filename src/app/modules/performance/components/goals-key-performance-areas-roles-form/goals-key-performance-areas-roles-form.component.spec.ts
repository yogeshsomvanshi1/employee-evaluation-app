import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoalsKeyPerformanceAreasRolesFormComponent } from './goals-key-performance-areas-roles-form.component';

describe('GoalsKeyPerformanceAreasRolesFormComponent', () => {
  let component: GoalsKeyPerformanceAreasRolesFormComponent;
  let fixture: ComponentFixture<GoalsKeyPerformanceAreasRolesFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GoalsKeyPerformanceAreasRolesFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GoalsKeyPerformanceAreasRolesFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
