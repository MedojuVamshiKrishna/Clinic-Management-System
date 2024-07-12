import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginServiceService } from '../../services/login-service.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private loginService: LoginServiceService) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit(): void {}

  onSubmit() {
    if (this.loginForm.valid) {
      console.log("Form Submitted");
      this.loginService.generateToken(this.loginForm.value).subscribe(
        (response: any) => {
          console.log(response);
          localStorage.setItem("user", response.username);
          localStorage.setItem("role", response.role);
          localStorage.setItem("name", response.name);
          this.loginService.loginUser(response.jwtToken);
          window.location.href = "/dashboard";
        },
        (error: any) => {
          console.log(error);
        }
      );
    } else {
      console.log("Form is invalid");
    }
  }

  get email() { return this.loginForm.get('email'); }
  get password() { return this.loginForm.get('password'); }
}
