import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm, FormControl, Validators, FormGroupDirective, FormGroup, FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../services/auth.service';

import { Store } from '@ngrx/store'
import * as fromApp from '../store/app.reducer';
import * as AuthActions from './store/auth.action';
import { LoadingSpinnerComponent } from '../shared-components/loading-spinner.component';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit, OnDestroy {

  LoginForm: FormGroup;

  // Loading boolean to check if we should display spinner icon.
  isLoading = false;

  private storeSub: Subscription;
  private closeSub: Subscription;

  error: string = null;
  // Intialise user object with these 2 fields.
  user = {
    username: '',
    password: ''
  }

  constructor(
    private router: Router, 
    private Http: HttpClient, 
    private fb: FormBuilder, 
    private authService: AuthService,
    private store: Store<fromApp.AppState>) {
    this.LoginForm = this.fb.group({
      Username: ['', [Validators.required, Validators.minLength(1)]],
      Password: ['', [Validators.required, Validators.minLength(6)]]
    })
  } 

  ngOnInit(): void {
    this.storeSub = this.store.select('auth').subscribe(authState => {
      this.error = authState.authError;
    })
  }
  // Unsubscibe to all observables.
  ngOnDestroy() {
    if (this.closeSub) {
      this.closeSub.unsubscribe();
    }
    if (this.storeSub) {
      this.storeSub.unsubscribe();
    }
  }
  // Upon submitting form, dispatch login action from AuthActions.
  public SignIn(LoginForm) {
    this.user.username = LoginForm.value.Username;
    this.user.password = LoginForm.value.Password;
    this.isLoading = true;
    this.store.dispatch(
      new AuthActions.LoginStart({
        email: this.user.username,
        password: this.user.password})
    )
  }
  // Redirecting to register page.
  public goToRegister() {
    this.router.navigate(['register']);
  }
  // Clears up existing error.
  onHandleError() {
    this.store.dispatch(new AuthActions.ClearError());
  }
  

}
