import { TestBed } from '@angular/core/testing';

import { RegistrarPagoCortesService } from './registrar-pago-cortes.service';

describe('RegistrarPagoCortesService', () => {
  let service: RegistrarPagoCortesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RegistrarPagoCortesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
