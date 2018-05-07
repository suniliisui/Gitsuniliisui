import { RouterModule, Routes } from '@angular/router'

import { AuthGuard } from '~/app.service.auth-guard'
import { ComingSoonPageComponent } from '~/coming-soon'
import { PreparePageComponent } from './prepare.component'

export const routes: Routes = [
  {
    path: 'prepare',
    canActivate: [AuthGuard],
    children: [
      { path: 'opportunities', component: ComingSoonPageComponent },
      { path: 'leads', component: ComingSoonPageComponent },
      { path: 'qualifications', component: ComingSoonPageComponent },
      { path: 'fiberlit-buildings', component: ComingSoonPageComponent },
      { path: 'locations', component: ComingSoonPageComponent },
      { path: 'geolink', component: ComingSoonPageComponent },
    ]
  },
]

export const PrepareRouting = RouterModule.forChild(routes)
