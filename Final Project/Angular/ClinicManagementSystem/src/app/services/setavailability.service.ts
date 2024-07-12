import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SetavailabilityService {

  url='http://localhost:5483/doctors/create-doctor-availability'

  constructor(private http:HttpClient) { }

  setavailability(data: any[]){
    return this.http.post(this.url,data)
  }
}
