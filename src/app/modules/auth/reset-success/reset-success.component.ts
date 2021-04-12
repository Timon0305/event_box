import { Component, OnInit, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginSignupService } from '@app/modules/login-signup/services/login-signup.service';
import { LoaderService } from '@core/services/loader.service';
import { LoginComponent } from '@app/modules/login-signup/login/login.component';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-reset-success',
  templateUrl: './reset-success.component.html',
  styleUrls: ['./reset-success.component.scss'],
  providers: [LoginSignupService]
})
export class ResetSuccessComponent implements OnInit {
  @Input() public user;
  isAdminUser = false;
  constructor(
    readonly modalService: NgbModal,
    readonly loader: LoaderService,
    readonly loginSignupService: LoginSignupService,
    private readonly route: ActivatedRoute,
    private readonly router: Router
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe(queryParams => {
      this.isAdminUser = queryParams.adminUser === '1';
    });
  }

  signin() {
    this.modalService.dismissAll();
    if (this.isAdminUser) {
      this.router.navigate(['/admin/login']);
    } else {
      this.modalService.open(LoginComponent, { centered: true,  windowClass: 'login-full-modal' });
    }
  }
}
