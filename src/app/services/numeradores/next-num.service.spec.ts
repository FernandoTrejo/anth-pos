import { TestBed } from '@angular/core/testing';

import { NextNumService } from './next-num.service';

describe('NextNumService', () => {
  let service: NextNumService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NextNumService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
