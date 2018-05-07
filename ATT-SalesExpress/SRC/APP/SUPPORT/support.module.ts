import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'

import { SESharedModule } from '~/se-ui-components'
import { SupportRouting } from './support.routing'
import { SupportPageComponent } from './support.component'

@NgModule({
  imports: [
    CommonModule,
    NgbModule.forRoot(),
    SupportRouting,
    SESharedModule,
  ],
  declarations: [
    SupportPageComponent,
  ],
})
export class SupportModule {
}
