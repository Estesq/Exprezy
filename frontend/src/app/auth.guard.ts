import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private router: Router) { }
  //  checks if token present else redirects to login
  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (localStorage.getItem('access_token')) {  // if token present returns true
      return true;
    }

    this.router.navigate(['login']);  // if token not present navigate to login
    return false;
  }
}
