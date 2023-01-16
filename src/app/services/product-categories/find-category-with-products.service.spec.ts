import { TestBed } from '@angular/core/testing';

import { FindCategoryWithProductsService } from './find-category-with-products.service';

describe('FindCategoryWithProductsService', () => {
  let service: FindCategoryWithProductsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FindCategoryWithProductsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
