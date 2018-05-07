import { Component, OnInit, ViewChild } from '@angular/core'
import { Analytics } from './se-ui-services/global/analytics/analytics'
import { ModalPopupComponent } from './se-ui-components/modals/modal-popup.component'

@Component({
  selector: 'se-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {

  //public isOpened:boolean= false;
  @ViewChild(ModalPopupComponent)
  popupChild: ModalPopupComponent

  constructor(
    private analytics: Analytics
  ) {
  }

  ngOnInit(): void {
    this.analytics.trackPageViews()
  }

  openPopup(): void {
    // this.isOpened = true
    this.popupChild.openPopup()
  }

}
