import { Component, OnInit } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { MyServiceService } from '../auth/auth.service';
import * as jwt_decode from 'jwt-decode';
import { environment } from '../../environments/environment'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [MyServiceService]
})

export class LoginComponent {
  public username: string;
  public password: string;
  public error: string;

  constructor(private auth: MyServiceService, private router: Router) { }

  public submit() {
    this.auth.login(this.username, this.password).subscribe((userinfo) => {    //sending username & password to AUTH service through LOGIN()
      if (userinfo['token']) {
        localStorage.setItem('access_token', userinfo['token']);   // setting tokens in local storage
        this.router.navigate(['dashboard']);    //on successful return navigating to dashboard
      }
      else {
        this.error = 'Could not authenticate';  //error on unsuceesful authentication
      }
    })
  }

  logout() {
    this.auth.logout();  // LOGOUT() in AUTH service
    this.router.navigate(['login']); // redercting to login page
  }

  register(){
    this.router.navigate(['register']); // redercting to register page
  }
}
