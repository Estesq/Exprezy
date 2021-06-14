import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Routes, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginAuthGuard implements CanActivate {
  constructor(private router: Router) { }
    // runs before everything
  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (localStorage.getItem('access_token')) {  // check if localstorage token already present
      this.router.navigate(['dashboard']);  // if yes redirecting to dashboard
      return false;  
    }
    return true;    // if no redirecting to login
  }

}
    