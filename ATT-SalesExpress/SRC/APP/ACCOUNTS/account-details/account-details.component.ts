import { Component, OnInit, OnDestroy, Renderer, ViewChild, ElementRef } from '@angular/core'
import { Router, ActivatedRoute, Params } from '@angular/router'

import { HttpAccountsDetailsService, HttpOpportunityListService } from '~/se-ui-services/accounts'
import { AccountOpptyListComponent } from '../account-oppty-list'

@Component({
  selector: 'se-account-details',
  templateUrl: './account-details.component.html',
  styleUrls: ['./account-details.component.scss']
})
export class AccountDetailsComponent implements OnInit {
  @ViewChild('fileInput') fileInput: ElementRef

  public accountDetails = []
  public accountLogoDetails = []
  public opportunityList = []

  opptySalesStages: string[] = []
  opptySalesStagesLabel = "Any"

  accountId: string
  opptyId: string
  selectedRowIndex: number
  svId: string
  private sub: any
  private optylistParams: Object = {}

  imageSrc: string = null
  convrtedimage: string
  private updatedAccounntLogoDetails
  private updatedAccntLogoDetails: Object = {}

  private maxResults: number = 20
  private SALES_STAGE: string = 'ANY_STAGE'
  private searchKeys: string = 'opptyName'
  private searchValue: string = ''
  private startIndex: string = '0'
  private sortOrder: string = 'asc'
  private disableOpptyButton: boolean = true
  private noRecords: boolean = false

  @ViewChild(AccountOpptyListComponent) datatableComponent: AccountOpptyListComponent

  public accountsActionValues: Array<string> = [
    'Contact',
    'Opportunity',
    'Agenda',
    'Activity',
    'Support Request',
    'Qualification',
    'File'
  ]

  constructor(
    private router: Router,
    private accountDetailsService: HttpAccountsDetailsService,
    private route: ActivatedRoute,
    private optyListService: HttpOpportunityListService,
    private renderer: Renderer
  ) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.accountId = params['id'] // (+) converts string 'id' to a number
      this.accountDetailsService.getAccountDetails(this.accountId)
        .then(this.setAccountDetailsData)
        .catch(this.notifyError)

      this.buildOptyUrlParam()
      this.fetchOpportunityList()
    })

    setTimeout(() => {
      this.fetchAccountLogo()
      this.fetchOpptySalesStagesList()
    }, 1000)
  }

  handleActionChange($event): void {
    this.router.navigate(['/coming-soon'])
  }

  // TODO: create action for filter - new user story
  actionSourceChange(newval) {
    this.opptySalesStagesLabel = newval.value
  }

  buildOptyUrlParam(): void {
    this.optylistParams['accountId'] = this.accountId
    this.optylistParams['maxResults'] = this.maxResults
    this.optylistParams['salesStage'] = this.SALES_STAGE
    this.optylistParams['searchKeys'] = this.searchKeys
    this.optylistParams['searchValue'] = this.searchValue
    this.optylistParams['startIndex'] = this.startIndex
    this.optylistParams['sortOrder'] = this.sortOrder
  }

  setAccountDetailsData = (accountDetailsData) => {
    this.accountDetails = accountDetailsData
    this.svId = this.accountDetails['svid']
  }

  setOpportunityListData = (opportunityListData) => {
    this.opportunityList = opportunityListData
    if (this.opportunityList.length < 1) {
      this.noRecords = true
    }
    this.datatableComponent.sendData(this.opportunityList)
  }

  setOpptySalesStagesList = (opptySalesStagesList) => {
    this.opptySalesStages = Object.keys(opptySalesStagesList).map(function (key, index) {
      return opptySalesStagesList[key]
    })
  }

  // get OportunityList
  fetchOpportunityList() {
    this.disableOpptyButton = true
    this.opportunityList = []
    this.optyListService.getOpportunityList(this.optylistParams).then(this.setOpportunityListData)
      .catch(this.notifyError)
  }

  // get OportunitySalesStagesList
  fetchOpptySalesStagesList() {
    this.optyListService.getOpportunitySalesStages().then(this.setOpptySalesStagesList)
      .catch(this.notifyError)
  }

  // get Account Logo
  fetchAccountLogo() {
    this.accountDetailsService.getAccountLogo(this.svId)
      .then(this.showAccountLogo)
      .catch(this.fetchLogoError)
  }

  showAccountLogo = (showAccntLogoData) => {
    this.accountLogoDetails = showAccntLogoData
    if (this.accountLogoDetails) {
      this.imageSrc = this.accountLogoDetails['imageData']
    }
  }

  // upload Account Logo
  uploadAccountLogo = (details) => {
    this.accountDetailsService.updateAccountLogo(details)
      .then(this.editAccountLogo)
      .catch(this.notifyError)
  }

  editAccountLogo = (editAccntLogoData) => {
    this.updatedAccounntLogoDetails = editAccntLogoData

    //show updated logo
    if (this.updatedAccounntLogoDetails) {
      this.imageSrc = this.updatedAccntLogoDetails['imageData']
    } else {
      console.error('Account Logo Upload Failed...')
    }
  }

  // handle click of input file
  editClick() {
    let event = new MouseEvent('click', { bubbles: true })
    this.renderer.invokeElementMethod(
      this.fileInput.nativeElement, 'dispatchEvent', [event])
  }

  // listener for image upload
  changeListener($event): void {
    this.readThis($event.target)
  }

  // convert mage to base 64
  readThis(inputValue: any): void {
    var file: File = inputValue.files[0]
    var myReader: FileReader = new FileReader()

    myReader.onloadend = (e) => {
      this.convrtedimage = myReader.result

      this.updatedAccntLogoDetails['svId'] = this.svId
      this.updatedAccntLogoDetails['imageData'] = this.convrtedimage

      this.uploadAccountLogo(this.updatedAccntLogoDetails)
    }
    myReader.readAsDataURL(file)
  }

  notifyError = (err) => {
    console.error('Account Details - Service call failed:  ' + err)
  }

  fetchLogoError = (err) => {
    this.imageSrc = 'assets/images/icons/logo-att.png'
    console.error('Fetching Account Logo - Service call failed:  ' + err)
  }

  ngOnDestroy() {
    this.sub.unsubscribe()
  }

  handleShowOptyDetails(e) {
    if (e.row.item) {
      this.opptyId = e.row.item.id
      this.selectedRowIndex = e.row.index;
      this.optyListService.getOpportunityMiniDetails(this.opptyId)
        .then(this.setOpptyDetails)
        .catch(this.notifyError)
    }
  }

  setOpptyDetails = (optyMiniDetails) => {
    this.opportunityList[this.selectedRowIndex]['optyMiniDetails'] = optyMiniDetails;
  }

  handleRowSelected(e) {
    if (e.event.target) {
      this.disableOpptyButton = !e.event.target.checked
    }
  }

  searchOnServer(terms: string) {
//    if (terms.length > 2) { // start search only after 3 characters
      this.noRecords = false
      this.optylistParams['searchValue'] = encodeURIComponent(terms)
      this.fetchOpportunityList()
//    }
  }

  doServerSideSorting() {
    this.optylistParams['sortOrder'] === 'asc' ? this.optylistParams['sortOrder'] = 'dsc' : this.optylistParams['sortOrder'] = 'asc'
    this.fetchOpportunityList()
  }

}