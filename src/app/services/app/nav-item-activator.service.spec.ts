import { TestBed } from '@angular/core/testing';

import { NavItemActivatorService } from './nav-item-activator.service';

describe('NavItemActivatorService', () => {
  let service: NavItemActivatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NavItemActivatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
