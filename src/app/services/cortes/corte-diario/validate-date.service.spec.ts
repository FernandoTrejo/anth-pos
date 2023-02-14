import { TestBed } from '@angular/core/testing';

import { ValidateDateService } from './validate-date.service';

describe('ValidateDateService', () => {
  let service: ValidateDateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ValidateDateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
