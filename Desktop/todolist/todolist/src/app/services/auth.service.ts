import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { throwError, BehaviorSubject } from "rxjs";
import { catchError, tap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import * as AuthActions from '../auth/store/auth.action';
import * as fromApp from '../store/app.reducer';

// User model imported from auth component to store user data.
import { User } from "../auth/user.model";
import { Router } from "@angular/router";

// Define fields for return data type when signing up.
export interface AuthResponseService {
    kind: string,
    idToken: string,
    email: string,
    refreshToken: string,
    expiresIn: string,
    localId: string,
    // required for SignIn but not signUp hence its a wildcard.
    registered?: boolean
}

@Injectable({providedIn: 'root'})
export class AuthService {

    // Variable to keep track of token duration
    private tokenExpirationTimer: any;

    // Redirect URL, if user tries to enter a blocked page.
    redirectUrl: string;

    constructor(private http: HttpClient,
        private router: Router,
        private store: Store<fromApp.AppState>) {}

    clearLogoutTimer() {
      if (this.tokenExpirationTimer) {
        clearTimeout(this.tokenExpirationTimer);
        this.tokenExpirationTimer = null;
      }
    }

    setLogoutTimer(expirationDuration: number) {
      this.tokenExpirationTimer = setTimeout(() => {
        this.store.dispatch(new AuthActions.Logout());
      }, expirationDuration);
    }

    // signUp service for auth component, returns an AuthResponseService data type.
    // I didnt change this to ngrx format.
    signUp(email: string, password: string) {
        return this.http.post<AuthResponseService>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCfrwe9OIlWGj83sBpBxA-h2OcekSuxcWU', {
            email: email,
            password: password,
            returnSecureToken: true
        })
        .pipe(
            catchError(this.handleError),
            tap(resData => {
                this.handleAuthentication(
                    resData.email,
                    resData.localId,
                    resData.idToken,
                    // add + infront of expiresIn since its a number
                    +resData.expiresIn
                )
            })
        )
    }

    // Authentication handling 
    private handleAuthentication(
        email: string,
        userId: string,
        token: string,
        expiresIn: number
      ) {
        const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
        // this.user.next(user);
        const user = new User(email, userId, token, expirationDate);
        this.store.dispatch(
          new AuthActions.Login({
            email: email,
            userId: userId,
            token: token,
            expirationDate: expirationDate
          })
        );
        localStorage.setItem('userData', JSON.stringify(user));
      }

    // Error handling for httpErrorResponse for http requests.
    private handleError(errorRes: HttpErrorResponse) {
        let errorMessage = 'An unknown error occurred!';
        if (!errorRes.error || !errorRes.error.error) {
          return throwError(errorMessage);
        }
        switch (errorRes.error.error.message) {
          case 'EMAIL_EXISTS':
            errorMessage = 'This email exists already';
            break;
          case 'EMAIL_NOT_FOUND':
            errorMessage = 'This email does not exist.';
            break;
          case 'INVALID_PASSWORD':
            errorMessage = 'This password is not correct.';
            break;
        }
        return throwError(errorMessage);
      }
}
