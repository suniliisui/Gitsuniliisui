import { RouterModule, Routes } from '@angular/router'

import { AuthGuard } from '~/app.service.auth-guard'
import { ComingSoonPageComponent } from '~/coming-soon'
import { SupportPageComponent } from './support.component'

export const routes: Routes = [
  {
    path: 'support',
    canActivate: [AuthGuard],
    children: [
      { path: '', component: ComingSoonPageComponent },
      { path: 'orders', component: ComingSoonPageComponent },
      { path: 'notifications', component: ComingSoonPageComponent },
      { path: 'links', component: ComingSoonPageComponent },
    ]
  },
]

export const SupportRouting = RouterModule.forChild(routes)
