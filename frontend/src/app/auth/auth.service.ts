import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class MyServiceService {
  constructor(private http: HttpClient) { }

  login(username: string, password: string): any {
    return this.http.post<any>(environment.serverlink + "/api/auth",{ username: username, password: password })
    // return this.http.post<any>("http://localhost:5000/api/auth", { username: username, password: password })
  }

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    
  logout() {
    localStorage.clear();
  }

  public get loggedIn(): boolean {
    return (localStorage.getItem('access_token') !== null);
  }
}
