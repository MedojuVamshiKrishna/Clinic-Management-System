import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ViewPatientsInDoctorService {


  url='http://localhost:5483/doctors/patientsByDoctor?email='

  constructor(private http:HttpClient) { }


  viewAllPatients(email:any){
    return this.http.get(this.url+email)
  }
}
