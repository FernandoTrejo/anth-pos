import { TestBed } from '@angular/core/testing';

import { CalculateActualStockBasedOnProductOrdersService } from './calculate-actual-stock-based-on-product-orders.service';

describe('CalculateActualStockBasedOnProductOrdersService', () => {
  let service: CalculateActualStockBasedOnProductOrdersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CalculateActualStockBasedOnProductOrdersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
