import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'

import { SESharedModule } from '~/se-ui-components'
import { UserRouting } from './user.routing'
import { UserPageComponent } from './user.component'

@NgModule({
  imports: [
    CommonModule,
    NgbModule.forRoot(),
    UserRouting,
    SESharedModule,
  ],
  declarations: [
    UserPageComponent,
  ],
})
export class UserModule {
}
