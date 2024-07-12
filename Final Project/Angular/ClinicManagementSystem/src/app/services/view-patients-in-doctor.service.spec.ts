import { TestBed } from '@angular/core/testing';

import { ViewPatientsInDoctorService } from './view-patients-in-doctor.service';

describe('ViewPatientsInDoctorService', () => {
  let service: ViewPatientsInDoctorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ViewPatientsInDoctorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
