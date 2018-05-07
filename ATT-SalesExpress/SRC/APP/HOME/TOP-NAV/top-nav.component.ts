import { Component, ViewChild, OnInit, ElementRef } from '@angular/core'
import { Router } from '@angular/router'
import { Person } from '~/se-ui-services/person/person'
import { PersonService } from '~/se-ui-services/person/person.service'
import navbarmodel from './nav-menubar'

@Component({
  selector: 'se-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.scss']
})
export class TopNavComponent implements OnInit {

  private person: Person
  private profileURL: string
  private isVisible: boolean = false
  private menubarmodel: any
  private userprofilemenu: any
  private currentSelectedMenu: any

  constructor(
    private router: Router,
    private personService: PersonService,
  ) {
  }

  ngOnInit() {
    this.menubarmodel = navbarmodel.navMenubarmodel
    this.userprofilemenu = navbarmodel.userProfileMenumodel
    this.personService.fetch()
      .then(this.updatePerson)
      .catch(this.notifyError)
    // console.log('on the init', this.router);
    this.router.events.subscribe(val => {
      // console.log('in the route change--', val);
      // console.log('in the init', this.menubarmodel);
      if (val.url === '/' || val.url === '/home') {
        this.inactiveAllMenu()
      }
    })
  }

  inactiveAllMenu(){
    this.menubarmodel.filter(menu => menu.active = false)
    this.menubarmodel.filter(menu => menu.active)
      .forEach(menu => menu.active = false)
    this.userprofilemenu.filter(userprofilemenu => userprofilemenu.active)
      this.userprofilemenu.active = false
  }

  hideSubmenu(menu) {
    this.inactiveAllMenu()
    this.isVisible = false
    if (this.currentSelectedMenu)
      this.currentSelectedMenu.active = false
    menu.active = true
    this.currentSelectedMenu = menu
  }

  showSubmenu() {
    this.isVisible = true
  }

  updatePerson = (person) => {
    this.person = person
    console.log(`Updated person`, this.person)
    if (this.person.pictureURL)
      this.profileURL = `url(${this.person.pictureURL})`
  }

  notifyError = (err) => {
    // TODO -> Show toast err
    console.error('Fetching person failed', err)
  }

}
