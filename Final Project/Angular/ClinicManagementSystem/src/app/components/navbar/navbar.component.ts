import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LoginServiceService } from '../../services/login-service.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  public loggedIn=false;
  user:any;

  constructor(private loginservice: LoginServiceService){
   
  }

  ngOnInit(): void {
    this.loggedIn=this.loginservice.isLoggedIn()
    if(this.loggedIn){
      this.user=this.loginservice.getUser()
    }
  }
  logoutuser()
  {
    localStorage.removeItem("user")
    this.loginservice.logOut();
    location.reload();
  }
}
