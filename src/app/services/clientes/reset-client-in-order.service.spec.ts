import { TestBed } from '@angular/core/testing';

import { ResetClientInOrderService } from './reset-client-in-order.service';

describe('ResetClientInOrderService', () => {
  let service: ResetClientInOrderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ResetClientInOrderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
