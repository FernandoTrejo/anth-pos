import { TestBed } from '@angular/core/testing';

import { ChangeQuantityService } from './change-quantity.service';

describe('ChangeQuantityService', () => {
  let service: ChangeQuantityService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChangeQuantityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
