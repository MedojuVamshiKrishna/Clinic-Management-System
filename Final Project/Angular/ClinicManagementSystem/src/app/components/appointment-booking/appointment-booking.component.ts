import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ViewdoctorsService } from '../../services/viewdoctors.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-appointment-booking',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './appointment-booking.component.html',
  styleUrl: './appointment-booking.component.css'
})
export class AppointmentBookingComponent {
  patient: any | null = null;
  age:any
  doctors:any

  formData={
    weight:'',
    bp:'',
    spo2:'',
    temperature:'',
    symptoms:'',
    doctor:'',
    doctorId:''
  }
  formData2={
    name:'',
    age:'',
    gender:'',
    phone:'',
    weight:'',
    bp:'',
    spo2:'',
    temperature:'',
    symptoms:'',
    doctor:'',
    doctorId:''
  }
  nulled=false;

  constructor(private route: ActivatedRoute, private viewdoctor: ViewdoctorsService,private router: Router) {
    this.viewdoctor.viewDoctors().subscribe(
      (resp:any)=>{
        console.log(resp)
        this.doctors=resp

      },err=>{
        console.log(err)
      }
    )

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

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const patientJson = params['patient'];
      if (patientJson) {
        this.patient = JSON.parse(patientJson);
        const dob = new Date(this.patient.dob);
        this.age = this.calculateAge(dob);
        console.log(this.age)
        console.log("heroooo",this.patient)
      }
    });
  }
  onSubmit(){

    this.formData2.name=this.patient.name;
    this.formData2.age=this.age;
    this.formData2.gender=this.patient.gender;
    this.formData2.phone=this.patient.phone;

    this.formData2.bp=this.formData.bp;
    this.formData2.doctor=this.formData.doctor;
    this.formData2.doctorId=this.formData.doctorId;
    this.formData2.spo2=this.formData.spo2;
    this.formData2.symptoms=this.formData.symptoms;
    this.formData2.temperature=this.formData.temperature;
    this.formData2.weight=this.formData.weight;


    console.log(this.formData2)
    if((this.formData2.name!='' && this.formData2.age!='' && this.formData2.gender!='' &&  this.formData2.phone!='' && this.formData2.bp!=''
      && this.formData2.doctor!='' && this.formData2.doctorId!='' && this.formData2.spo2!='' && this.formData2.symptoms!='' && 
      this.formData2.temperature!='' && this.formData2.weight!='') &&
      (this.formData2.name!=null && this.formData2.age!=null && this.formData2.gender!=null &&  this.formData2.phone!=null && this.formData2.bp!=null && this.formData2.doctor!=null && this.formData2.doctorId!=null && this.formData2.spo2!=null && this.formData2.symptoms!=null && 
        this.formData2.temperature!=null && this.formData2.weight!=null)
     ){
      if (this.router) { // Check if router is defined
        this.router.navigate(['/bookslot'], { queryParams: { formData2: JSON.stringify(this.formData2) } });
      } else {
        console.error('Router service is not injected!');
      }

     }else{
      this.nulled=true
     }
    
  }

}
