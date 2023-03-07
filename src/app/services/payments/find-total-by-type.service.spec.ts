import { TestBed } from '@angular/core/testing';

import { FindTotalByTypeService } from './find-total-by-type.service';

describe('FindTotalByTypeService', () => {
  let service: FindTotalByTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FindTotalByTypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
