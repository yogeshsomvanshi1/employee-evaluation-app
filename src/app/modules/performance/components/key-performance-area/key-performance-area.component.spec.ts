import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KeyPerformanceAreaComponent } from './key-performance-area.component';

describe('KeyPerformanceAreaComponent', () => {
  let component: KeyPerformanceAreaComponent;
  let fixture: ComponentFixture<KeyPerformanceAreaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KeyPerformanceAreaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KeyPerformanceAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
