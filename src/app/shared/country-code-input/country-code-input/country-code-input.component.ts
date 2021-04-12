import { Component, OnInit, Input } from '@angular/core';
import { CommonService } from '@app/core/services/common/common.service';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-country-code-input',
  templateUrl: './country-code-input.component.html',
})
export class CountryCodeInputComponent implements OnInit {
  countryCodesArr$;
  @Input() countryCode: FormControl;
  constructor(private readonly commonService: CommonService) { }

  ngOnInit() {
    this.countryCodesArr$ = this.commonService.getCountryCodes();
  }

  trackByFn(index: number) {
    return index;
  }

}
