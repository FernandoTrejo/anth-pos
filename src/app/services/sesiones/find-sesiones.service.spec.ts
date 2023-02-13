import { TestBed } from '@angular/core/testing';

import { FindSesionesService } from './find-sesiones.service';

describe('FindSesionesService', () => {
  let service: FindSesionesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FindSesionesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
