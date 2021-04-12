import { Component, OnInit } from '@angular/core';
import { IBasicUser } from '@app/models/IUserDetails';
import { SessionManagerService } from '@app/core/services/session/session-manager.service';

@Component({
  selector: 'app-pl-profile-view',
  templateUrl: './pl-profile-view.component.html',
  styleUrls: ['./pl-profile-view.component.scss']
})
export class PlProfileViewComponent implements OnInit {
  profile: IBasicUser;
  constructor(readonly sessionService: SessionManagerService) { }
  profileDataObservable$;
  ngOnInit() {
    this.profileDataObservable$ = this.sessionService.getUserData();
  }

}
