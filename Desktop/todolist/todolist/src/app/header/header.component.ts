import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store'
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

import * as fromApp from './../store/app.reducer';
import * as AuthActions from './../auth/store/auth.action';
import { AuthService } from './../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isAuthenticated = false;
  private userSub: Subscription

  constructor(
    private authService: AuthService,
    private store: Store<fromApp.AppState>
  ) { }

  // Upon initialisation, check authState and set isAuthenticated accordingly.
  ngOnInit(): void {
    this.userSub = this.store
      .select('auth')
      .pipe(map(authState => authState.user))
      .subscribe(user => {
        this.isAuthenticated = !!user;
        console.log(!user);
        console.log(!!user);
      })
  }

  // Logging out dispatches Logout action from AuthActions, clear cache.
  onLogout() {
    this.store.dispatch(new AuthActions.Logout());
  }

}
