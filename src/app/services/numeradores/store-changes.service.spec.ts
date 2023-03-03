import { TestBed } from '@angular/core/testing';

import { StoreChangesService } from './store-changes.service';

describe('StoreChangesService', () => {
  let service: StoreChangesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StoreChangesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
