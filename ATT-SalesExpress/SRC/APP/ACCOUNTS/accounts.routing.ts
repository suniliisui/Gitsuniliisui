import { RouterModule, Routes } from '@angular/router'
import { AccountsPageComponent } from './accounts.component'

import { AuthGuard } from '~/app.service.auth-guard'
import { ComingSoonPageComponent } from '~/coming-soon'
import { AccountsListComponent } from './accounts-list'
import { AccountDetailsComponent } from './account-details'

const routes: Routes = [
  {
    path: '',
    component: AccountsPageComponent,
    children: [
      { path: '', component: AccountsListComponent },
      { path: ':id/details', component: AccountDetailsComponent },
    ]
  }
];

export const AccountsRouting = RouterModule.forChild(routes)
