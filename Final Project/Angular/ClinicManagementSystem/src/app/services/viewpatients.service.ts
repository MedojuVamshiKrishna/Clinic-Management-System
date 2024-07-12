import { HttpBackend, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ViewpatientsService {

  url='http://localhost:5483/staff/patients'
  url1='http://localhost:5483/staff/patientsbyphone?phone='

  constructor(private http: HttpClient) {


   }

   getUsers(){
    return this.http.get(this.url)
   }

   getPatientByPhone(phone: any){
    return this.http.get(this.url1+phone)
   }
}
