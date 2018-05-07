import { RouterModule, Routes } from '@angular/router'

import { AuthGuard } from '~/app.service.auth-guard'
import { ComingSoonPageComponent } from '~/coming-soon'
import { UserPageComponent } from './user.component'

export const routes: Routes = [
  {
    path: 'user',
    canActivate: [AuthGuard],
    children: [
      { path: '', component: ComingSoonPageComponent },
      { path: 'profile', component: ComingSoonPageComponent },
      { path: 'compensation', component: ComingSoonPageComponent },
      { path: 'mysips', component: ComingSoonPageComponent },
      { path: 'communities', component: ComingSoonPageComponent },
      { path: 'following', component: ComingSoonPageComponent },
      { path: 'people', component: ComingSoonPageComponent },
    ]
  },
]

export const UserRouting = RouterModule.forChild(routes)
