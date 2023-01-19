import { TestBed } from '@angular/core/testing';

import { FindPaymentsService } from './find-payments.service';

describe('FindPaymentsService', () => {
  let service: FindPaymentsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FindPaymentsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
