import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../../services/auth/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild {

  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) { }

  check() {
    return this.authService.isLoggedIn();
  }

  homeCheck() {
    if(this.check()) {
      return true;
    }

    this.router.navigate(['login']);

    return false;
  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    // Case: Login and Register routes
    if(next.data.route == 'auth') {
      if(this.check()) {
        this.router.navigate(['home']);

        return false;
      }

      return true;
    }
    
    // Case: Home route
    return this.homeCheck();
  }
        
  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.homeCheck();
  }
  
}

