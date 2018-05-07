import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { Routes, RouterModule } from '@angular/router'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'

import { SESharedModule } from '~/se-ui-components'
import { HttpAccountsDetailsService, HttpOpportunityListService, HttpAccountsListService } from '~/se-ui-services/accounts'
import { AccountsRouting } from './accounts.routing'
import { AccountsPageComponent } from './accounts.component'
import { AccountsListComponent } from './accounts-list'
import { AccountDetailsComponent } from './account-details'

@NgModule({
  imports: [
    CommonModule,
    NgbModule.forRoot(),
    AccountsRouting,
    SESharedModule,
  ],
  declarations: [
    AccountsPageComponent,
    AccountsListComponent,
    AccountDetailsComponent,
  ],
  providers: [
    HttpAccountsDetailsService,
    HttpOpportunityListService,
    HttpAccountsListService
  ]
})
export class AccountsModule {
}
