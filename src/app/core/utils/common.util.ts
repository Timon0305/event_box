import { Messages } from '@app/config/messages';
import { Constants } from '@app/config/constant';


import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import { FormGroup } from '@angular/forms';
import { SessionManagerService } from '../services/session/session-manager.service';
import { Injectable } from '@angular/core';
import * as momentTimezone from 'moment-timezone';
export const trackById = (index: number, element) => {
  return element.id;
};

export const checkCanEditEvent = (count) => {
  return !count.ACCEPTED_QUOTES && !count.REJECTED_QUOTES && !count.EXPIRED_QUOTES &&
    !count.PENDING_PAYMENT_QUOTES;
};

export const trackByObjectId = (index: number, element) => {
  return element && element._id;
};

export const getLogo = (user) => {
  return (user && user.company ? user.company.logo : user.imageUrl ? user.imageUrl : '');
};

export function fileUpload(fileInput, size, formatsAllowed?): Promise<string | boolean> {
  let fileTypeAllowed = Constants.FILE_TYPE_ALLOW;
  if (formatsAllowed) {
    fileTypeAllowed = formatsAllowed;
  }
  return new Promise((resolve, reject) => {
    const files: Array<File> = fileInput.files;
    for (const file of files) {
      if ((fileTypeAllowed).indexOf(file.type) < 0) {
        reject(Messages.validationMessage.invalidFileFormat);
        break;
      }
      if (file.size > size) {
        reject(Messages.ERROR.invalidFileSize);
        break;
      }
    }
    resolve(true);
  });
}

export const changeQueryParams = (params, activatedRoute, router) => {
  return router.navigate(
    [],
    {
      relativeTo: activatedRoute,
      queryParams: params,
      queryParamsHandling: 'merge'
    });
};

export function getProductListCount(productsList) {
  return typeof productsList.hits.total === 'number' ? productsList.hits.total : productsList.hits.total.value;
}

export function youTubeGetID(url) {
  let id = '';
  url = url.replace(/(>|<)/gi, '').split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/);
  if (url[Constants.YOU_TUBE_ID_INDEX]) {
    id = url[Constants.YOU_TUBE_ID_INDEX].split(/[^0-9a-z_\-]/i);
    id = id[0];
  } else {
    id = url;
  }
  return id;
}

export function getZeroAppend(value) {
  if (value <= Constants.MAX_SINGLE_DIGIT) {
    return `0${value}`.trim();
  }
  return `${value}`.trim();
}

export function checkDuplicateDate(formControl) {
  return formControl.deliveryStartDate.value &&
    (formControl.deliveryStartDate.value === formControl.setUpFromDate.value &&
      formControl.setUpToDate.value === formControl.deliveryEndDate.value
    );
}

export function compareDates(startDateKey, endDateKey, form: FormGroup) {
  if (form.controls[startDateKey].value && form.controls[endDateKey].value) {
    const startDate = moment(form.controls[startDateKey].value).format(Constants.API_DATE_FORMAT);
    const endDate = moment(form.controls[endDateKey].value).format(Constants.API_DATE_FORMAT);
    return startDate && endDate && startDate === endDate;
  }
  return null;
}

export function compareTime(startTimeKey, endTimeKey, form) {
  const startTime = moment(form.controls[startTimeKey].value, 'hh:mm A');
  const endTime = moment(form.controls[endTimeKey].value, 'hh:mm A');
  return startTime && endTime && endTime.isBefore(startTime);
}

export function isPlanner(role) {
  return role === Constants.Role.PLANNER;
}

export function isVendor(role) {
  return role === Constants.Role.VENDOR;
}

export function isAdmin(role) {
  return role === Constants.Role.ADMIN;
}

export function isPartner(role) {
  return role === Constants.Role.PARTNER;
}

export function sumArrayOfObjectkey(array, key) {
  if (key !== 'quantity') {
    return array.reduce((prev, next) => Number(prev) + Number(next[key]), 0);
  } else {
    return array.reduce((prev, next) => Number(prev) + Number(next.latestReply[key]), 0);
  }
}

