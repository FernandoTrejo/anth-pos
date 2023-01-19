import { TestBed } from '@angular/core/testing';

import { DeletePaymentsService } from './delete-payments.service';

describe('DeletePaymentsService', () => {
  let service: DeletePaymentsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeletePaymentsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
