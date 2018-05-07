import { Injectable } from '@angular/core'
import { Observable } from 'rxjs/Observable'
import { environment } from '../environments/environment'

import 'rxjs/add/observable/of'
import 'rxjs/add/operator/do'
import 'rxjs/add/operator/delay'

@Injectable()
export class CSPAuthService {

  private _isLoggedIn: boolean = false

  redirectUrl: string

  isLoggedIn(): boolean {
    const CSP_AUTH_COOKIE_KEY = 'attESSec'
    if(this._isLoggedIn) {
      return true
    }
    // check cookies
    let cookies: string[] = document.cookie.split(';')
    for (let i = 0; i < cookies.length; i++) {
      if(cookies[i].trim().startsWith(CSP_AUTH_COOKIE_KEY)) {
        console.log('Auth: Auth Cookie found, setting logged in flag for future checks')
        this._isLoggedIn = true
        return true
      }
    }
    return false
  }

  login() {
    // todo read csp cookie
    return Observable.of(true).delay(1000).do(val => this._isLoggedIn = true)
  }

  logout() {
    this._isLoggedIn = false
  }

  /**
   * Send it to server to Authenticate with CSP and Authorize.
   * @param returnToRoute - The URL to redirect to after CSP.
   */
  performCSPAuth(returnToRoute: string): boolean {
    // store the attempted URL for redirecting
    this.redirectUrl = returnToRoute
    // Call CSP for Authentication
    // NOTE: typescript - tick quotes
    let serverAuthUrl =  `${environment.CSP_URL}?returl=${location.href}&sysname=${environment.CSP_SYSNAME_PROPERTYNAME}`
    console.log('Sending to Server for Authentication -> ' + serverAuthUrl)
    location.href = serverAuthUrl

    return true
  }

}
