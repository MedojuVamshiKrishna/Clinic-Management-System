import { CommonModule, DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PatientbookingService } from '../../services/patientbooking.service';
import { DeletePatientRecordService } from '../../services/delete-patient-record.service';

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

 


  constructor(private patientBookingService: PatientbookingService, private deleterecord: DeletePatientRecordService){

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
  }
  deleteRecord(itemid:any){
    console.log(itemid)

    this.deleterecord.deleteRecord(itemid).subscribe(
      (resp:any)=>{
        console.log(resp)
        
      },err=>{
        console.log(err)
      }
    )

    location.reload();

  }

}
