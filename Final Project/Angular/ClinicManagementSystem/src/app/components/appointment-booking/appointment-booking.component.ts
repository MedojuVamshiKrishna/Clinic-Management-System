import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ViewdoctorsService } from '../../services/viewdoctors.service';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';

@Component({
  selector: 'app-appointment-booking',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './appointment-booking.component.html',
  styleUrls: ['./appointment-booking.component.css']
})
export class AppointmentBookingComponent {
  patient: any | null = null;
  age: any;
  doctors: any;

  appointmentForm: FormGroup;
  nulled = false;

  constructor(
    private route: ActivatedRoute,
    private viewdoctor: ViewdoctorsService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.appointmentForm = this.fb.group({
      weight: ['', Validators.required],
      bp: ['', [Validators.required, Validators.min(60), Validators.max(185)]],
      spo2: ['', [Validators.required, Validators.min(85), Validators.max(100)]],
      temperature: ['', [Validators.required, Validators.min(94.0), Validators.max(110.0)]],
      symptoms: ['', Validators.required],
      doctor: ['', Validators.required]
    });

    this.viewdoctor.viewDoctors().subscribe(
      (resp: any) => {
        console.log(resp);
        this.doctors = resp;
      },
      err => {
        console.log(err);
      }
    );
  }

  calculateAge(dateOfBirth: Date): number {
    const today = new Date();
    const birthYear = dateOfBirth.getFullYear();
    const birthMonth = dateOfBirth.getMonth();
    const birthDay = dateOfBirth.getDate();

    const currentYear = today.getFullYear();
    const currentMonth = today.getMonth();
    const currentDay = today.getDate();

    let age = currentYear - birthYear;

    // Adjust age if birthday hasn't passed yet this year
    if (currentMonth < birthMonth || (currentMonth === birthMonth && currentDay < birthDay)) {
      age--;
    }

    return age;
  }

  selectedDoctor: any = null;
  selectedDoctorEmail: any;
  selectedDoctorName: any;

  onDoctorChange(selectedDoctor: any): void {
    this.selectedDoctorEmail = selectedDoctor ? selectedDoctor.email : null;
    this.selectedDoctorName = selectedDoctor ? selectedDoctor.name + '-' + selectedDoctor.specialisation : null;
    console.log('Selected Doctor Email:', this.selectedDoctorEmail);
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const patientJson = params['patient'];
      if (patientJson) {
        this.patient = JSON.parse(patientJson);
        const dob = new Date(this.patient.dob);
        this.age = this.calculateAge(dob);
        console.log(this.age);
        console.log("heroooo", this.patient);
      }
    });
  }

  onSubmit() {
    if (this.appointmentForm.valid) {
      const formData2 = {
        ...this.patient,
        age: this.age,
        ...this.appointmentForm.value,
        doctor: this.selectedDoctorName,
        doctorId: this.selectedDoctorEmail
      };

      console.log(formData2);
      if (this.router) { // Check if router is defined
        this.router.navigate(['/bookslot'], { queryParams: { formData2: JSON.stringify(formData2) } });
      } else {
        console.error('Router service is not injected!');
      }
    } else {
      this.nulled = true;
      console.log('Form is invalid');
    }
  }

  get weight() { return this.appointmentForm.get('weight'); }
  get bp() { return this.appointmentForm.get('bp'); }
  get spo2() { return this.appointmentForm.get('spo2'); }
  get temperature() { return this.appointmentForm.get('temperature'); }
  get symptoms() { return this.appointmentForm.get('symptoms'); }
  get doctor() { return this.appointmentForm.get('doctor'); }
}
