import { TestBed } from '@angular/core/testing';

import { FindActiveCorteMensualService } from './find-active-corte-mensual.service';

describe('FindActiveCorteMensualService', () => {
  let service: FindActiveCorteMensualService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FindActiveCorteMensualService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
