import { TestBed } from '@angular/core/testing';

import { GetdoctorbyemailService } from './getdoctorbyemail.service';

describe('GetdoctorbyemailService', () => {
  let service: GetdoctorbyemailService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetdoctorbyemailService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
