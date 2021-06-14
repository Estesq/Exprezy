import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { environment } from '../environments/environment';
import { RouterModule, Routes } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatStepperModule } from '@angular/material/stepper';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import {MatAutocompleteModule} from '@angular/material/autocomplete';

import { HttpClientModule } from "@angular/common/http";
import { JwtModule } from '@auth0/angular-jwt';
import * as jwt_decode from 'jwt-decode';

import { from } from 'rxjs';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';

import { StatusComponent } from './status/status.component';
import { LoginComponent } from './login/login.component';
import { NextComponent } from './next/next.component';
import { ViewrequestsComponent } from './viewrequests/viewrequests.component';
import { AcceptedjobComponent } from './acceptedjob/acceptedjob.component';
import { JobcardComponent } from './jobcard/jobcard.component';

import { AuthGuard } from './auth.guard';
import { LoginAuthGuard } from './login/auth.guard'
import { MyServiceService } from './auth/auth.service';
import { ViewreqService } from './viewrequests/viewreq.service';
import { GeneralService } from './general.service';
import { AcceptedjobService } from './acceptedjob/acceptedjob.service';
import { DeliverService } from './ongoingservice/deliver.service'

import { OngoingserviceComponent } from './ongoingservice/ongoingservice.component';
import { BottomsheetComponent } from './ongoingservice/bottomsheet/bottomsheet.component';
import { CompletedservicesComponent } from './completedservices/completedservices.component';
import { OfflineComponent } from './offline/offline.component';
import { RegisterComponent } from './register/register.component'


export function tokenGetter() {
  return localStorage.getItem('access_token');
}

const routes: Routes = [];

@NgModule({
  declarations: [
    AppComponent,
    StatusComponent,
    DashboardComponent,
    LoginComponent,
    NextComponent,
    ViewrequestsComponent,
    AcceptedjobComponent,
    JobcardComponent,
    OngoingserviceComponent,
    BottomsheetComponent,
    CompletedservicesComponent,
    OfflineComponent,
    RegisterComponent
  ],
  entryComponents: [
    JobcardComponent,
    BottomsheetComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatCardModule,
    MatDialogModule,
    MatDatepickerModule,
    MatInputModule,
    MatFormFieldModule,
    MatCheckboxModule,
    MatSnackBarModule,
    MatBottomSheetModule,
    MatStepperModule,
    MatAutocompleteModule, 
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    RouterModule.forRoot(routes, { enableTracing: false }),
    HttpClientModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        whitelistedDomains: ['localhost:5000']
      }
    }),
  ],
  providers: [
    AuthGuard,
    MyServiceService,
    GeneralService,
    ViewreqService,
    LoginAuthGuard,
    AcceptedjobService,
    DeliverService,
    { provide: LocationStrategy, useClass: HashLocationStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
