import { Component } from '@angular/core';
import { LoginServiceService } from '../../services/login-service.service';
import { ViewPatientsInDoctorService } from '../../services/view-patients-in-doctor.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UpdatePatientBookingService } from '../../services/update-patient-booking.service';

@Component({
  selector: 'app-view-applied-patients',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './view-applied-patients.component.html',
  styleUrl: './view-applied-patients.component.css'
})
export class ViewAppliedPatientsComponent {

  user:any

  currentDate:any
  formattedDate:any
  patients:any

  constructor(private loginservice : LoginServiceService, private viewpatients : ViewPatientsInDoctorService, private updateBooking: UpdatePatientBookingService){
      if (this.loginservice.isLoggedIn()) {

        this.user=this.loginservice.getUser()
        
      }

      console.log(this.user)
      this.viewpatients.viewAllPatients(this.user).subscribe(
        (resp:any)=>{
          this.patients=resp
          console.log(this.patients)
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
  updateappointment(booking:any){

   booking.appointed=true

   this.updateBooking.updateBooking(booking).subscribe(
    (resp:any)=>{
      console.log('value updated permanently',resp)
    },err=>{
      console.log(err)
    }
   )

  }

}
