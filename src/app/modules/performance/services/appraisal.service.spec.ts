import { TestBed } from '@angular/core/testing';

import { AppraisalService } from './appraisal.service';

describe('AppraisalService', () => {
  let service: AppraisalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AppraisalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
