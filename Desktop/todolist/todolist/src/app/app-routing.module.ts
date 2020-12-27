import { NgModule } from '@angular/core';
import { Routes, RouterModule, CanActivate} from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { AuthGuard } from './auth/auth.guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RegisterComponent } from './register/register.component';


const routes: Routes = [
  { path: '', component: AuthComponent},
  { path: 'register', component: RegisterComponent},
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
