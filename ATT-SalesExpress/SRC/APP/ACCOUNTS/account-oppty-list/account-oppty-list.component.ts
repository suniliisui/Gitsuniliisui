import { Component, OnInit, Input, EventEmitter, Output, ContentChild, TemplateRef } from '@angular/core'

import { DataTableResource } from '~/se-ui-components/angular-2-data-table/src'
import { HttpOpportunityListService } from '~/se-ui-services/accounts'

@Component({
  selector: 'se-account-oppty-table',
  templateUrl: './account-oppty-list.component.html',
  styleUrls: ['./account-oppty-list.component.scss']
})
export class AccountOpptyListComponent implements OnInit {

  private opptyDetails = []
  //  @Input() listData
  @Input() noRecord
  @Output() searchOnServer = new EventEmitter()
  @Output() handleRowExpand = new EventEmitter()
  @Output() handleRowSelect = new EventEmitter()
  @Output() doServerSideSorting = new EventEmitter()

  @ContentChild('headingContext')
  headingContext: TemplateRef<any>

  private items = []
  private itemCount = 0
  private itemResource
  private searchValue: string

  constructor(
    private optyListService: HttpOpportunityListService
  ) { }

  ngOnInit(): void {
  }

  sendData(data) {
    this.itemResource = new DataTableResource(data)
    this.items = data
    this.itemResource.count().then(count => this.itemCount = count)
    this.bindIcons()
  }

  bindIcons() {
    setTimeout(function () {
      let chevronDownArray = document.querySelectorAll('.row-expand-button .glyphicon.glyphicon-triangle-right')
      let chevronUpArray = document.querySelectorAll('.row-expand-button .glyphicon.glyphicon-triangle-bottom')
      for (let i = 0; i < chevronDownArray.length; i++) {
        chevronDownArray[i].setAttribute('class', 'icon-arrow_down')
        chevronUpArray[i].setAttribute('class', 'icon-carrot_up')
        document.querySelectorAll('.select-column input')[i].setAttribute('class', 'input-assumpte')
      }
    }, 10)
  }

  reloadItems(params) {
    let dataRecords = this;
    if (dataRecords.itemResource) {
      dataRecords.itemResource.query(params).then(items => dataRecords.items = items)
    }
  }

  headerClicked(col, e) {
    if (e.target.getAttribute('ng-reflect-text-content') == 'Opportunity Name') {
      this.doServerSideSorting.emit()
    }
  }

  rowSelect(e) {
    this.handleRowSelect.emit(e)
  }

  rowExpand(e) {
    this.handleRowExpand.emit(e)
  }

  setOpptyDetails = (opptyDetailsData) => {
    this.opptyDetails = opptyDetailsData
  }

  search(terms: string) {
    this.searchValue = terms
    this.searchOnServer.emit(terms)
  }

  onEnter(searchValue: string) {
    this.searchValue = searchValue
    this.searchOnServer.emit(this.searchValue)
  }

  notifyError = (err) => {
    console.error('Opportunity Details - Service call failed ' + err)
  }

}