import { TestBed } from '@angular/core/testing';

import { SetavailabilityService } from './setavailability.service';

describe('SetavailabilityService', () => {
  let service: SetavailabilityService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SetavailabilityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
