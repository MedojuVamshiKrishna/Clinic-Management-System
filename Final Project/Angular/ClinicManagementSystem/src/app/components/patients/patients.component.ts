import { Component } from '@angular/core';
import { ViewpatientsService } from '../../services/viewpatients.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-patients',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './patients.component.html',
  styleUrl: './patients.component.css'
})
export class PatientsComponent {
  patients:any
  nulled=false
  patient:any
  searched=false;
  phone=''
 
  constructor(private viewpatients: ViewpatientsService,private router: Router){
    this.viewpatients.getUsers().subscribe(
      (resp:any)=>{
        console.log(resp)
        this.patients=resp
      },err=>{
        console.log(err)
      }
    )
  }
  searchPatient(){

    this.viewpatients.getPatientByPhone(this.phone).subscribe(
      (resp:any)=>{
        this.searched=true
        if(resp!=null){
        this.patient=resp
        }
        if(resp==='' || resp===null){
          console.log('no values')
          this.nulled=true
        }
      },err=>{
        console.log(err)
      }
    )

  }

  onBookNow(patient: any) {
    if (this.router) { // Check if router is defined
      this.router.navigate(['/book'], { queryParams: { patient: JSON.stringify(patient) } });
    } else {
      console.error('Router service is not injected!');
    }
  }
}
