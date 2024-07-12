import { TestBed } from '@angular/core/testing';

import { UpdatePatientBookingService } from './update-patient-booking.service';

describe('UpdatePatientBookingService', () => {
  let service: UpdatePatientBookingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UpdatePatientBookingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
