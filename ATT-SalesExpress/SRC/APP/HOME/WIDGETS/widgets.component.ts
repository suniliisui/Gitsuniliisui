import { Component, Input, OnInit, ViewChild } from '@angular/core'
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap'

import { Preferences } from '~/se-ui-interfaces/preferences'
import { PreferencesService } from '~/se-ui-services/preferences'

@Component({
  selector: 'se-widgets',
  templateUrl: './widgets.component.html',
  styleUrls: ['./widgets.component.scss']
})

export class WidgetsComponent implements OnInit {

  @ViewChild("widgetsConfigureModal")
  widgetsConfigureModal

  private preferences: Preferences
  private pendingPreferences: Preferences

  constructor (
    private modalService: NgbModal,
    private preferencesService: PreferencesService
  ) {
  }

  get modalValid () {
    return false
    // return this.pendingPreferences.homeWidgets.active.length <= 3
  }

  ngOnInit () {
    this.fetchPreferences()
  }

  fetchPreferences () {
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

  showWidgetsConfigureModal(): void {
    this.pendingPreferences = JSON.parse(JSON.stringify(this.preferences))
    this.modalService
      .open(this.widgetsConfigureModal, { windowClass: 'modal-widgets-configure' })
      .result.then((result) => {
        console.log(`Closed with: ${result}`)
      }, (reason) => {
        console.log(`Dismissed ${this.getDismissReason(reason)}`)
      })
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
