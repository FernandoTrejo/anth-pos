import { TestBed } from '@angular/core/testing';

import { FindWithFiltersService } from './find-with-filters.service';

describe('FindWithFiltersService', () => {
  let service: FindWithFiltersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FindWithFiltersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
