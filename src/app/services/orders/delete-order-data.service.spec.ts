import { TestBed } from '@angular/core/testing';

import { DeleteOrderDataService } from './delete-order-data.service';

describe('DeleteOrderDataService', () => {
  let service: DeleteOrderDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeleteOrderDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
