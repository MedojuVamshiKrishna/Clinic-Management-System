import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule, AbstractControl, ValidationErrors } from '@angular/forms';
import { RegisterService } from '../../services/register.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm: FormGroup;
  exist = false;
  create = false;

  constructor(private fb: FormBuilder, private register: RegisterService) {
    this.registerForm = this.fb.group({
      role: ['', Validators.required],
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confpassword: ['', Validators.required]
    }, {
      validator: this.passwordMatchValidator
    });
  }

  ngOnInit(): void {}

  passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confpassword')?.value;
    return password === confirmPassword ? null : { 'mismatch': true };
  }

  redirect() {
    window.location.href = "/login";
  }

  onSubmit() {
    if (this.registerForm.valid) {
      const { email, password, name, role } = this.registerForm.value;
      this.register.getuserid(email).subscribe(
        (resp: any) => {
          if (resp === null) {
            this.register.createUser({ email, password, name, role }).subscribe(
              (user: any) => {
                this.create = true;
              },
              err => {
                console.log(err);
              }
            );
          } else {
            this.exist = true;
          }
        },
        err => {
          console.log(err);
        }
      );
    } else {
      console.log("Form is invalid");
    }
  }

  get role() { return this.registerForm.get('role'); }
  get name() { return this.registerForm.get('name'); }
  get email() { return this.registerForm.get('email'); }
  get password() { return this.registerForm.get('password'); }
  get confpassword() { return this.registerForm.get('confpassword'); }
}
