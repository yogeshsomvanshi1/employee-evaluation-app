import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KeyPerformanceListComponent } from './key-performance-list.component';

describe('KeyPerformanceListComponent', () => {
  let component: KeyPerformanceListComponent;
  let fixture: ComponentFixture<KeyPerformanceListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KeyPerformanceListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KeyPerformanceListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
