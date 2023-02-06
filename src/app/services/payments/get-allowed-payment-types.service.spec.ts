import { TestBed } from '@angular/core/testing';

import { GetAllowedPaymentTypesService } from './get-allowed-payment-types.service';

describe('GetAllowedPaymentTypesService', () => {
  let service: GetAllowedPaymentTypesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetAllowedPaymentTypesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
