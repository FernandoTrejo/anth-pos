import { TestBed } from '@angular/core/testing';

import { CalculateTotalReceivedService } from './calculate-total-received.service';

describe('CalculateTotalReceivedService', () => {
  let service: CalculateTotalReceivedService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CalculateTotalReceivedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
