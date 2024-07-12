import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ViewpatientsService } from '../../services/viewpatients.service';
import { CreatepatientService } from '../../services/createpatient.service';

@Component({
  selector: 'app-patientregister',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './patientregister.component.html',
  styleUrl: './patientregister.component.css'
})
export class PatientregisterComponent {

  patient={
    name:'',
    dob:'',
    gender:'',
    phone:''
  }
  exists=false
  create =false

  constructor(private patientservice : ViewpatientsService, private createPatient: CreatepatientService){

  }


  onSubmit(){

    if ((this.patient.name!='' && this.patient.dob!='' && this.patient.gender!='' && this.patient.phone!='') &&(this.patient.name!=null && this.patient.dob!=null && this.patient.gender!=null && this.patient.phone!=null)) {

      console.log('can be submitted', this.patient)

      this.patientservice.getPatientByPhone(this.patient.phone).subscribe(
        (resp:any)=>{
          if (resp===null) {
            console.log('can be proceeded')

            this.createPatient.createPatient(this.patient).subscribe(
              (resp:any)=>{
                console.log(this.patient,'inserted to database')
              },err=>{
                console.log(err)
              }
            )
            this.create=true
            
          }else{
            this.exists=true
            console.log('allready exists')
          }

        }
      )
      
    }
    else{
      console.log('null values')
    }
  }




}
