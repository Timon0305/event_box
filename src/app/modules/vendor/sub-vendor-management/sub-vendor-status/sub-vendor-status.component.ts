import { Component, OnInit, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SubVendorManagementService } from '../services/sub-vendor-management.service';
import { LoaderService } from '@app/core/services/loader.service';
import { AlertService } from '@app/modules/alert-messages/alert.service';
import { Messages } from '@app/config/messages';

@Component({
  selector: 'app-sub-vendor-status',
  templateUrl: './sub-vendor-status.component.html',
  styleUrls: ['./sub-vendor-status.component.scss'],
  providers: [SubVendorManagementService]
})
export class SubVendorStatusComponent implements OnInit {

  @Input() public vendor;

  constructor(
    private readonly modalService: NgbModal,
    private readonly subVendorManagementService: SubVendorManagementService,
    private readonly loaderService: LoaderService,
    private readonly alert: AlertService
  ) { }

  ngOnInit() {
  }

  close() {
    this.modalService.dismissAll();
  }

  changeVendorStatus() {
    this.modalService.dismissAll();
    this.loaderService.start();
    this.subVendorManagementService.changeVendorStatus({id: this.vendor._id}).subscribe(
      res => {
        this.vendor.status = res.data.status;
        this.loaderService.stop();
        this.alert.showSuccess(Messages.SUCCESS.requestCompleted);
      },
      error => {
        this.loaderService.stop();
      }
    );
  }

}
