import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'

import { SESharedModule } from '~/se-ui-components'
import { HomeRouting } from './home.routing'
import { HomePageComponent } from './home.component'

@NgModule({
  imports: [
    CommonModule,
    NgbModule.forRoot(),
    HomeRouting,
    SESharedModule,
  ],
  declarations: [
    HomePageComponent,
  ],
})
export class HomeModule {
}
