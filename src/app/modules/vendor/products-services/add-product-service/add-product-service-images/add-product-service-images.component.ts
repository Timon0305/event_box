import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { FormGroup, FormArray } from '@angular/forms';
import { fileUpload } from '@app/core/utils/common.util';
import { Constants } from '@app/config/constant';
import { AlertService } from '@app/modules/alert-messages/alert.service';
import { ProductFormHelperService } from '../../services/product-form-helper.service';
import { ProductServiceApiService } from '../../services/product-service-api.service';
import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs/operators';
import { Messages } from '@app/config/messages';
import { environment } from '@environments/environment';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoaderService } from '@app/core/services/loader.service';

@Component({
  selector: 'app-add-product-service-images',
  templateUrl: './add-product-service-images.component.html',
  styleUrls: ['./add-product-service-images.component.scss'],
  providers: [ProductServiceApiService]
})
export class AddProductServiceImagesComponent implements OnInit, OnDestroy {
  @Input() form: FormGroup;
  @Input() imagesUrl: Array<string> = [];
  imageModal;
  readonly destroyed$ = new Subject();
  s3baseUrl = environment.s3BaseUrl;
  imageMaxLength = Constants.PRODUCT_FORM.maxNoOfImages;
  loading = false;
  constructor(
    private readonly loaderService: LoaderService,
    readonly productApiService: ProductServiceApiService,
    readonly alertService: AlertService, readonly formHelper: ProductFormHelperService,
    readonly modalService: NgbModal) { }

  ngOnInit() {
  }

  async uploadProductImage(input) {
    if ((Number(this.form.value.images.length) + Number(input.files.length)) <= this.imageMaxLength) {
      try {
        if (await fileUpload(input, Constants.PRODUCT_FORM.productImageSize)) {
          this.uploadFilesToServer(input.files);
        }
      } catch (error) {
        this.alertService.showError(error);
      }
    } else {
      this.alertService.showError(Messages.validationMessage.maxNoOfFilesAllowed);
    }

  }

  uploadFilesToServer(files) {
    this.loading = true;
    this.loaderService.startChildLoader('upload-loader');
    this.productApiService.uploadProductImages(files).pipe(takeUntil(this.destroyed$)).subscribe(res => {
      this.loaderService.stopChildLoader('upload-loader');
      this.loading = false;
      res.data.forEach(({ path }) => this.addImageControl(path));
      if (!this.form.value.defaultImage) {
        this.form.controls.defaultImage.setValue(res.data[0].path);
      }
    }, error => {
      this.loaderService.stopChildLoader('upload-loader');
      this.loading = false;
    });
  }

  delete(i) {
    const defaultDeleted = this.getFormArr().controls[i].value === this.form.value.defaultImage;
    if (defaultDeleted) {
      this.form.controls.defaultImage.setValue('');
    }
    this.pushValueInRemoveControl(this.getFormArr().controls[i].value);
    this.getFormArr().removeAt(i);
    if (defaultDeleted && this.form.value.images[0]) {
      this.form.controls.defaultImage.setValue(this.form.value.images[0]);
    }
  }

  addImageControl(controlValue = '') {
    this.getFormArr().controls.push(this.formHelper.getImageControl(controlValue));
  }

  getFormArr() {
    return this.form.get('images') as FormArray;
  }

  openModal(content, image) {
    this.imageModal = image.value;
    this.modalService.open(content, { size: 'lg', centered: true });


  }

  setDefault(event, item) {
    this.form.controls.defaultImage.setValue(item.value);
  }

  pushValueInRemoveControl(value) {
    const removeControl = this.form.get('removeImages') as FormArray;
    removeControl.push(this.formHelper.getImageControl(value));
  }

  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}
