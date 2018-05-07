/* tslint:disable:no-unused-variable */

import { TestBed, async } from '@angular/core/testing'
import { AppModule } from '~/app.module'
import { SideNavComponent } from './side-nav.component'

describe('Side Navigation', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        AppModule
      ],
    })
  })

  it('should create the side nav', async(() => {
    const fixture = TestBed.createComponent(SideNavComponent)
    const component = fixture.debugElement.componentInstance
    expect(component).toBeTruthy()
  }))

  it('should have expected greeting', async(() => {
    const fixture = TestBed.createComponent(SideNavComponent)
    fixture.detectChanges()
    const compiled = fixture.debugElement.nativeElement
    const greeting = compiled.querySelector('.greeting')
    expect(greeting.textContent).toBe('Welcome back Corey')
    // TODO actual verify anchor text and href value
  }))

})
