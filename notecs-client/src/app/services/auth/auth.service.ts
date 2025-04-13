import { Injectable } from '@angular/core';
import * as jwt_decode from 'jwt-decode';

export class CurrentUser {
  id: number;
  name: string;
  email: string;
  token: string;

  constructor(name: string, email: string, token: string, id: number) {
    this.name = name;
    this.email = email;
    this.token = token;
    this.id = id;
  }
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserKey = 'currentUser';

  constructor() { }

  setCurrentUser(token: string): void {
    try {
      const decoded: any = jwt_decode.jwtDecode(token);
      const id = decoded.id;
      const name = decoded.name;
      const email = decoded.email;

      const user = new CurrentUser(name, email, token, id);
      console.log(user)
      localStorage.setItem(this.currentUserKey, JSON.stringify(user));
    } catch (error) {
      console.error('Error decodificando el token:', error);
    }
  }


  getCurrentUser(): CurrentUser | null {
    const userData = localStorage.getItem(this.currentUserKey);
    if (userData) {
      return JSON.parse(userData);
    }
    return null;
  }

  isLoggedIn(): boolean {
    return localStorage.getItem(this.currentUserKey) !== null;
  }

  logout(): void {
    localStorage.removeItem(this.currentUserKey);
  }
}
