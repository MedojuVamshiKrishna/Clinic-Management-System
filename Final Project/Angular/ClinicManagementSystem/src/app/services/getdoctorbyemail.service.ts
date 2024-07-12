import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GetdoctorbyemailService {

  url='http://localhost:5483/doctors/doctorByEmail?email='

  constructor(private http:HttpClient) { }

  getDoctorByEmail(email:any){
    return this.http.get(this.url+email)
  }
}
