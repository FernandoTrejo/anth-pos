import { TestBed } from '@angular/core/testing';

import { CloseCorteParcialService } from './close-corte-parcial.service';

describe('CloseCorteParcialService', () => {
  let service: CloseCorteParcialService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CloseCorteParcialService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
