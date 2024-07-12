import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ViewdoctorsService {

  url='http://localhost:5483/staff/doctors'

  constructor(private http:HttpClient) { }

  viewDoctors(){
    return this.http.get(this.url)
  }
}
