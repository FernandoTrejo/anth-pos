import { TestBed } from '@angular/core/testing';

import { CalculateTotalByTransactionTypeService } from './calculate-total-by-transaction-type.service';

describe('CalculateTotalByTransactionTypeService', () => {
  let service: CalculateTotalByTransactionTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CalculateTotalByTransactionTypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
