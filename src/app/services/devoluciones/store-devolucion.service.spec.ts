import { TestBed } from '@angular/core/testing';

import { StoreDevolucionService } from './store-devolucion.service';

describe('StoreDevolucionService', () => {
  let service: StoreDevolucionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StoreDevolucionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
