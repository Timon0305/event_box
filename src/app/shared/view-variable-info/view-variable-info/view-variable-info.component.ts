import { Component, OnInit, Input } from '@angular/core';
import { Constants } from '@app/config/constant';

@Component({
  selector: 'app-view-variable-info',
  templateUrl: './view-variable-info.component.html',
  styleUrls: ['./view-variable-info.component.scss']
})
export class ViewVariableInfoComponent implements OnInit {
  @Input() quoteInfo;
  timeZoneMap = Constants.TIME_ZONE_DISPLAY_MAP;

  constructor() { }

  ngOnInit() {
  }

}
