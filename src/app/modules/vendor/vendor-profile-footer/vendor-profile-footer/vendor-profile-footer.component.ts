import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Constants } from '@app/config/constant';

@Component({
  selector: 'app-vendor-profile-footer',
  templateUrl: './vendor-profile-footer.component.html',
  styleUrls: ['./vendor-profile-footer.component.scss']
})
export class VendorProfileFooterComponent implements OnInit {
  public formValidity = false;
  public activeBank = false;
  @Output() updateProfileEvent = new EventEmitter();
  @Input() valid = false;
  constructor() { }

  ngOnInit() {}

  updateProfile() {
    this.updateProfileEvent.emit();
  }

}
