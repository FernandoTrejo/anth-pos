import { TestBed } from '@angular/core/testing';

import { FindCortesRegistradosService } from './find-cortes-registrados.service';

describe('FindCortesRegistradosService', () => {
  let service: FindCortesRegistradosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FindCortesRegistradosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
