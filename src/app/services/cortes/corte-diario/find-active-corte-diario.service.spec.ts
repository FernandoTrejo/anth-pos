import { TestBed } from '@angular/core/testing';

import { FindActiveCorteDiarioService } from './find-active-corte-diario.service';

describe('FindActiveCorteDiarioService', () => {
  let service: FindActiveCorteDiarioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FindActiveCorteDiarioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
