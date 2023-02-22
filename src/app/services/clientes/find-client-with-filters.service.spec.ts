import { TestBed } from '@angular/core/testing';

import { FindClientWithFiltersService } from './find-client-with-filters.service';

describe('FindClientWithFiltersService', () => {
  let service: FindClientWithFiltersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FindClientWithFiltersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
