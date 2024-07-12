import { TestBed } from '@angular/core/testing';

import { GetSlotsService } from './get-slots.service';

describe('GetSlotsService', () => {
  let service: GetSlotsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetSlotsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
