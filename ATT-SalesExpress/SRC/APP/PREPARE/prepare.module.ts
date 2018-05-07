import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'

import { SESharedModule } from '~/se-ui-components'
import { PrepareRouting } from './prepare.routing'
import { PreparePageComponent } from './prepare.component'

@NgModule({
  imports: [
    CommonModule,
    NgbModule.forRoot(),
    PrepareRouting,
    SESharedModule,
  ],
  declarations: [
    PreparePageComponent,
  ],
})
export class PrepareModule {
}
