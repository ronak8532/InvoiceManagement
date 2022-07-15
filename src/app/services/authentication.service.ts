import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor() { }

  currentUserValue() {
    let user = {
      firstName: 'Ronak',
      lastName: 'Dumaniya',
      token: 'ABC'
    }

    return user;
  }

  logout() {
    localStorage.removeItem('user');
  }
}
