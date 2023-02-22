import { TestBed } from '@angular/core/testing';

import { FindAttachedClientToStoreService } from './find-attached-client-to-store.service';

describe('FindAttachedClientToStoreService', () => {
  let service: FindAttachedClientToStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FindAttachedClientToStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
