import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Constants } from '@app/config/constant';


@Component({
  selector: 'app-detail-type',
  templateUrl: './detail-type.component.html',
  styleUrls: ['./detail-type.component.scss']
})
export class DetailTypeComponent implements OnInit {
public bankActive = false;
  constructor(readonly activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    if (window.location.href.includes(Constants.profileType.bankDetail)) {
      this.bankActive = true;
    }
  }

}
