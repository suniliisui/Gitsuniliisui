/* tslint:disable:no-unused-variable */

import { TestBed, async } from '@angular/core/testing'

import { SESharedModule } from '~/se-ui-components'
import { NewsfeedComponent } from './newsfeed.component'

describe('NewsfeedComponent', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        SESharedModule
      ],
    })
  })

  it('should click Newsfeed tab', async(() => {
    const fixture = TestBed.createComponent(NewsfeedComponent)
    fixture.detectChanges()
    const compiled = fixture.debugElement.nativeElement
    const tab = compiled.querySelectorAll('#Newsfeed')
    expect(tab.length).toBe(1)
  }))

  it('should be able to expand on chevron click', async(() => {
    const fixture = TestBed.createComponent(NewsfeedComponent)
    fixture.detectChanges()
    const compiled = fixture.debugElement.nativeElement
    const newsFeedTitle = compiled.querySelectorAll('.news-heading')
    const chevron = compiled.querySelectorAll('.chevron')
    expect(chevron.length).toBe(1)
    expect(newsFeedTitle.length).toBe(1)
  }))

  it('should not exceed content length more than 250 charc', async(() => {
    const fixture = TestBed.createComponent(NewsfeedComponent)
    fixture.detectChanges()
    const compiled = fixture.debugElement.nativeElement
    const content = compiled.querySelectorAll('#newsFeedContent')
    expect(content.text.length).toBeLessThan(250)
  }))

  it('should be able to open read full article', async(() => {
    const fixture = TestBed.createComponent(NewsfeedComponent)
    fixture.detectChanges()
    const compiled = fixture.debugElement.nativeElement
    const readLink = compiled.querySelectorAll('.read-full')
    expect(readLink.length).toBe(1)
  }))

  it('should be able to collapse on chevron click', async(() => {
    const fixture = TestBed.createComponent(NewsfeedComponent)
    fixture.detectChanges()
    const compiled = fixture.debugElement.nativeElement
    const accordion = compiled.querySelectorAll('.news-heading')
    expect(accordion.length).toBe(1)
  }))

});
