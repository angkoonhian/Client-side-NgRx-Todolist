import { of } from "rxjs";
import { Router } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { catchError, switchMap, map, tap } from 'rxjs/operators';

import * as AuthActions from './auth.action';
import { AuthService } from './../../services/auth.service';
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { User } from './../user.model';

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

// const for handling authentication. can be called multiple times.
const handleAuthentication = (
    expiresIn: number,
    email: string,
    userId: string,
    token: string
  ) => {
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    const user = new User(email, userId, token, expirationDate);
    localStorage.setItem('userData', JSON.stringify(user));
    return new AuthActions.Login({
      email: email,
      userId: userId,
      token: token,
      expirationDate: expirationDate
    });
  };

// const for handling errors. can be called multiple times if needed.
const handleError = (errorRes: any) => {
    let errorMessage = 'An unknown error occurred!';
    if (!errorRes.error || !errorRes.error.error) {
      return of(new AuthActions.LoginFail(errorMessage));
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
    return of(new AuthActions.LoginFail(errorMessage));
  };

// injectable still needed to inject constructors into this class. httpclient etc
@Injectable()
export class AuthEffects {
  // AuthLogin as usual. Request from firebase for auth.
    @Effect()
    authLogin = this.actions$.pipe(
        ofType(AuthActions.LOGIN_START),
        switchMap((authData: AuthActions.LoginStart) => {
            return this.http.post<AuthResponseService>(
                'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCfrwe9OIlWGj83sBpBxA-h2OcekSuxcWU', 
            {
                email: authData.payload.email,
                password: authData.payload.password,
                returnSecureToken: true
            }
        ).pipe(
            tap(resData => {
              this.authService.setLogoutTimer(+resData.expiresIn * 1000);
              this.router.navigate(['dashboard']);
            }),
            map(resData => {
              return handleAuthentication(
                +resData.expiresIn,
                resData.email,
                resData.localId,
                resData.idToken
              );
            }),
            catchError(errorRes => {
              return handleError(errorRes);
            })
          );
        })
    )

    // Auto redirect effect to redirect users if they go to unauthenticated pages.
    @Effect({ dispatch: false })
    authRedirect = this.actions$.pipe(
        ofType(AuthActions.LOGIN),
        tap(() => {
            this.router.navigate(['dashboard']);
        })
    );
  // autoLogin effect. We look at local storage to check if user is
  // logged in, if it is not, we return dummy for debug or if it is 
  // logged in, we carry out the auth process by creating new token 
  // and tokenExpirationDate for login
  @Effect()
  autoLogin = this.actions$.pipe(
    ofType(AuthActions.AUTO_LOGIN),
    map(() => {
      const userData: {
        email: string;
        id: string;
        _token: string;
        _tokenExpirationDate: string;
      } = JSON.parse(localStorage.getItem('userData'));
      if (!userData) {
        return { type: 'DUMMY' };
      }

      const loadedUser = new User(
        userData.email,
        userData.id,
        userData._token,
        new Date(userData._tokenExpirationDate)
      );

      if (loadedUser.token) {
        const expirationDuration =
          new Date(userData._tokenExpirationDate).getTime() -
          new Date().getTime();
        this.authService.setLogoutTimer(expirationDuration);
        return new AuthActions.Login({
          email: loadedUser.email,
          userId: loadedUser.id,
          token: loadedUser.token,
          expirationDate: new Date(userData._tokenExpirationDate)
        });
      }
      return { type: 'DUMMY' };
    })
  );
    // Authlogout to remove userData from local storage so as to
    // prevent autoLogin from triggering.
    @Effect({ dispatch: false })
    authLogout = this.actions$.pipe(
        ofType(AuthActions.LOGOUT),
        tap(() => {
        this.authService.clearLogoutTimer();
        localStorage.removeItem('userData');
        this.router.navigate(['/']);
        })
    );

    constructor(
        private actions$: Actions,
        private http: HttpClient,
        private router: Router,
        private authService: AuthService
    ) {}
}