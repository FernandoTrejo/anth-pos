import { TestBed } from '@angular/core/testing';

import { CloseCorteDiarioService } from './close-corte-diario.service';

describe('CloseCorteDiarioService', () => {
  let service: CloseCorteDiarioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CloseCorteDiarioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
