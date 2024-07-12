import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GetavailabilitiesService {

  url='http://localhost:5483/doctors/availabilities?id='

  constructor(private http:HttpClient) { }

  getAvailabilities(id:any){
    return this.http.get(this.url+id)
  }
}
