import { TestBed } from '@angular/core/testing';

import { DeletePatientRecordService } from './delete-patient-record.service';

describe('DeletePatientRecordService', () => {
  let service: DeletePatientRecordService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeletePatientRecordService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
