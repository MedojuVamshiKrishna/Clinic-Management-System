import { TestBed } from '@angular/core/testing';

import { CreatepatientService } from './createpatient.service';

describe('CreatepatientService', () => {
  let service: CreatepatientService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreatepatientService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
