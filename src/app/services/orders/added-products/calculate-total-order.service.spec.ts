import { TestBed } from '@angular/core/testing';

import { CalculateTotalOrderService } from './calculate-total-order.service';

describe('CalculateTotalOrderService', () => {
  let service: CalculateTotalOrderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CalculateTotalOrderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
