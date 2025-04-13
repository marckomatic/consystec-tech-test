import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from './services/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService,
              private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const url: string = state.url;
    const loggedIn = this.authService.isLoggedIn();

    if (url === '/') {
      if (loggedIn) {
        this.router.navigate(['/dashboard']);
      } else {
        this.router.navigate(['/login']);
      }
      return false;
    }

    if (url === '/login' || url === '/signup') {
      if (loggedIn) {
        this.router.navigate(['/dashboard']);
        return false;
      } else {
        return true;
      }
    }

    if (url === '/dashboard') {
      if (!loggedIn) {
        this.router.navigate(['/login']);
        return false;
      }
    }

    return true;
  }
}
