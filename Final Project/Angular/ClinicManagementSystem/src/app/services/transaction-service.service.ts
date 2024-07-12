import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TransactionServiceService {

  url='http://localhost:5483/staff/createTransaction/'

  constructor(private http:HttpClient) { }

  createTrasaction(amount:any){
    return this.http.get(this.url+amount)
  }
}
