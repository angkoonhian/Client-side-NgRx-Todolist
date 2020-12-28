import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from './../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  RegisterForm: FormGroup;

  isLoading = false;

  RegisterUser = {
    Email: '',
    Password: ''
  }

  constructor(private route: Router, private http: HttpClient, private fb: FormBuilder, private authService: AuthService) { 
    this.RegisterForm = this.fb.group({
      Email: ['', [Validators.required, Validators.email]],
      Password: ['', [Validators.required, Validators.minLength(6)]]
    })
  }

  ngOnInit(): void {
  }

  //Route link to navigate to Login page.
  public goToLogin() {
    this.route.navigate(['']);
  }
  
  //Submit logic for registerform.
  public Register(RegisterForm) {
    this.RegisterUser.Email = RegisterForm.value.Email;
    this.RegisterUser.Password = RegisterForm.value.Password;
    // change isLoading to true to display spinner
    this.isLoading = true;
    // linking up with authservice to validate signing up. Changes isLoading to false once connection is made
    // to stop displaying spinner.
    this.authService.signUp(this.RegisterUser.Email, this.RegisterUser.Password).subscribe(
      resData => {
        console.log(resData);
        alert("You have signed up successfully!");
        this.isLoading = false;
      },
      error => {
        alert("Unsuccessful registration");
        this.isLoading = false;
      }
    );
    RegisterForm.reset();
  }

}