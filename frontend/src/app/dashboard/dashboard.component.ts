import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable, Subscription } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { RouterModule, Router } from '@angular/router';
import { MyServiceService } from '../auth/auth.service';
import * as jwt_decode from 'jwt-decode';
import { DashboardService } from "./dashboard.service";
import { GeneralService } from '../general.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: [MyServiceService, DashboardService, GeneralService]
})
export class DashboardComponent implements OnInit {
  ngOnInit(): void { }
  userId 

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(public general: GeneralService, private routes: Router, private breakpointObserver: BreakpointObserver, private auth: MyServiceService) { 
    this.userId = jwt_decode(localStorage.getItem('access_token'))['userID'];
  }
  public logout() {
    this.auth.logout();  // clear local storage login params through AUTH services
    this.routes.navigate(['login']);
  }
}
