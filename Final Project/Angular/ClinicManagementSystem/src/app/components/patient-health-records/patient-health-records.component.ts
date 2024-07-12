import { CommonModule, DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PatientbookingService } from '../../services/patientbooking.service';

@Component({
  selector: 'app-patient-health-records',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './patient-health-records.component.html',
  styleUrl: './patient-health-records.component.css'
})
export class PatientHealthRecordsComponent {


  patient:any
  currentDate: any;
  formattedDate: any;

 


  constructor(private patientBookingService: PatientbookingService){

    this.patientBookingService.getAllBooking().subscribe(
      (resp:any)=>{
        this.patient=resp
        console.log(this.patient)
      },err=>{
        console.log(err)
      }
    )

  }
  ngOnInit(): void {
    // Get the current date
    this.currentDate = new Date();
    this.formattedDate = this.currentDate.toISOString().split('T')[0];

    console.log(this.formattedDate)

    
    

    // Format the date using Angular's DatePipe
    
  }

}
