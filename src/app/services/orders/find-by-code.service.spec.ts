import { TestBed } from '@angular/core/testing';

import { FindByCodeService } from './find-by-code.service';

describe('FindByCodeService', () => {
  let service: FindByCodeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FindByCodeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
