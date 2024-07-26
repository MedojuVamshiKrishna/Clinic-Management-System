import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StatsService {

  url='http://localhost:5483/admin/doctorsCount'

  url1='http://localhost:5483/admin/staffCount'

  url2='http://localhost:5483/admin/bookingCount'

  url3='http://localhost:5483/admin/patientCount'

  url4='http://localhost:5483/admin/allBookings'

  URL5='http://localhost:5483/admin/appointments/counts'

  constructor(private http:HttpClient) { }

  getPatientCount(){
    return this.http.get(this.url3)
  }

  getDoctorsCount(){
    return this.http.get(this.url)
  }

  getStaffCount(){
    return this.http.get(this.url1)
  }

  getBookingCount(){
    return this.http.get(this.url2)
  }

  getAllbookings(){
    return this.http.get(this.url4)
  }

  linegraph1(dates: any[]){
   return this.http.post(this.URL5,dates)

  }
  
}
