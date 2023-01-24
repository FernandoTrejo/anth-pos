import { TestBed } from '@angular/core/testing';

import { OpenCorteParcialService } from './open-corte-parcial.service';

describe('OpenCorteParcialService', () => {
  let service: OpenCorteParcialService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OpenCorteParcialService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
