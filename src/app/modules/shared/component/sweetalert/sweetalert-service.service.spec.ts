import { TestBed } from '@angular/core/testing';
import { Router, RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { SweetalertServiceService } from './sweetalert-service.service';

describe('SweetalertServiceService', () => {
  let service: SweetalertServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[RouterTestingModule]
    });
    service = TestBed.inject(SweetalertServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
