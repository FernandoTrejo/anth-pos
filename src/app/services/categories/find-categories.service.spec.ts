import { TestBed } from '@angular/core/testing';

import { FindCategoriesService } from './find-categories.service';

describe('FindCategoriesService', () => {
  let service: FindCategoriesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FindCategoriesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
