import { TestBed } from '@angular/core/testing';

import { GetavailabilitiesService } from './getavailabilities.service';

describe('GetavailabilitiesService', () => {
  let service: GetavailabilitiesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetavailabilitiesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
