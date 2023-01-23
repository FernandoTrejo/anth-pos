import { TestBed } from '@angular/core/testing';

import { CalculateRemainingService } from './calculate-remaining.service';

describe('CalculateRemainingService', () => {
  let service: CalculateRemainingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CalculateRemainingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
