import { Component, OnInit } from '@angular/core';
import { SessionManagerService } from '@app/core/services/session/session-manager.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.scss']
})
export class AdminLoginComponent implements OnInit {

  constructor(
    private readonly sessionManager: SessionManagerService,
    private readonly router: Router
  ) { }

  ngOnInit() {
    if (this.sessionManager.isSession()) {
      this.router.navigateByUrl('/admin/login');
    }
  }

}
