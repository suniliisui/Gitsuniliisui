import { Routes, RouterModule } from '@angular/router'
import { AuthGuard } from './app.service.auth-guard'
import { ComingSoonPageComponent } from './coming-soon'
import { NotFoundPageComponent } from './not-found'

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home',
    canActivate: [AuthGuard],
  },
  {
    path: 'home',
    canActivate: [AuthGuard],
    loadChildren: './home/home.module#HomeModule',
  },
  {
    path: 'accounts',
    canActivate: [AuthGuard],
    loadChildren: './accounts/accounts.module#AccountsModule',
  },
  {
    path: 'coming-soon',
    component: ComingSoonPageComponent,
  },
  {
    path: '**',
    component: NotFoundPageComponent,
  },
]

export const AppRoutingModule = RouterModule.forRoot(routes, { useHash: true })
