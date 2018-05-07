import { RouterModule, Routes } from '@angular/router'

import { AuthGuard } from '~/app.service.auth-guard'
import { ComingSoonPageComponent } from '~/coming-soon'
import { SellPageComponent } from './sell.component'

export const routes: Routes = [
  {
    path: 'sell',
    canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'solutions', pathMatch: 'full' },
      { path: 'solutions', component: ComingSoonPageComponent },
      { path: 'soa', component: ComingSoonPageComponent },
      { path: 'products', component: ComingSoonPageComponent },
    ]
  },
]

export const SellRouting = RouterModule.forChild(routes)
