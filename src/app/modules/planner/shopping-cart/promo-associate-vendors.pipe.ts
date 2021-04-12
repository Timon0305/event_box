import { Pipe, PipeTransform } from '@angular/core';
import { Constants } from '@app/config/constant';

@Pipe({
  name: 'promoAssociateVendors'
})
export class PromoAssociateVendorsPipe implements PipeTransform {

  transform(value, ...args) {
    if (value && value.length) {
      const cartVendorsId = [...new Set(args[0].quotes.map(quote => quote.vendor.id))];
      return `(${value.filter(vendor => cartVendorsId.indexOf(vendor._id) >= 0)
        .map(({ name }) => name).join(', ')})`;
    } else {
      return `(${Constants.PROMO_CODE.ASSOCIATED_VENDORS_ALL})`;
    }
  }

}
