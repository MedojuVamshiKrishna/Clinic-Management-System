import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PatientbookingService {

  url='http://localhost:5483/staff/create-booking'

  url2='http://localhost:5483/staff/bookings?doctorId='

  url3='http://localhost:5483/staff/allBookings'

  constructor(private http:HttpClient) { }

  createbooking(bookingData:any){
    return this.http.post(this.url,bookingData)
  }


  getBookings(email:any){
    return this.http.get(this.url2+email)
  }

  getAllBooking(){
    return this.http.get(this.url3)
  }
}
