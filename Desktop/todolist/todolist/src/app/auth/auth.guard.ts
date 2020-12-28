import { CanActivate, 
    ActivatedRouteSnapshot, 
    RouterStateSnapshot, 
    UrlTree, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthService } from './../services/auth.service';
import { Observable} from 'rxjs';
import { map, tap, take } from 'rxjs/operators';

// importing ngrx things as well as global reducer.
import { Store } from '@ngrx/store';
import * as fromApp from '../store/app.reducer';

@Injectable({providedIn: 'root'})

export class AuthGuard implements CanActivate {
    constructor(
      private authService: AuthService,
      private router: Router,
      private store: Store<fromApp.AppState>
    ) {}
  
    // define canACtivate as an authentication guard to determine if page is blocked.
    canActivate(
      route: ActivatedRouteSnapshot,
      router: RouterStateSnapshot
    ):
      | boolean
      | UrlTree
      | Promise<boolean | UrlTree>
      | Observable<boolean | UrlTree> {
      return this.store.select('auth').pipe(
        take(1),
        map(authState => {
          return authState.user;
        }),
        // check if upon directly visiting the page, user is authenticated. if not redirect back to login page.
        map(user => {
          const isAuth = !!user;
          if (isAuth) {
            return true;
          }
          // redirecting router by creating new UrlTree pointing to login page. (home page).
          return this.router.createUrlTree(['/']);
        })
      );
    }
  }