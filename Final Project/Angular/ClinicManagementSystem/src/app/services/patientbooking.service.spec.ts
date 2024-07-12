import { TestBed } from '@angular/core/testing';

import { PatientbookingService } from './patientbooking.service';

describe('PatientbookingService', () => {
  let service: PatientbookingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PatientbookingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
