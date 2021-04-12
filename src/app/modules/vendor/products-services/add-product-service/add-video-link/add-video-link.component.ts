import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ProductFormHelperService } from '../../services/product-form-helper.service';
import { Messages } from '@app/config/messages';

@Component({
  selector: 'app-add-video-link',
  templateUrl: './add-video-link.component.html',
  styleUrls: ['./add-video-link.component.scss'],
  providers: [ProductFormHelperService]
})
export class AddVideoLinkComponent implements OnInit {
  @Input() form: FormGroup;
  validationMsg = Messages.validationMessage;
  constructor(readonly formHelper: ProductFormHelperService, readonly fb: FormBuilder) { }

  ngOnInit() {
  }


  addVideoLink() {
    this.getFormArr().push(this.formHelper.getVideoControl());
  }

  getFormArr() {
    return this.form.get('videos') as FormArray;
  }

  removeVideoLink(i) {
    this.getFormArr().removeAt(i);
  }
}
