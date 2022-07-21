import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(
    private http: HttpClient,
    private route: Router,
  ) { }

  login(data: any) {
    return this.http.post(`${environment.baseUrl}/admin/user/login`, data);
  }

  currentUserValue() {
    let token = localStorage.getItem('authToken');

    return token;
  }

  logout() {
    localStorage.removeItem('authToken');
  }
}
