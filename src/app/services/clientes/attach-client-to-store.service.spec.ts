import { TestBed } from '@angular/core/testing';

import { AttachClientToStoreService } from './attach-client-to-store.service';

describe('AttachClientToStoreService', () => {
  let service: AttachClientToStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AttachClientToStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
