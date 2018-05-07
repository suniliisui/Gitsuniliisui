import { Component, OnInit, Input } from '@angular/core'
import { WidgetsComponent } from '~/home/widgets/widgets.component'

@Component({
  selector: 'se-contracts-widget',
  templateUrl: './se-contracts-widget.component.html',
  styleUrls: ['./se-contracts-widget.component.scss']
})
export class SeContractsWidgetComponent implements OnInit {

  // values below should be coming from ajax call
  public contractsWidgetData =
  {
    label: 'NPS Scores YTD',
    values: [
      ["232", "wk"],
      ["2216", "mo"],
      ["2495", "yr"],
    ]
  }

  constructor(
  ) {
  }

  ngOnInit() {
  }

}
