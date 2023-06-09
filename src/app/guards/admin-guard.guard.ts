import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import {AuthService} from "../services/auth.service";

@Injectable({
  providedIn: 'root'
})
export class AdminGuardGuard implements CanActivate {

  constructor(public authService : AuthService , public router : Router) {
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.authService.isLoggedIn && this.authService.role === "admin" || this.authService.role === "basicAdmin") {
      if(this.authService.settings === "manual") {
        return true;
      } else {
        // redirect to profile to set new password
        this.router.navigateByUrl("/admin/profile");
        return false;
      }
    } else {
      this.router.navigateByUrl("/workers/login");
      return false;
    }
  }

}