export function getProductPublicDetailBreadcrumbs(breadCrumbArr, params) {
  Object.keys(params).forEach(key => {
    switch (key) {
      case (Constants.SEARCH_CONSTANTS.CATEGORY && !!params.category && params.category.hasOwnProperty('name')):
        breadCrumbArr[Constants.NUMBER.one] = {
          text: params.category.name,
          route: `/search?category=${params.category._id}&categoryName=${params.category.name}`
        };
        break;
      case (Constants.SEARCH_CONSTANTS.SUBCATEGORY && !!params.subCategory && params.subCategory.hasOwnProperty('name')):
        breadCrumbArr[Constants.NUMBER.two] = {
          text: params.subCategory.name,
          // tslint:disable-next-line: max-line-length
          _route: `/search?category=${params.category._id}&categoryName=${params.category.name}&subCategory=${params.subCategory._id}&subCategoryName=${params.subCategory.name}`,
          get route() {
            return this._route;
          },
          set route(value) {
            this._route = value;
          },
        };
        break;
      case Constants.SEARCH_CONSTANTS.DETAILPAGE:
        breadCrumbArr.push(breadCrumbArr, { text: params.name, route: `` });
        break;
      default:
    }
  });
  breadCrumbArr[Constants.NUMBER.zero] = { text: Constants.SEARCH_CONSTANTS.HOME, route: '/' };
  return breadCrumbArr;
}

export function isEventDetailPage(router) {
  return router.url.includes('event-detail') || router.url.includes('admin/events');
}

export function skipScrollTop(url) {
  let skipScroll;
  for (const urlStr of Constants.SKIP_SCROLL_TOP) {
    if (url.includes(urlStr)) {
      skipScroll = true;
      break;
    }
  }
  return skipScroll;
}

export function getDatetoISOFormat(formFieldObj, data) {

  Object.keys(formFieldObj).forEach(key => {
    if (data && data[key]) {
      if (key === 'dateTo') {
        data[key] = moment(data[key], Constants.DISPLAY_DATE_FILTER_FORMAT).endOf('day').toISOString();
      } else {
        data[key] = moment(data[key], Constants.DISPLAY_DATE_FILTER_FORMAT).toISOString();
      }
    }
  });
  return data;
}

export function showUIDateOFormat(formFieldObj, data, dateFormat) {
  Object.keys(formFieldObj).forEach(key => {
    if (data[key]) {
      data[key] = moment(data[key]).format(dateFormat);
    }
  });
  return data;
}

export function getFilterDateRange(filterType) {
  let dateRange;
  switch (filterType) {
    case Constants.API_DATE_FILTER_TYPE.month:
      dateRange = getMonthYearDateRange(filterType);
      break;
    case Constants.API_DATE_FILTER_TYPE.year:
      dateRange = getMonthYearDateRange(filterType);
      break;
    case Constants.API_DATE_FILTER_TYPE.quarter:
      dateRange = getCurrentQuarterDateRange();
      break;
    case Constants.API_DATE_FILTER_TYPE.all:
      dateRange = { dateFrom: null, dateTo: null };
  }
  return dateRange;
}

export function getTopFiveListingElements(data) {
  if (data && data.length > Constants.NUMBER.five) {
    return data.splice(0, Constants.NUMBER.five);
  } else {
    return data;
  }
}

function getMonthYearDateRange(filterType) {
  return {
    dateFrom: moment().startOf(filterType).format(Constants.DISPLAY_DATE_FILTER_FORMAT),
    dateTo: moment().endOf(filterType).format(Constants.DISPLAY_DATE_FILTER_FORMAT)
  };
}
export function copyAnyUrl(id, document) {
  const copyText = document.getElementById(`${id}`) as HTMLInputElement;
  copyText.select();
  copyText.setSelectionRange(0, 99999);
  document.execCommand('copy');
  return;
}

function getCurrentQuarterDateRange() {
  return {
    dateFrom: moment().quarter(moment().quarter()).startOf('quarter').format(Constants.DISPLAY_DATE_FILTER_FORMAT),
    dateTo: moment().quarter(moment().quarter()).endOf('quarter').format(Constants.DISPLAY_DATE_FILTER_FORMAT)
  };
}

export function compareMomentIsAfter(firstDate, SecondDate, compareOnArg) {
  return moment(firstDate).isAfter(moment(SecondDate), compareOnArg);
}

export function isSmallScreen() {
  return window.innerWidth < Constants.RESPONSIVE_WINDOW_MIN_WIDTH.INNERWIDTH;
}

export function preparePhoneFormat(phone, countryCode) {
  return phone ? (countryCode ? `${countryCode} ${phone}` : phone) : null;
}

