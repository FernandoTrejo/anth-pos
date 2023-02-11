import { TestBed } from '@angular/core/testing';

import { CorteActivateGuardService } from './corte-activate-guard.service';

describe('CorteActivateGuardService', () => {
  let service: CorteActivateGuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CorteActivateGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
