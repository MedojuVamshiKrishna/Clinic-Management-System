import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  url='http://localhost:5483/auth/create-user'
  url2='http://localhost:5483/auth/useremail?email='
  constructor(private http: HttpClient) {

   }

   createUser(user:any){
    return this.http.post(`${this.url}`,user)
   }

   getuserid(email:any){
      return this.http.get(this.url2+ email)
   }
}
