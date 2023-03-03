import { TestBed } from '@angular/core/testing';

import { FindNumeradoresService } from './find-numeradores.service';

describe('FindNumeradoresService', () => {
  let service: FindNumeradoresService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FindNumeradoresService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
