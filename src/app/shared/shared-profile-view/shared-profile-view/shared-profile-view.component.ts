import { Component, OnInit, Input } from '@angular/core';
import { IBasicUser } from '@app/models/IUserDetails';
import { Constants } from '@app/config/constant';
import { Router } from '@angular/router';
@Component({
  selector: 'app-shared-profile-view',
  templateUrl: './shared-profile-view.component.html',
  styleUrls: ['./shared-profile-view.component.scss']
})
export class SharedProfileViewComponent implements OnInit {
  @Input() profile: IBasicUser;
  planner = Constants.Role.PLANNER;
  constructor(readonly router: Router) { }
  ngOnInit() {
  }
  editProfile() {
    if (this.profile.role === Constants.Role.PLANNER) {
      this.router.navigate(['planner/edit-profile']);
    } else if (this.profile.role === Constants.Role.VENDOR) {
      this.router.navigate(['vendor/profile/edit-profile']);
    }
  }
}

