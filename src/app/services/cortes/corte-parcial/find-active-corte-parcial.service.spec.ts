import { TestBed } from '@angular/core/testing';

import { FindActiveCorteParcialService } from './find-active-corte-parcial.service';

describe('FindActiveCorteParcialService', () => {
  let service: FindActiveCorteParcialService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FindActiveCorteParcialService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
