import { Injectable } from '@angular/core'
import {
  CanActivate,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router'

import { CSPAuthService } from './app.service.csp-auth'

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private authService: CSPAuthService, private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.authService.isLoggedIn()) {
      return true
    }

    // delegeate to SE-REST Server to kick-off authentication with CSP
    this.authService.performCSPAuth(state.url)
    return false
  }

}
