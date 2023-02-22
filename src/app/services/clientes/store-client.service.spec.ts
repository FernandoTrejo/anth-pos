import { TestBed } from '@angular/core/testing';

import { StoreClientService } from './store-client.service';

describe('StoreClientService', () => {
  let service: StoreClientService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StoreClientService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
