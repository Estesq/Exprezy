import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StatusComponent } from './status/status.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NextComponent } from './next/next.component';
import { ViewrequestsComponent } from './viewrequests/viewrequests.component';
import { AcceptedjobComponent } from './acceptedjob/acceptedjob.component';
import { OngoingserviceComponent } from './ongoingservice/ongoingservice.component'
import { CompletedservicesComponent } from './completedservices/completedservices.component'
import { OfflineComponent } from './offline/offline.component'
import { RegisterComponent } from './register/register.component'

import { AuthGuard } from './auth.guard';
import { from } from 'rxjs';
import { LoginAuthGuard } from './login/auth.guard'

const routes: Routes = [
  { path: 'register', component: RegisterComponent },
  { path: '', component: LoginComponent, canActivate: [LoginAuthGuard], },
  { path: 'login', component: LoginComponent, canActivate: [LoginAuthGuard], }, // loginauthgaurd checks if token present else creates one

  {
    path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard],  // authgaurd checks if token present else redirects to login
    children: [
      { path: 'viewreq', component: ViewrequestsComponent },
      { path: 'acceptedjob', component: AcceptedjobComponent },
      { path: 'ongoingjob', component: OngoingserviceComponent },
      { path: 'completed', component: CompletedservicesComponent },
      { path: 'offline', component: OfflineComponent },
      { path: 'status', component: StatusComponent },
      { path: 'next', component: NextComponent },
      { path: '**', redirectTo: 'viewreq' },
    ]
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
