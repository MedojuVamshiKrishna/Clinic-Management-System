import { TestBed } from '@angular/core/testing';

import { ViewpatientsService } from './viewpatients.service';

describe('ViewpatientsService', () => {
  let service: ViewpatientsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ViewpatientsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
