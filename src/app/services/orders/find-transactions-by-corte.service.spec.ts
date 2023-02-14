import { TestBed } from '@angular/core/testing';

import { FindTransactionsByCorteService } from './find-transactions-by-corte.service';

describe('FindTransactionsByCorteService', () => {
  let service: FindTransactionsByCorteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FindTransactionsByCorteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
