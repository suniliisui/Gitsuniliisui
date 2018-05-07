import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap'

import { Person, PersonService } from '~/se-ui-services/person'

@Component({
  selector: 'se-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent implements OnInit {

  public person: Person
  public actionValues: Array<string> = [
    'Solution',
    'Qualification',
    'Fiber Check',
    'Order Handoff Request'
  ]

  constructor(
    private router: Router,
    private personService: PersonService,
  ) {
  }

  ngOnInit() {
    this.personService.fetch()
      .then(this.updatePerson)
      .catch(this.notifyError)
  }

  updatePerson = person => {
    this.person = person
    //TODO Write a pipe to explode the string
    if (this.person.name) {
      if(this.person.name.split(' ').length>0){
          this.person.name = this.person.name.split(' ')[0];
      }
    }
  }

  notifyError = err => {
    // TODO use toast or whatever UI team will decide on
    console.log(err)
  }

  handleActionChange($event): void {
    //console.log(`Action changed: ${0}`, $event)
    this.router.navigate(['/coming-soon'])
  }

}
