import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddressContactDetailsComponent } from './address-contact-details.component';

describe('AddressContactDetailsComponent', () => {
  let component: AddressContactDetailsComponent;
  let fixture: ComponentFixture<AddressContactDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddressContactDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddressContactDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
