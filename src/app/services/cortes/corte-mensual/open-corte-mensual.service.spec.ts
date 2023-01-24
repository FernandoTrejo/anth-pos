import { TestBed } from '@angular/core/testing';

import { OpenCorteMensualService } from './open-corte-mensual.service';

describe('OpenCorteMensualService', () => {
  let service: OpenCorteMensualService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OpenCorteMensualService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
