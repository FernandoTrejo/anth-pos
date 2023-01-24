import { TestBed } from '@angular/core/testing';

import { FindOrdersCorteActualService } from './find-orders-corte-actual.service';

describe('FindOrdersCorteActualService', () => {
  let service: FindOrdersCorteActualService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FindOrdersCorteActualService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
