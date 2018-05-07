import { Component, Input, OnInit } from '@angular/core'
import { WidgetsComponent } from '~/home/widgets/widgets.component'
import { HttpLeadsService } from '~/se-ui-services/widgets/http.leads.service'

const ALL_LEADS = 'ALL LEADS'
const HOT_LEADS = 'HOT LEADS'

@Component({
  selector: 'se-leads-widget',
  templateUrl: './se-leads-widget.component.html',
  styleUrls: ['./se-leads-widget.component.scss']
})
export class SeLeadsWidgetComponent implements OnInit {

  private leadsWidget: {
    activeLeadInProgress?: number
    activeLeadNotStarted?: number
    activeLeadPromoted?: number
    activeLeadTotalCount?: number
    hotLeadInProgress?: number
    hotLeadNotStarted?: number
    hotLeadPromoted?: number
    hotLeadTotalCount?: number
  } = {
    // Useful for testing
    // activeLeadTotalCount: 10,
    // activeLeadNotStarted: 4,
    // activeLeadInProgress: 6,
    // activeLeadPromoted: 15,
    // hotLeadTotalCount: 2,
    // hotLeadNotStarted: 3,
    // hotLeadInProgress: 12,
    // hotLeadPromoted: 7,
  }

  private selectedLead: string = ALL_LEADS

  constructor(
    private leadsService: HttpLeadsService
  ) {
  }

  ngOnInit() {
    this.leadsService.getLeads()
      .then(this.getLeadsResponse)
      .catch(this.notifyError)
  }

  getLeadsResponse = (response) => {
    this.leadsWidget = response
  }

  notifyError = (err) => {
    console.error('Leads Widget Service call failed ' + err)
  }

  toggleSelectedLead = () => {
    if (this.selectedLead === ALL_LEADS) {
      this.selectedLead = HOT_LEADS
    } else {
      this.selectedLead = ALL_LEADS
    }
  }

  get isAllLeads() {
    return this.selectedLead === ALL_LEADS
  }

  get isHotLeads() {
    return this.selectedLead === HOT_LEADS
  }

  get label() {
		if (this.isAllLeads)
      return ALL_LEADS
		if (this.isHotLeads)
      return HOT_LEADS
  }

  get count(): number {
		if (this.isAllLeads)
      return this.leadsWidget.activeLeadTotalCount
		if (this.isHotLeads)
      return this.leadsWidget.hotLeadTotalCount
  }

  get notStarted(): number {
		if (this.isAllLeads)
      return this.leadsWidget.activeLeadNotStarted
		if (this.isHotLeads)
      return this.leadsWidget.hotLeadNotStarted
  }

  get inProgress(): number {
		if (this.isAllLeads)
      return this.leadsWidget.activeLeadInProgress
		if (this.isHotLeads)
      return this.leadsWidget.hotLeadInProgress
  }

  get promoted(): number {
		if (this.isAllLeads)
      return this.leadsWidget.activeLeadPromoted
		if (this.isHotLeads)
      return this.leadsWidget.hotLeadPromoted
  }

}
