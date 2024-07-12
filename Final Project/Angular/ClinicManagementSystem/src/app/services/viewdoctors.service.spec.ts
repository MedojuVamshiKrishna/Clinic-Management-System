import { TestBed } from '@angular/core/testing';

import { ViewdoctorsService } from './viewdoctors.service';

describe('ViewdoctorsService', () => {
  let service: ViewdoctorsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ViewdoctorsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
