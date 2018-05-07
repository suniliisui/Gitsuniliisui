import { RouterModule, Routes } from '@angular/router'

import { AuthGuard } from '~/app.service.auth-guard'
import { HomePageComponent } from './home.component'

export const routes: Routes = [
  {
    path: '',
    component: HomePageComponent,
  },
]

export const HomeRouting = RouterModule.forChild(routes)
