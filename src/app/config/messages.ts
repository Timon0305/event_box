export class Messages {
  public static readonly SUCCESS = {
    login: 'Logged in successfully',
    subVendorRegisterationComplete: 'Your registration is completed.',
    requestCompleted: 'Your request completed successfully!',
    invitationSent: 'Invitation sent successfully.',
    supportSuccess: 'Support message sent successfully.',
    resendEmail: 'Email sent successfully.',
    bankDetailCreated: 'Bank details are added successfully.',
    productCreate: 'Product created successfully.',
    serviceCreate: 'Service created successfully.',
    accountDeleted: 'Card deleted successfully.',
    cardDetailCreated: 'Card details are added successfully.',
    tokenVerified: 'Your Email has been verified successfully!',
    productUpdate: 'Product updated successfully.',
    serviceUpdate: 'Service updated successfully.',
    emailSent: 'Email has been sent successfully.',
    quoteVarAdd: 'Custom Quote Information was successfully uploaded.',
    quoteReqSent: 'Quote request has been sent to vendor.',
    eventCreated: 'Event created successfully.',
    eventUpdated: 'Event updated successfully.',
    deleteSuccessQuoteFolder: 'Product/Service deleted successfully.',
    deleteSelectedQuoteFolder: 'Selected Products/Services deleted successfully.',
    quoteAccepted: 'Quote has been accepted.',
    requestsend: 'Quote request has been send to vendor.',
    vendorAccepted: 'Vendor accepted successfully.',
    membershipDetailsUpdated: 'Membership details updated successfully.',
    adminUserAdded: 'Admin user added successfully.',
    adminUserUpdated: 'Admin user updated successfully.',
    adminUserStatus: 'User status updated successfully.',
    adminUserDelete: 'User deleted successfully.',
    adminPlannerStatus: 'Planner status updated successfully.',
    adminVendorStatus: 'Vendor status updated successfully.',
    adminPromoCodeAdded: 'Promo code added successfully.',
    adminPromoCodeUpdated: 'Promo code updated successfully.',
    adminPromoCodeDelete: 'Promo code deleted successfully.',
    adminSubCategorySave: 'Sub-category saved successfully.',
    adminSubCategoryUpdated: 'Sub-category updated successfully.',
    adminCategoryUpdated: 'Category updated successfully.',
    adminSubCategoryDelete: 'Sub-category deleted successfully.',
    adminSubCategoryStatus: 'Sub-category status changed successfully.',
    adminvendorReject: 'Vendor deleted successfully.',
    unsubsribed: 'Unsubscribed successfully.',
    reviewSend: 'Review has been sent successfully.',
    exports: 'Export is under process, you will be notified after completion.',
    orderCanceled: 'Order canceled successfully.',
    companyVerified: 'Your company is verified by admin, please login to continue.',
    partnerDetailsAdded: 'Partner added successfully.',
    partnerDetailsUpdated: 'Partner basic details updated successfully.',
    commissionDetailsUpdated: 'Partner commission details updated successfully.',
    bankDetails: 'Partner bank details updated successfully.',
    associationChanged: 'Users association updated successfully.',
    unlinked: 'Users unlinked successfully.',
    bankRemoved: 'Bank account removed successfully.',
    newsLetterSuccess: 'Newsletter subscribed successfully.'
  };

  public static readonly ERROR = {
    emptyArray: 'is required',
    notFound: 'No results found',
    invalidRequestParameter: 'Invalid parameters, please check and try again.',
    resendInvite: 'An error occured while sending the invite, please try again.',
    update_preference_error: 'An error occured while updating your preferences, please try again.',
    emailAlreadyExists: 'This email ID is already in use.',
    unAuthorized: 'Your session has expired, please login to continue.',
    notAuthorized: 'You are not authorized to access this page.',
    notFoundApi: 'API end point not found.',
    internalServerError: 'An error occurred, please try refreshing your page.',
    offline: 'You are offline, please check your network and try again.',
    incompleteProfile: 'Your profile is not complete, please enter the mandatory fields.',
    name: 'Invalid name',
    sessionExpired: 'Session timed out!',
    uploadingError: 'There was some problem while uploading the file, please try again.',
    atleastOneWebAddress: 'At least one field is mandatory, Website address, Facebook address or Instagram handle.',
    invalidFileSize: 'File size can not exceed 10MB.',
    invalidEntityId: 'Invalid ID!',
    invalidUsernamePassword: 'Invalid username or password.',
    adminInactiveUser: 'Your account has been blocked by admin.',
    notFoundOrAllreadyUsed: 'Your password reset link is not valid, or expired.',
    wrongPassword: 'Your current password is not valid, please try again.',
    passwordChanged: 'Password changed successfully.',
    userNotExist: 'The email address that you provided is not registered with Event Box.',
    errorOccured: 'An error occured, please try again.',
    apiError: 'Invalid bank account details.',
    changeDefaultCard: 'Please make other account as default before delete this account.',
    expiredToken: 'tokenExpired.',
    emailNotRegisteredWithUs: 'The email address that you provided is not registered with Eventbox.',
    isRequired: ' is required',
    subVendorAlreadyActive: 'This sub vendor is alreday active.',
    tokenExpired: 'Token has been expired.',
    roleNavigationNotDefined: 'Navigation not defined for this role.',
    autoDetectLoc: 'Sorry, we could not detect your location, Please enable your location access.',
    acceptQuote: 'An error occured while accepting the quote, please try again.',
    rejectQuote: 'An error occured while rejecting the quote, please try again.',
    operationCannotBePerformedOnQuote: `Operation can not be performed on quote,
     either quote status has been changed or you are not allowed to perform action.`,
    unreachableServer: 'Something went wrong, please try again.',
    promoCodeNotFound: 'Invalid promo code.',
    notAssociatedWithPromo: 'None of the vendor is associated with entered promo code.',
    minimumCartThreshold: (amount) => {
      return `Minimum cart value must be $${Number(amount)} for applicable vendor.`;
    },
    promoAlreadyApplied: 'Promo code already applied for same vendor.',
    adminInvalidPromoCode: 'Promo code already exist.',
    vendorCompanyNotActive: 'Your company is inactive, please contact Event Box.',
    promocodeNoSpacesAllowed: 'Promo code can only contain alphanumeric characters.',
    orderCancelTimeExpires: 'Order can only be canceled up to 24 hours after purchase.',
    vendorCompanyNotVerified: 'Your company is not verified by admin yet.',
    vendorCompanyRejected: 'Your company is rejected by admin. Please contact support if you have any query.',
    promoAlreadyAplliedForAll: 'Promo code already applied to the applicable vendor.',
    bankAccountNotFoundForVendor: 'Bank Account not found.',
    quotesPendingRelatedToProduct: 'Quotes related to product are already pending.',
    categoryUsedInProduct: 'Category is used by product.',
    quoteCannotBeDeleted: 'Quote can only be deleted if expired or initiated.',
    productNotFound: 'Product not found.',
    locationUsedInProducts: 'Location is used by product.',
    cannotReplyOnQuote: 'Quote status has been changed, you can not reply to the quote.',
    invalidQuoteStatus: 'Quote status has been changed, operation can not be performed.',
    alreadyVerified: 'User already verified, please login to continue.',
    locationAlreadyExist: 'Location already exist.',
    zipCodeNotValid: 'Zip code is not valid',
    referralDoesNotExist: 'The referral that you provided is not registered with Event Box.',
    userNotVerified: 'The referral that you provided is not verified.',
    invalidReferral: 'The referral that you provided is not valid.',
    addPartnerCommissionDeatils: 'Please add partner commission details first.',
    eventAlreadyCompleted: 'Order can not be canceled, associated event has been completed.',
    websiteNotValid: 'Website url is not valid.'
  };

  public static readonly validationMessage = {
    emailRequired: 'Email is a required field',
    emailInvalid: 'Please enter a valid email.',
    password: 'Password is a required field',
    passwordMinlength: 'Password minimum length is 7 characters',
    passwordInvalid: 'Password format is invalid',
    passwordPatternInvalid: 'Password must contain at least one upper case letter and a number',
    ressetPasswordExpired: 'Your request to reset your password has expired or the link has already been used',
    emailUnverified: 'Your account is not verified',
    verifyEmail: 'Your request to verify your email has expired or the link has already been used',
    passwordNotMatch: 'Confirm password does not match with password field',
    userName: 'Name is a required field',
    zipcode: 'Invalid zipcode',
    phoneNumber: 'Invalid phone number',
    phoneNumberRequired: 'Phone number is a required field',
    stateRequired: 'State is a required field',
    zipcodeRequired: 'Zipcode is a required field',
    jobtittle: 'Job tittle is a required field',
    firstName: 'First name is a required field',
    lastName: 'Last name is a required field',
    facebookLink: 'Facebook link is invalid',
    genderRequired: 'Gender is a required field',
    required: ' is required.',
    prizeCannotBeZero: 'Price should be greater than zero.',
    invalidYoutubeUrl: 'Invalid youtube video url.',
    invalidFileFormat: 'File format not allowed.',
    maxNoOfFilesAllowed: 'Maximum 15 images can be uploaded.',
  };

  public static readonly ERROR_TYPES = {
    user_already_exist: Messages.ERROR.emailAlreadyExists,
    name: Messages.ERROR.name,
    EMPTY_ARRAY: Messages.ERROR.emptyArray,
    EMAIL_ALREADY_IN_USE: Messages.ERROR.emailAlreadyExists,
    PROMOCODE_NOT_FOUND_OR_EXPIRED: Messages.ERROR.promoCodeNotFound,
    NO_VENDOR_ASSOCIATED_WITH_PROMOCODE: Messages.ERROR.notAssociatedWithPromo,
    ALREADY_APPLIED_OTHER_PROMOCODE_FOR_SAME_VENDOR: Messages.ERROR.promoAlreadyApplied,
    WRONG_PASSWORD: Messages.ERROR.invalidUsernamePassword,
    INACTIVE_USER: Messages.ERROR.adminInactiveUser,
    NOT_VERIFIED_USER: Messages.validationMessage.emailUnverified,
    TITLE_ALREADY_IN_USE: Messages.ERROR.adminInvalidPromoCode,
    ERR_USER_DOES_NOT_EXIST: Messages.ERROR.userNotExist,
    ERR_PASSWORD_TOO_SHORT_MIN_5: Messages.ERROR.invalidUsernamePassword,
    NOT_ACTIVE_COMPANY: Messages.ERROR.vendorCompanyNotActive,
    ERR_NO_SPACES_ALLOWED: Messages.ERROR.promocodeNoSpacesAllowed,
    CANCEL_TIME_EXPIRED: Messages.ERROR.orderCancelTimeExpires,
    ALREADY_APPLIED_FOR_ALL_VENDORS: Messages.ERROR.promoAlreadyAplliedForAll,
    NOT_VERIFIED_COMPANY: Messages.ERROR.vendorCompanyNotVerified,
    BANK_ACCOUNT_NOT_FOUND: Messages.ERROR.bankAccountNotFoundForVendor,
    QUOTES_ARE_PENDING: Messages.ERROR.quotesPendingRelatedToProduct,
    CATEGORY_USED_IN_PRODUCTS: Messages.ERROR.categoryUsedInProduct,
    QUOTE_CANNOT_DELETE: Messages.ERROR.quoteCannotBeDeleted,
    LOCATION_USED_IN_PRODUCTS: Messages.ERROR.locationUsedInProducts,
    CANNOT_REPLY_ON_QUOTE: Messages.ERROR.cannotReplyOnQuote,
    COMPANY_REJECTED: Messages.ERROR.vendorCompanyRejected,
    INVALID_STATUS: Messages.ERROR.invalidQuoteStatus,
    ERR_NOT_FOUND_OR_ALREADY_VERIFIED: Messages.ERROR.alreadyVerified,
    LOCATION_ALREADY_EXIST: Messages.ERROR.locationAlreadyExist,
    ZIPCODE_IS_NOT_VALID: Messages.ERROR.zipCodeNotValid,
    ADD_PARTNER_COMMISSION_DETAILS_FIRST: Messages.ERROR.addPartnerCommissionDeatils,
    EVENT_COMPLETED: Messages.ERROR.eventAlreadyCompleted,
    NOT_A_VALID_URL: Messages.ERROR.websiteNotValid
  };

  public static readonly ALERTS = {
    ARE_YOU_SURE: 'Are your sure?'
  };

  public static readonly VARIABLE_INFO_ERROR_TYPES = {
    eventEndDate: {
      required: `Event End Date${Messages.ERROR.isRequired}`,
      mustBeAfterCurrentDate: 'Event End Date must be after Event Start Date'
    },
    promoCodeStartDate: {
      required: `Start Date${Messages.ERROR.isRequired}`,
      compare: `Start Date should occur before End Date`
    },
    promoCodeEndDate: {
      required: `End date${Messages.ERROR.isRequired}`
    },
    eventStartTime: {
      required: `Event Start Time${Messages.ERROR.isRequired}`,
      compare: `Event Start Time should occur before Event End Time`
    },
    eventEndTime: { required: `Event end time${Messages.ERROR.isRequired}` },
    eventStartDate: {
      required: `Event Start Date${Messages.ERROR.isRequired}`,
      compare: `Event Start Date should occur before End Date`,
    },
    startDate: {
      required: `Event Start Date${Messages.ERROR.isRequired}`,
      compare: `Event Start Date should occur before End Date`,
      invalid: 'Event Start Date is invalid'
    },
    endDate: { required: `Event End Date${Messages.ERROR.isRequired}` },
    startTime: {
      required: `Event Start Time${Messages.ERROR.isRequired}`,
      compare: `Event Start Time should occur before Event End Time`
    },
    endTime: { required: `Event End Time${Messages.ERROR.isRequired}` },
    deliveryStartDate: {
      required: `Delivery Date From${Messages.ERROR.isRequired}`,
      compare: `Delivery Date From should occur before Delivery Date To`
    },
    deliveryEndDate: {
      required: `Delivery Date To${Messages.ERROR.isRequired}`,
      mustBeAfterCurrentDate: 'Delivery Date To should occur after Delivery Date From'
    },
    deliveryStartTime: {
      required: `Delivery Time From${Messages.ERROR.isRequired}`,
      compare: `Delivery Time From should occur before Delivery Time To`
    },
    deliveryEndTime: { required: `Delivery Time From${Messages.ERROR.isRequired}` },
    setUpFromDate: {
      required: `Set Up Date From${Messages.ERROR.isRequired}`,
      compare: `Set Up Date From should occur before Set Up End Date To`
    },
    setUpToDate: {
      required: `Set Up Date To${Messages.ERROR.isRequired}`,
      mustBeAfterCurrentDate: 'Set Up Date To should occur after Set Up Time From'
    },
    setUpStartTime: {
      required: `Set Up Date From${Messages.ERROR.isRequired}`,
      compare: `Set Up Date From should occur before Set Up Time To`
    },
    setUpEndTime: { required: `Set Up Time To${Messages.ERROR.isRequired}` },
    breakDownStartDate: {
      required: `Breakdown Date From${Messages.ERROR.isRequired}`,
      compare: `Breakdown Date From should occur before Breakdown Date To`
    },
    breakDownEndDate: {
      required: `Breakdown Date To${Messages.ERROR.isRequired}`,
      mustBeAfterCurrentDate: 'Breakdown Date To should occur after Breakdown Time From'
    },
    breakDownStartTime: {
      required: `Breakdown Time From${Messages.ERROR.isRequired}`,
      compare: `Breakdown Time From should occur before Breakdown Time To`
    },
    breakDownEndTime: { required: `Breakdown Time To${Messages.ERROR.isRequired}` },
  };

  public static readonly MONTH_NAMES = {
    1: {
      shrtName: `Jan`,
      fullName: 'January'
    },
    2: {
      shrtName: `Feb`,
      fullName: 'February'
    },
    3: {
      shrtName: `Mar`,
      fullName: 'March'
    },
    4: {
      shrtName: `Apr`,
      fullName: 'April'
    },
    5: {
      shrtName: `May`,
      fullName: 'May'
    },
    6: {
      shrtName: `Jun`,
      fullName: 'June'
    },
    7: {
      shrtName: `Jul`,
      fullName: 'July'
    },
    8: {
      shrtName: `Aug`,
      fullName: 'August'
    },
    9: {
      shrtName: `Sept`,
      fullName: 'September'
    },
    10: {
      shrtName: `Oct`,
      fullName: 'October'
    },
    11: {
      shrtName: `Nov`,
      fullName: 'November'
    },
    12: {
      shrtName: `Dec`,
      fullName: 'December'
    },
  };

  public static readonly VENDOR_QUOTE_STATUS = {
    ACCEPTED_QUOTES: { status: `Accepted` },
    REJECTED_QUOTES: { status: `Rejected By Planner ` },
    ACCEPT_REJECT_QUOTES: { status: `Quote Sent` },
    EXPIRED_QUOTES: { status: `Expired` },
    DECLINED_QUOTES: { status: `Declined` },
    PENDING: { status: `Quote Sent` },
    REJECTED_BY_VENDOR: { status: 'Rejected By Vendor' },
    CANCELED_QUOTES: {status: 'Canceled By Vendor'}
  };

  public static readonly SUBSCRIPTION_TYPES = {
    1: { type: `Monthly` },
    3: { type: `Quaterly` },
    6: { type: `Half Yearly` },
    12: { type: `Yearly` },
  };
}
