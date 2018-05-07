import { Component, Input, OnInit } from '@angular/core'

import { HttpOpptyService } from '~/se-ui-services/widgets/http.oppty.service'

@Component({
  selector: 'se-oppty-widget',
  templateUrl: './se-oppty-widget.component.html',
  styleUrls: ['./se-oppty-widget.component.scss'],
})
export class SeOpptyWidgetComponent implements OnInit {
  /* will be transferred to Mock Service call */
  private opptyDataSamplePrimary = { "preQualified": 1, "qualified": 1, "proposed": 1, "closed": 1, "total": 4 }
  private opptyDataSampleSales = { "preQualified": 2, "qualified": 2, "proposed": 2, "closed": 2, "total": 8 }

  private opptyWidgetData: Object
  private subTeams = [{ name: 'Sales Team', value: true }, { name: 'Primary', value: false }]
  private salesTeamOpptyCounts: Object
  private primaryOpptyCounts: Object

  constructor(
    private opptyService: HttpOpptyService
  ) {
  }

  ngOnInit() {
    this.opptyService.getSalesOppty().then(this.handleSalesOpptyResponse).catch(this.notifyError)
  }

  handlePrimaryOpptyResponse = (response) => {
    this.primaryOpptyCounts = response
    this.opptyWidgetData = this.primaryOpptyCounts
  }

  handleSalesOpptyResponse = (response) => {
    this.salesTeamOpptyCounts = response
    this.opptyWidgetData = this.salesTeamOpptyCounts
  }

  toggleData = (subTeam) => {
    if (subTeam === 'Primary') {
      if (!this.primaryOpptyCounts) {
        this.opptyService.getPrimaryOppty().then(this.handlePrimaryOpptyResponse).catch(this.notifyError)
      } else {
        this.opptyWidgetData = this.primaryOpptyCounts
      }
    } else {
      this.opptyWidgetData = this.salesTeamOpptyCounts
    }
  }

  /* General error handling */
  notifyError = (err) => {
    console.error('Opportunity Service call failed ' + err)
  }
}