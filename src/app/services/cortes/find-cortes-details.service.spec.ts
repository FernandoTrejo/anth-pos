import { TestBed } from '@angular/core/testing';

import { FindCortesDetailsService } from './find-cortes-details.service';

describe('FindCortesDetailsService', () => {
  let service: FindCortesDetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FindCortesDetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
