import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GetSlotsService {
  url='http://localhost:5483/staff/availabilities?email='
  constructor(private http:HttpClient) { }

  getSlots(email:any){
    return this.http.get(this.url+email)
  }
}
