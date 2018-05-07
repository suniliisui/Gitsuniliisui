import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'

import { SESharedModule } from '~/se-ui-components'
import { SellRouting } from './sell.routing'
import { SellPageComponent } from './sell.component'

@NgModule({
  imports: [
    CommonModule,
    NgbModule.forRoot(),
    SellRouting,
    SESharedModule,
  ],
  declarations: [
    SellPageComponent,
  ],
})
export class SellModule {
}
