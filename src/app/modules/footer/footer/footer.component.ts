import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { PlannerSignupComponent } from '@app/modules/login-signup/planner-signup/planner-signup.component';
import { VendorSignupComponent } from '@app/modules/login-signup/vendor-signup/vendor-signup.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { Constants } from '@app/config/constant';
import { FormControl, Validators } from '@angular/forms';
import { RequestService } from '@app/core/http/request-service';
import { IApiSuccess } from '@app/models/IApiResponse';
import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { AlertService } from '@app/modules/alert-messages/alert.service';
import { Messages } from '@app/config/messages';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit, OnDestroy {
  currentYear;
  socialLinks = Constants.EVENT_BOX_SOCIAL_LINKS;
  destroy$ = new Subject();
  email: FormControl = new FormControl('', Validators.compose([Validators.email, Validators.required]));
  loader = false;
  hideTooltip = true;
  @ViewChild('newsletterInput', {static: true}) newsletterInputElm: ElementRef;
  constructor(
    readonly modalService: NgbModal, private readonly request: RequestService,
    private readonly router: Router, private alert: AlertService) { }

  ngOnInit() {
    this.currentYear = (new Date()).getFullYear();
  }


  plannerSignUp() {
    this.modalService.open(PlannerSignupComponent, { backdrop: 'static', keyboard: false, centered: true });
  }

  vendorSignUp() {
    this.modalService.open(VendorSignupComponent, { backdrop: 'static', keyboard: false, size: 'lg', centered: true });
  }

  subscribeNewsLetter() {
    this.loader = true;
    this.request.post<IApiSuccess>(Constants.ENDPOINTS.supportSubscribe, { email: this.email.value })
      .pipe(takeUntil(this.destroy$)).subscribe(res => {
        this.loader = false;
        this.email.setValue('');
        this.alert.showSuccess(Messages.SUCCESS.newsLetterSuccess);
      }, err => this.loader = false);
  }

  scrollToNewsLetter() {
    this.newsletterInputElm.nativeElement.scrollIntoView({behavior: 'smooth'});
    this.hideTooltip = false;
    this.newsletterInputElm.nativeElement.focus();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }


}
