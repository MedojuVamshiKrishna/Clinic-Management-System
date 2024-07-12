import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CreatepatientService {

  url='http://localhost:5483/staff/create-patient'

  constructor(private http :HttpClient) { }

  createPatient(patient:any){
    return this.http.post(this.url,patient)
  }
}
