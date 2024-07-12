import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetDoctorAvailabilityComponent } from './set-doctor-availability.component';

describe('SetDoctorAvailabilityComponent', () => {
  let component: SetDoctorAvailabilityComponent;
  let fixture: ComponentFixture<SetDoctorAvailabilityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SetDoctorAvailabilityComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SetDoctorAvailabilityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
