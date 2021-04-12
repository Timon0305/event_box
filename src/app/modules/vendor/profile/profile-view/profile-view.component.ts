import { Component, OnInit, Input } from '@angular/core';
import { IBasicUser } from '@app/models/IUserDetails';

@Component({
  selector: 'app-profile-view',
  templateUrl: './profile-view.component.html',
})
export class ProfileViewComponent implements OnInit {
  @Input() profile: IBasicUser;
  constructor() { }

  ngOnInit() {
  }

}
