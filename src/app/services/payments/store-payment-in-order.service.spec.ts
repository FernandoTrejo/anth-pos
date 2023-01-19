import { TestBed } from '@angular/core/testing';

import { StorePaymentInOrderService } from './store-payment-in-order.service';

describe('StorePaymentInOrderService', () => {
  let service: StorePaymentInOrderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StorePaymentInOrderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