export function getCountryCodeAndPhone(phoneNumber) {
  if (phoneNumber) {
    const phoneSplitArr = phoneNumber.split(' ');
    const phone = phoneSplitArr.length > 1 ? phoneSplitArr[1] : phoneSplitArr[0];
    const countryCode = phoneSplitArr.length > 1 ? phoneSplitArr[0] : Constants.DEFAULT_COUNTRY_CODE;
    return { phone, countryCode };
  }
  return { phone: null, countryCode: Constants.DEFAULT_COUNTRY_CODE };
}

export function isBetweenRange(date, range) {
  return moment(date).isBetween(moment(), moment().add(range, 'days'));
}

export function mapReplyToQuote(quote, replyId) {
  const mappedQuote = JSON.parse(JSON.stringify(quote));
  const index = mappedQuote.replies.findIndex(reply => reply._id === replyId);
  const replyObj = mappedQuote.replies[index];
  mappedQuote.latestReply = replyObj;
  mappedQuote.totalPrice = replyObj.totalAmount;
  mappedQuote.setQuoteSeries = `${quote.quoteId}${replyObj.series}`;
  return mappedQuote;
}

export function canCanceledOrder(orderDate) {
  return moment(orderDate).add(Constants.CANCELED_ORDER_PERIOD, 'hours').isAfter(moment(), 'seconds');
}


export function mapPartnerBankDetails(bankDetails) {
  const payload = {};
  Object.keys(bankDetails).forEach(key => {
    payload[Constants.MAP_PARTNER_BANK_FIELDS[key]] = bankDetails[key];
  });
  return payload;
}

export function mapApiToBankDetailForm(bankDetails) {
  const payload = {};
  Object.keys(Constants.MAP_PARTNER_BANK_FIELDS).forEach(key => {
    payload[key] = bankDetails[Constants.MAP_PARTNER_BANK_FIELDS[key]];
  });
  return payload;
}

function uncheckQuote(id, checkListData) {
  const index = checkListData.findIndex(checkedItemId => checkedItemId === id);
  if (index >= 0) {
    checkListData.splice(index, 1);
  }
}

export function toggleCheck({ event, id, checkList }) {
  const checkListData = checkList;
  if (event.target.checked) {
    checkListData.push(id);
  } else {
    uncheckQuote(id, checkListData);
  }
  return checkListData;
}

export function updateValuesForEventUI(form, formValue) {
  Object.keys(Constants.EVENT_DATE_VALIDITY).forEach(key => {
    if (formValue[key]) {
      form.controls[key].setValue(momentTimezone(formValue[key]).tz(formValue.eventTimezone).format(Constants.DATE_PICKER_CONFIG.format));
    }
  });
}

export function updateDatesForEventInIsoFormat(formaValue) {
  const offset = momentTimezone.tz(formaValue.eventTimezone).format('Z');
  Object.keys(Constants.EVENT_DATE_VALIDITY).forEach(key => {
    if (formaValue && formaValue[key]) {
      formaValue[key] = (moment(formaValue[key], Constants.DATE_PICKER_CONFIG.format)
        .utcOffset(offset, true)).toISOString();
    }
  });
  return formaValue;
}

export function modifyDatePickerMinByTimezone({ configObjKey, dayPickerConfig, timezone }) {
  configObjKey.forEach(key => {
    dayPickerConfig = {
      ...dayPickerConfig,
      [key]: {
        ...dayPickerConfig[key],
        min: momentTimezone().tz(timezone).format(Constants.DATE_PICKER_CONFIG.format),
        disableKeypress: false
      }
    };
  });
  return dayPickerConfig;
}

export function getYearList() {
  const currentYear = Number(new Date().getFullYear());
  const years: Array<number> = [];
  let startYear = Number(Constants.ACH_REPORT_START_YEAR);
  while (startYear <= currentYear) {
    years.push(startYear++);
  }
  return years;
}

export function getMonthList(year: number) {
  const monthList = JSON.parse(JSON.stringify(Constants.MONTH_SELECT_OPTIONS));
  const currentYear = Number(new Date().getFullYear());
  if (year === currentYear) {
    return monthList.splice(0, (monthList.findIndex(res => (Number(res.id) === Number(new Date().getMonth() + 1))) + 1));
  }
  return monthList;
}

@Injectable({
  providedIn: 'root'
})
export class CheckRoles {
  constructor(private readonly sessionService: SessionManagerService) {
  }

  isAdmin() {
    return this.sessionService.getRole() === Constants.Role.ADMIN;
  }

  isVendor() {
    return this.sessionService.getRole() === Constants.Role.VENDOR;
  }
}
