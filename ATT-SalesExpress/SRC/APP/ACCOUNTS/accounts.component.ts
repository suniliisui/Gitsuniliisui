import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'

@Component({
  selector: 'se-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.scss'],
})
export class AccountsPageComponent implements OnInit {
  public currentLink: string
  public parentLink: Object = ['Accounts', '/accounts']
  public isAccountListPage: boolean = true

  // values below should be coming from ajax call
  public menuList: Array<any> = [
    {
      name: 'Manage',
      url: this.currentLink,
      submenus: [
        ['Leads', '/coming-soon'],
        ['Qualification', '/coming-soon'],
        ['Solutions', '/coming-soon'],
        ['Support Requests', '/coming-soon'],
        ['Activities', '/coming-soon'],
        ['Files', '/coming-soon']
      ],
    },
    {
      name: 'Alerts',
      url: '/coming-soon',
      submenus: [
        /*['NPS', '/coming-soon'],
        ['Billing Inquiries', '/coming-soon'],
        ['Trouble Tickets', '/coming-soon']*/
      ],
    },
    {
      name: 'Communicate',
      url: '/coming-soon',
      submenus: [
        /*['Contacts', '/coming-soon'],
        ['Account Chat', '/coming-soon'],
        ['Agenda', '/coming-soon'],
        ['Account Team', '/coming-soon']*/
      ],
    },
    {
      name: 'Research',
      url: '/coming-soon',
      submenus: [
        /*['Revenue', '/coming-soon'],
        ['News', '/coming-soon'],
        ['Orders (status)', '/coming-soon'],
        ['Contracts', '/coming-soon'],
        ['Agreements', '/coming-soon'],
        ['FAN Profiles', '/coming-soon']*/
      ],
    }
  ]

  constructor(private _router: Router) {
  }

  ngOnInit() {
    this._router.events.subscribe(path => {
      this.currentLink = path.url
      if (path.url !== this.parentLink[1]) {
        this.isAccountListPage = false
      } else {
        this.isAccountListPage = true
      }
    })
  }
}