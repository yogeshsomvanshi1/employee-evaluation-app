import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApparaisalDetailsComponent } from './apparaisal-details.component';

describe('ApparaisalDetailsComponent', () => {
  let component: ApparaisalDetailsComponent;
  let fixture: ComponentFixture<ApparaisalDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApparaisalDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApparaisalDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
