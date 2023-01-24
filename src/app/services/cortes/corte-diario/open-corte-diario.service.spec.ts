import { TestBed } from '@angular/core/testing';

import { OpenCorteDiarioService } from './open-corte-diario.service';

describe('OpenCorteDiarioService', () => {
  let service: OpenCorteDiarioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OpenCorteDiarioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
