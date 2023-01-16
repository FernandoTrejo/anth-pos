import { TestBed } from '@angular/core/testing';

import { FindProductsService } from './find-products.service';

describe('FindProductsService', () => {
  let service: FindProductsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FindProductsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
