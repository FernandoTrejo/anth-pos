import { TestBed } from '@angular/core/testing';

import { FindDevolucionesCorteXService } from './find-devoluciones-corte-x.service';

describe('FindDevolucionesCorteXService', () => {
  let service: FindDevolucionesCorteXService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FindDevolucionesCorteXService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
