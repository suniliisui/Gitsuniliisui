import { Component, OnInit, Input, ViewChild } from '@angular/core'

import { HttpAccountsListService, HttpAccountsDetailsService } from '~/se-ui-services/accounts'
import { DatatableComponent } from '~/se-ui-components/datatable/datatable.component'

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts-list.component.html',
  styleUrls: ['./accounts-list.component.scss']
})
export class AccountsListComponent implements OnInit {
  public dropDownList = []
  public serviceUrlParams: Object = {
    startIndex: 0,
    maxResults: 20,
    searchKeys: 'svId,subAccountName',
    searchValue: '',
    searchOrder: 'asc',
  }

  public tableColumnData = [];
  public detailHeadersData = [];
  public dropDownAccountList = []
  public dropDownAccountLabel = 'My Accounts - Sales Team'
  private accountInContext: string
  private disableDetailBtn: boolean = true
  private modifiedData: Object = {};
  private accountId: string
  private selectedRowIndex: number

  @ViewChild(DatatableComponent) datatableComponent: DatatableComponent

  constructor(
    private accountService: HttpAccountsListService,
    private accountDetailService: HttpAccountsDetailsService
  ) {
  }

  ngOnInit() {
    this.tableColumnData = [{
      "property": "subAccountName",
      "headerName": "Company Name"
    }, {
      "property": "fullAddress",
      "headerName": "Address"
    }, {
      "property": "svId",
      "headerName": "SVID"
    }, {
      "property": "id",
      "headerName": "Sub - Account ID"
    }];
    this.detailHeadersData = [{ "description": "Customer Contact", "property": "primaryContactFullName" },
    { "description": "Email", "property": "primaryContactEmail" },
    { "description": "Contact Phone Number", "property": "primaryContactPhone" },
    { "description": "Account Phone Number", "property": "customerPhone" },
    { "description": "SVID", "property": "sVId" },
    { "description": "Sub-Account ID", "property": "sAARTAccountId" },
    { "description": "Segment", "property": "primaryOrganization" },
    { "description": "Sales Center", "property": "salesCenter" },
    { "description": "Sub-Segment", "property": "segment" },
    { "description": "Mobility Sub-Segment", "property": "mobilitySegment" },
    { "description": "Organization", "property": "organization" },
    { "description": "Single Site", "property": "singleSiteInd" },
    { "description": "HQ Region", "property": "region" },
    { "description": "SCVP", "property": "sCVPNAME" }]
    this.fetchAccountList();
    this.accountService.getDropDownFilterList().then(this.setDropdownFilterdata)
      .catch(this.notifyError)
  }

  fetchAccountList() {
    this.accountService.getAccountsList(this.serviceUrlParams).then(this.setAccountdata)
      .catch(this.notifyError)
  }

  setDropdownFilterdata = (dropDownListResponse) => {
    this.dropDownList = dropDownListResponse
    this.getDropDownList()
  }

  searchOnServer(terms: string) {
    this.serviceUrlParams['searchValue'] = encodeURIComponent(terms)
    this.fetchAccountList()
  }

  getDropDownList() {
    this.dropDownList.forEach((val) => {
      this.dropDownAccountList.push(val.label)
    })
  }

  actionSourceChange(newval) {
    this.dropDownAccountLabel = newval.value
  }

  handleRowSelected(e) {
    this.accountInContext = e.row.item.id
    if (e.event.target) {
      this.disableDetailBtn = !e.event.target.checked
    }
  }

  doServerSideSorting() {
    this.serviceUrlParams['searchOrder'] === 'asc' ? this.serviceUrlParams['searchOrder'] = 'dsc' : this.serviceUrlParams['searchOrder'] = 'asc'
    this.fetchAccountList()
  }

  setAccountdata = (accountsTableData) => {
    this.disableDetailBtn = true
    accountsTableData.forEach(function (val, i) {
      let zip = ''
      if (val.primaryZipCode.length > 5) {
        zip = val.primaryZipCode.slice(0, 5) + '-' + val.primaryZipCode.slice(5, val.primaryZipCode.length)
      } else {
        zip = val.primaryZipCode
      }
      accountsTableData[i].fullAddress = val.primaryAddress + ',' + ' ' + val.primaryCity + ',' + ' ' + val.primaryState + ',' + ' ' + zip
    })
    this.modifiedData = { 'columnData': this.tableColumnData, 'tableData': accountsTableData, 'detailHeaders': this.detailHeadersData }
    this.datatableComponent.sendData(this.modifiedData)
  }

  handleShowAccountDetails(e) {
    if (e.row.item) {
      this.accountId = e.row.item.id
      this.selectedRowIndex = e.row.index;
      this.accountDetailService.getAccountDetails(this.accountId).then(this.setAccountDetails)
        .catch(this.notifyError)
    }
  }

  notifyError = (err) => {
    console.error('Accounts-List - Service call failed ' + err)
  }

  setAccountDetails = (accountMiniDetails) => {
    accountMiniDetails['primaryContactFullName'] = accountMiniDetails.primaryContactFirstName + ' ' + accountMiniDetails.primaryContactLastName;
    this.modifiedData['tableData'][this.selectedRowIndex]['accountMiniDetails'] = accountMiniDetails;
  }
}