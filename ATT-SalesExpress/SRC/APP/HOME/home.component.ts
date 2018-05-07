import { Component, OnInit, ViewChild } from '@angular/core'
import { NgbModal, NgbActiveModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap'

import { Logger, LoggerService } from '~/se-ui-services/global/log'
import { Preferences } from '~/se-ui-interfaces/preferences'
import { PreferencesService } from '~/se-ui-services/preferences'
import mockSlides from './mock.slides'

@Component({
  // selector: 'se-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomePageComponent implements OnInit {

  @ViewChild("tabs")
  tabs

  @ViewChild("tabsConfigureModal")
  tabsConfigureModal

  private slides = mockSlides
  private preferences: Preferences
  private pendingPreferences: Preferences
  private log: Logger

  constructor (
    private modalService: NgbModal,
    private preferencesService: PreferencesService,
    private loggerService: LoggerService,
  ) {
    this.log = loggerService.tag("home")
  }

  get modalValid () {
    return this.pendingPreferences.homeTabs.active.length <= 3
  }

  ngOnInit () {
    this.fetchPreferences()
  }

  fetchPreferences () {
    this.log.debug(`Fetching preferences`)
    this.preferencesService.fetch()
      .then(preferences => {
        console.log(`Received preferences`, preferences)
        this.preferences = preferences
      })
      .then(() => {
        // TODO not currently used. first tab is selected by default.
        // this.tabs.select(this.selected)
      })
  }

  showTabsConfigureModal () {
    this.pendingPreferences = JSON.parse(JSON.stringify(this.preferences))
    this.modalService
      .open(this.tabsConfigureModal, { windowClass: 'modal-tabs-configure' })
      .result.then(result => {
        this.preferences = this.pendingPreferences
        this.preferencesService.update('homeTabs', this.preferences.homeTabs)
          .then(() => {
            console.log(`Updated preferences`, this.preferences)
          })
          .catch(() => {
            console.error(`Failed to update preferences`)
          })
      }, result => {
        this.fetchPreferences()
        console.log(`Canceled tab configuration modal`)
      })
  }

  // TODO not currently used. first tab is selected by default.
  get selected (): string {
    const { homeTabs } = this.preferences
    return !homeTabs || !homeTabs.selected
      ? 'notifications' : homeTabs.active[homeTabs.selected]
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC'
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop'
    } else {
      return  `with: ${reason}`
    }
  }

}
