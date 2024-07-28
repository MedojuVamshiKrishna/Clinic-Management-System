import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ViewpatientsService } from '../../services/viewpatients.service';
import { CreatepatientService } from '../../services/createpatient.service';

@Component({
  selector: 'app-patientregister',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './patientregister.component.html',
  styleUrls: ['./patientregister.component.css']
})
export class PatientregisterComponent {

  patientForm: FormGroup;
  exists = false;
  create = false;

  constructor(
    private fb: FormBuilder,
    private patientservice: ViewpatientsService,
    private createPatient: CreatepatientService
  ) {
    this.patientForm = this.fb.group({
      name: ['', Validators.required],
      dob: ['', Validators.required],
      gender: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]]
    });
  }

  onSubmit() {
    if (this.patientForm.valid) {
      const patientData = this.patientForm.value;
      console.log('Form is valid, submitting data:', patientData);

      this.patientservice.getPatientByPhone(patientData.phone).subscribe(
        (resp: any) => {
          if (resp === null) {
            console.log('Patient does not exist, proceeding to create');

            this.createPatient.createPatient(patientData).subscribe(
              (resp: any) => {
                console.log('Patient inserted into database:', patientData);
                this.create = true;
              }, err => {
                console.log('Error inserting patient:', err);
              }
            );
          } else {
            this.exists = true;
            console.log('Patient already exists');
          }
        },
        err => {
          console.log('Error fetching patient by phone:', err);
        }
      );
    } else {
      console.log('Form is invalid');
    }
  }

  get name() { return this.patientForm.get('name'); }
  get dob() { return this.patientForm.get('dob'); }
  get gender() { return this.patientForm.get('gender'); }
  get phone() { return this.patientForm.get('phone'); }
}
