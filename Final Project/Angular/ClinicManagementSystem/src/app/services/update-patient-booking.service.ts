import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UpdatePatientBookingService {

  url='http://localhost:5483/doctors/updatebooking'

  constructor(private http:HttpClient) { }

  updateBooking(booking:any){
    return this.http.put(this.url,booking)
  }
}
