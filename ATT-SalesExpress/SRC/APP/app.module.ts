// Angular 2
import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'
import { HttpModule, Http, RequestOptions } from '@angular/http'
import { FormsModule } from '@angular/forms'
import { RouterModule } from '@angular/router'
import { LocationStrategy, HashLocationStrategy } from '@angular/common'

// Vendor specific
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'
import './rxjs-operators'

// SE application
import { AppComponent } from './app.component'
import { AppRoutingModule } from './app.routing'

// SE components and pages
import { SESharedModule } from './se-ui-components'
import { HomeModule } from './home/home.module'
import { AccountsModule } from './accounts/accounts.module'
import { PrepareModule } from './prepare/prepare.module'
import { SellModule } from './sell/sell.module'
import { SupportModule } from './support/support.module'
import { UserModule } from './user/user.module'
import { NotFoundPageComponent } from './not-found'

// SE services
import { AuthGuard } from './app.service.auth-guard'
import { CSPAuthService } from './app.service.csp-auth'
import { LoggerService } from './se-ui-services/global/log'
import { NonCachingRequestOptions, HttpCachable } from './se-ui-services/global/http'
import { NotificationsService, HTTPNotificationsService, MockNotificationsService } from './se-ui-services/notifications'
import { PersonService, HTTPPersonService, MockPersonService } from './se-ui-services/person'
import { HttpNewsService } from './se-ui-services/newsfeed/http.news.service'
import { HttpTspaceFeedsService } from './se-ui-services/tspace/http.tspace.service'
import { HttpOpptyService } from './se-ui-services/widgets/http.oppty.service'
import { HttpLeadsService } from './se-ui-services/widgets/http.leads.service'

@NgModule({
  imports: [
    // Angular 2
    BrowserModule,
    HttpModule,
    FormsModule,
    RouterModule,
    // SE components and pages
    AppRoutingModule,
    SESharedModule,
    // HomeModule,
    // AccountsModule,
    PrepareModule,
    SellModule,
    SupportModule,
    UserModule,
    // Vendor specific
    NgbModule.forRoot(),
  ],
  declarations: [
    AppComponent,
    NotFoundPageComponent,
  ],
  providers: [
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    { provide: NotificationsService, useClass: HTTPNotificationsService },
    { provide: PersonService, useClass: HTTPPersonService },
    { provide: RequestOptions, useClass: NonCachingRequestOptions },
    AuthGuard,
    CSPAuthService,
    LoggerService,
    HttpCachable,
    HttpNewsService,
    HttpTspaceFeedsService,
    HttpOpptyService,
    HttpLeadsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
