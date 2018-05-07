/* tslint:disable:no-unused-variable */

import { TestBed, async } from '@angular/core/testing'

import { AppModule } from './app.module'
import { AppComponent } from './app.component'

describe('App: Sales Express', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        AppModule
      ],
    })
  })

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent)
    const app = fixture.debugElement.componentInstance
    expect(app).toBeTruthy()
  }))

})
