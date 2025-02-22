import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {

  
  url='http://localhost:5483/auth/login'

  constructor(private http:HttpClient) { }

  generateToken(credentials:any)
  {
    return this.http.post(`${this.url}`,credentials)
  }
  loginUser(token: string)
  {
    localStorage.setItem("token",token)
    return true;
  }

  isLoggedIn()
  {
    let token =localStorage.getItem("token")
    if(token==undefined || token==='' || token==null)
      {
        return false;
      }
      else{
        return true;
      }
     
  }

  logOut()
  {
    localStorage.removeItem("token")
    return true;
  }

  getToken()
  {
    return localStorage.getItem("token")
  }
  getUser()
  {
    return localStorage.getItem("user")
  }
  getRole()
  {
    return localStorage.getItem("role")
  }
  getName()
  {
    return localStorage.getItem("name")
  }
  public isValidUSer(role:any){
    let isMatch=false
    let actualRole = this.getRole();
    if(actualRole!=null && actualRole){
        for (let j = 0; j < role.length; j++) {
          if (role[j]=== actualRole) {
            isMatch=true;
            return isMatch
          }
          else{
           return isMatch;
          }
        }
      }
    return isMatch;
  }
}
