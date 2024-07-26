import { Component } from '@angular/core';
import { LoginServiceService } from '../../services/login-service.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  role:any
  name:any
  logedin=false
  constructor(private loginserice: LoginServiceService){
    console.log(this.loginserice.getToken())
    this.logedin=this.loginserice.isLoggedIn();
    if(this.logedin){
      this.role=this.loginserice.getRole();
      this.name=this.loginserice.getName();

      console.log(loginserice.getRole())
    }
  }

}
