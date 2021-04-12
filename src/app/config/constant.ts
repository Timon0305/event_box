import * as moment from 'moment';

export class Constants {
  public static readonly ENDPOINTS = {
    socialLogin: '/signup/social',
    nativeSignup: '/signup/vendor',
    plannerSignUp: '/signup/planner',
    uploadVendorLogo: '/upload/profile/image',
    login: '/auth/login',
    forgotPassword: '/auth/forgot-password',
    resetPassword: '/auth/reset-password',
    profileVendor: '/profile/vendor',
    profile: '/profile',
    locations: '/locations',
    subVendors: '/users',
    changeUserStatus: '/users/change-user-status',
    isUserExist: '/auth/isUserExist',
    createBankDetail: '/payment/bank',
    acceptTerms: '/profile/terms',
    skipBankDetails: '/profile/skip-bank-details',
    changePassword: '/profile/change-password',
    support: '/supports',
    socialSignup: '/signup/social',
    categories: '/common/categories',
    productImages: '/upload/product/images',
    products: '/products',
    plannerProfile: '/profile/planner',
    createCardDetails: '/payment/cards',
    verifyPlanner: '/auth/verify',
    archiveProduct: '/products/archive',
    productsSearch: '/products/search',
    resendEmail: '/auth/resendEmail',
    productsView: '/products/view',
    getEventTypes: '/common/event-types',
    skipPlannerProfile: '/profile/skip-profile-details',
    event: '/events',
    preQuotes: '/quotes/pre-quote',
    quotes: '/quotes',
    getStates: '/common/states',
    updateQuotesQuantity: '/quotes/update-quantity',
    updateQuotesStatus: '/quotes/update-status',
    pastEvents: '/events?type=past',
    getEventById: '/event',
    verifyToken: '/auth/verification',
    message: '/messages',
    sendMediaMessage: '/upload/message/media',
    sendQuote: '/quotes/replies',
    updateQuoteStatus: '/quotes/update-status',
    notification: '/notifications',
    headerCount: '/common/badges',
    cart: '/cart',
    promoCode: '/cart/promo-code',
    adminVendorManagement: '/admin/vendors',
    adminPromoCodes: '/admin/promocodes',
    favirotes: '/favirotes',
    adminUserManagement: '/admin/users',
    plannerManagement: '/admin/planners',
    adminCategoryManagement: '/admin/eventcategory',
    adminSubCategoryManagement: '/admin/eventsubcategory',
    payment: '/payment',
    orders: '/orders',
    adminVendors: '/admin/vendors',
    paySetUpFee: '/payment/fee-subscription',
    adminUploadImage: '/admin/upload/profile/image',
    deleteSubscription: '/payment/subscription',
    reviews: '/reviews',
    adminEvents: '/admin/events',
    adminProducts: '/admin/products',
    adminQuotes: '/admin/quotes',
    adminReports: '/admin/reports',
    adminQuoteDetail: '/admin/quotes',
    adminOrders: '/admin/orders',
    dashboard: '/reports/dashboard',
    homePage: '/common/homepage',
    updateFirebaseToken: '/profile/fcm',
    adminReviews: '/admin/reviews',
    exports: '/exports',
    adminDeleteReview: '/admin/reviews',
    paymentHistoryVendor: '/payment/transfers',
    paymentHistoryAdmin: '/admin/payment/transfers',
    dashboardData: '/admin/reports/dashboard',
    adminMessages: '/admin/messages',
    adminGraphPoints: '/admin/orders/ordersByDate',
    addPartner: '/admin/partners',
    updatePartnerCommission: '/admin/partners/commissionDetails',
    updatePartnerBank: '/admin/partners/bankDetails',
    getPartnersList: '/admin/partners',
    changeAssociation: '/admin/partners/update-association',
    partnerListForPopup: '/admin/partners/partners-list',
    partnerDashboard: '/reports/dashboard',
    partnerReferPlanners: '/users/refer/planners',
    partnerReferVendors: '/users/refer/vendors',
    partnerReferOrders: '/users/refer/orders',
    adminPayouts: '/admin/orders/payouts',
    vendorPayouts: '/orders/payouts',
    adminAchPayout: '/admin/payouts',
    supportSubscribe: '/supports/subscribe'
  };
  public static readonly TWENTYFOUR = 24;
  public static readonly BLANK_HYPHEN = '-';
  public static readonly CHART_TYPE = 'line';

  public static readonly BROWSER_COOKIES_KEY = ['token', 'usrId', 'role'];

  public static readonly ERROR_CODES = {
    BAD_REQUEST: 422,
    CONFLICT: 409,
    UNAUTHENTICATED: 403,
    UNATHOURIZED: 401,
    NO_CONTENT: 204,
    SUCCESS: 200,
    NOTFOUND: 404,
    INTERNAL_SERVER_ERROR: 500,
    ENTITY_NOT_FOUND: 204,
    UNREACHABLE: 0
  };

  public static readonly ACCOUNT_TYPE = {
    NATIVE: 'native',
    FACEBOOK: 'facebook',
    GOOGLE: 'google'
  };

  public static readonly messagesTimeout = 5000;

  public static readonly cssClasses = {
    sucess: 'success-msg',
    error: 'error-msg'
  };

  public static readonly DATE_PICKER_CONFIG = {
    format: 'MM-DD-YYYY hh:mm A',
    firstDayOfWeek: 'mo',
    min: moment().format('MM-DD-YYYY hh:mm A'),
    disableKeypress: true
  };

  public static readonly DATE_CONFIG = {
    ...Constants.DATE_PICKER_CONFIG,
    format: 'MM-DD-YYYY'
  };

  public static readonly Role = {
    PLANNER: 'planner',
    VENDOR: 'vendor',
    MEMBER: 'member',
    ADMIN: 'admin',
    SUB_ADMIN: 'sub_admin',
    PARTNER: 'partner'
  };

  public static readonly PAGES = {
    HOME: 'home',
    DETAIL: 'detail',
    SEARCH: 'search'
  };
  public static readonly EDIT_DUPLICATE = {
    duplicate: 'duplicate',
    edit: 'edit',
    startDate: 'startDate',
    endDate: 'endDate',
    name: 'name',
    label: 'label'

  };
  public static readonly password = {
    minLength: 7,
    maxLength: 15,
    pattern: /^(?=.{8,})(?=.*[a-z])(?=.*[A-Z])(?=.*[1-9])(?=.*[!@#$%^&+=]).*$/
  };
  public static passwordType = {
    oldPassword: 'password',
    newPassword: 'password',
    password: 'password',
    confirmPassword: 'password'
  };
  public static readonly COUNTRY = {
    US: 'us'
  };


  public static readonly signupForm = {
    maxLength: 50
  };

  public static readonly PRODUCT_FORM = {
    nameMaxLen: 100,
    descMaxLen: 800,
    productImageSize: 10485760,
    maxNoOfImages: 15
  };

  public static readonly EVENT_FORM = {
    nameMaxlength: 60,
    descMaxLength: 800,
    guestNumber: 9999999,
    zipCodeMaxLength: 5,
    address: 150
  };

  public static readonly QUOTE_REQUEST_FORM = {
    vendorNotesLength: 1000
  };

  public static readonly LAT_LONG_PRECISION = 6;

  public static readonly EVENT_LABEL = {
    startDate: 'startDate',
    endDate: 'endDate'
  };


  public static profileType = {
    vendorProfile: 'vendor-detail',
    bankDetail: 'bank-detail',
    editProfile: 'vendor/profile/edit-profile',
    plannerEdit: 'planner/edit-profile',
    editBankDetails: 'vendor/profile/bank-details'
  };
  public static fileSizes = {
    vendorProfileImgSize: 10485760,
  };

  public static readonly VENDOR_STATUS = {
    completeProfileDetails: 1,
    incompleteProfileDetails: 0,
    completeProfileAndBank: 2,
    REJECTED: 2
  };

  public static readonly INITIAL_SIGNUP_PAGES = ['/vendor/terms-of-service', '/vendor/complete-profile/vendor-detail',
    '/vendor/complete-profile/bank-detail', '/planner/complete-profile'];

  public static readonly DATE_FORMAT = 'MMM DD, YYYY, hh:mm A';
  public static readonly DISPLAY_DATE_FORMAT = 'MMM DD, YYYY';
  public static readonly NOTIFICATION_DATE_TIME = {
    dateGap: 1,
    monthGap: 3,
    hoursGap: 3,
    fullDateTime: 'MMM DD, YYYY, hh:mm A',
    onlyDateFormat: Constants.DISPLAY_DATE_FORMAT,
    yesterday: 'Yesterday',
    timeFormat: 'hh:mm A'
  };
  public static readonly DEFAULT_IMAGE = 'assets/images/no-image-table.png';
  public static readonly DELETE_POPUP = {
    text: `Are you sure you want to proceed?`,
    title: 'Delete Location',
    leftButton: 'Cancel',
    rightButton: 'Ok'
  };
  public static readonly DELETE_BANKDETAIL = {
    text: `Are you sure want to proceed?`,
    title: 'Delete Details',
    leftButton: 'Cancel',
    rightButton: 'Ok'
  };

  public static readonly DELETE_QUOTE = {
    text: `Are you sure want to proceed?`,
    title: 'Delete Quote',
    leftButton: 'Cancel',
    rightButton: 'Ok'
  };

  public static readonly DELETE_RATING = {
    text: `Are you sure want to proceed?`,
    title: 'Delete Rating',
    leftButton: 'Cancel',
    rightButton: 'Ok'
  };

  public static readonly DELETE_PRODUCT_FROM_QUOTE_LIST = {
    text: `Are you sure you want to delete this Product/Service from the list?`,
    title: 'Delete Product/Service',
    leftButton: 'Yes',
    rightButton: 'No',
    imageSrc: 'assets/images/delete.svg'
  };

  public static readonly DELETE_SELECTED_PRODUCT_FROM_QUOTE_LIST = {
    text: `Are you sure you want to delete selected Products/Services from the list?`,
    title: 'Delete Selected Products/Services',
    leftButton: 'Yes',
    rightButton: 'No',
    imageSrc: 'assets/images/delete.svg'
  };

  public static readonly UNFAVORITE_PRODUCT_SERVICE = {
    text: `Are you sure you want to unfavorite this Product/Service from the list?`,
    title: 'Unfavorite Product/Service',
    leftButton: 'Yes',
    rightButton: 'No',
    imageSrc: 'assets/images/unfavorite_icon.svg'
  };

  public static readonly CANCEL_ORDER_POPUP = {
    text: `Are you sure you want to cancel this order from the list?`,
    title: 'Cancel Order',
    leftButton: 'Yes',
    rightButton: 'No',
    imageSrc: 'assets/images/cancel-order.svg'
  };

  public static readonly DELETE_PROMO_CODE = {
    text: `Are you sure you want to delete this promo code from the list?`,
    title: 'Delete Promo Code',
    leftButton: 'Yes',
    rightButton: 'No',
    imageSrc: 'assets/images/delete.svg'
  };

  public static readonly REJECT_VENDOR = {
    text: `Are you sure you want to reject this vendor from the list?`,
    title: 'Reject vendor',
    leftButton: 'Yes',
    rightButton: 'No',
    imageSrc: 'assets/images/user-pending.svg'
  };

  public static readonly CANCEL_SUBSCRIPTION = {
    title: 'Cancel Subscription',
    text: `Are you sure you want to cancel your subscription, your login rights will be deprived after cancel subscription?`,
    leftButton: 'Yes',
    rightButton: 'No'
  };

  public static readonly DELETE_PARTNER = {
    text: `Are you sure you want to delete this partner?`,
    title: 'Delete Partner',
    leftButton: 'Yes',
    rightButton: 'No',
    imageSrc: 'assets/images/delete.svg'
  };

  public static readonly APPLICATION_ROUTES = {
    vendor: {
      profile: '/vendor/profile',
      editProfile: '/vendor/profile/edit-profile',
      bankDetails: '/vendor/profile/bank-details',
      productsServices: '/vendor/products-services',
      addProductServices: '/vendor/products-services/add',
      editProductServices: '/vendor/products-services/edit',
      messages: '/vendor/messages',
      notifications: '/vendor/notifications',
      addCreditCard: '/vendor/add-credit-card',
      productRatingNReviewRoute: '/vendor/products-services/product-rating-review/',
      paymentDetails: '/vendor/payment-details',
      paymentHistory: '/vendor/payment-history',

    },
    planner: {
      profile: '/planner/profile',
      messages: '/planner/messages',
      notifications: '/planner/notifications',
      shoppingCart: '/planner/shopping-cart',
      purchasedOrders: '/planner/orders/purchased',
      canceledOrders: '/planner/orders/canceled',
      checkout: '/planner/checkout',
      quotePendingpayment: '/planner/quotes/quote-pending-payment/list',
      finalPayment: '/planner/checkout/status',
      support: '/planner/planner-support',
      eventDetail: '/planner/event/event-detail',
      reltaiveQuoteRoute: {
        awaitingQuotes: '/awaiting-vendor-quotes/list'
      }
    },
    admin: {
      adminUserManagement: '/admin/user-management',
      adminPromoCodeManagement: '/admin/promo-code-management',
      adminPendingVendorManagement: '/admin/pending-vendors',
      adminCategoryManagement: '/admin/category-management',
      vendorEdit: '/admin/vendor-management/edit',
      vendorView: '/admin/vendor-management/view',
      vendorManagement: '/admin/vendor-management',
      reports: '/admin/reports',
      productsServicesList: '/admin/reports/products-services',
      awaitingVendorQuotes: '/admin/reports/quotes/awaiting-vendor-quotes',
      acceptRejectQuotes: '/admin/reports/quotes/accept-reject-quotes',
      expiredQuotes: '/admin/reports/quotes/expired-quotes',
      quotePendingPayment: '/admin/reports/quotes/quote-pending-quote',
      events: '/admin/events',
      productsServicesPurchased: '/admin/reports/products-services-purchased',
      orders: '/admin/reports/orders',
      notifications: '/admin/notifications',
      messages: '/admin/messages',
      adminVendorRating: '/admin/vendor-management/my-product-rating-review',
      adminVendorAllQuotes: '/all-quotes',
      paymentDetails: '/admin/payment-details',
      adminVendorAllOrders: '/all-orders',
      products: '/products-services',
      paymentHistory: '/admin/payment-history',
      achReport: '/admin/ach-report'
    }
  };

  public static readonly SORT_FIELDS = {
    productName: 'products.name',
    vendorName: 'vendors.name',
    categories: 'products.category',
    subCategory: 'products.subCategory',
    eventLabel: 'events.label',
    plannerName: 'planners.firstName',
    eventName: 'events.name',
    quoteRequestedDate: 'quoteRequestedDate',
    quantity: 'quantity',
    productPrice: 'products.price',
    quoteExpiration: 'quoteExpirationDate',
    plannerRequestedDate: 'plannerRequestedDate',
    vendorMostRecentDate: 'vendorMostRecentDate',
    priceQuote: 'priceQuote',
    latestPrice: 'latestReply.price',
    purchasedDate: 'createdAt',
    cancelledDate: 'cancelledAt',
    total: 'discount.finalAmount',
    vendorEmail: 'vendors.email',
    totalPaid: 'totalPrice',
    eventDate: 'events.startDate',
    eventTime: 'events.startTime',
    eventEndDate: 'events?.endDate',
    priceLowToHigh: 'lth',
    priceHighToLow: 'htl',
    mostPopular: 'popular',
    newArrivals: 'new',
    totalPrice: 'totalPrice',
    categoryName: 'category.name',
    subCategoryName: 'subCategory.name',
    status: 'status',
    totalGrossAmount: 'totalGrossAmount'
  };
  public static readonly ICON_TYPES = {
    highToLow: 'high-to-low.svg',
    aToZ: 'atoz.svg',
    zToA: 'ztoa.svg',
    lowToHigh: 'low-to-high.svg',
    promoType: 'type.svg',
    promoTypeRev: 'type-rev.svg'
  };

  public static readonly CUSTOM_DATE_PARSER = {
    yearPosition: 2,
    dayPosition: 2
  };

  public static readonly CARD_ADD_VALIDATIONS = {
    maxCvvLength: 9999
  };
  public static readonly EXP_CANCELLED_QUOTES = {
    EXPIRED_QUOTES: 'EXPIRED_QUOTES'
  };


  public static readonly SEARCH_BAR_URL_SPLIT_LIMIT = 2;

  public static readonly PHONE_SLICE_FORMAT = {
    middle: 3, high: 6
  };

  public static readonly RADIX_IN_PARSE_INT = 10;
  public static readonly PRODUCT_TYPE = 'product';
  public static readonly SERVICE_TYPE = 'service';

  public static readonly YOU_TUBE_URL_REGEX =
    /^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;

  public static readonly FILE_TYPE_ALLOW = ['image/jpg', 'image/png', 'image/jpeg'];

  public static readonly MESSAGE_MEDIA_ALLOWED = [...Constants.FILE_TYPE_ALLOW, 'application/pdf'];

  public static readonly DISTANCE_RANGE_MILES = [{
    id: 25,
    text: 'Within 25 Miles'
  }, {
    id: 50, text: 'Within 50 Miles'
  }, {
    id: 75,
    text: 'Within 75 Miles'
  },
  {
    id: 125,
    text: 'Within 125 Miles'
  }];
  public static readonly MONTHS_NAME = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August',
    'September', 'October', 'November', 'December'];
  public static readonly QUATER_MONTHS_NAME = ['January', 'February', 'March'];
  public static readonly LINE_CHART_COLORS = [
    {
      backgroundColor: 'rgba(253,114,144,0.2)',
      borderColor: 'rgba(253,114,144,1)',
      pointBackgroundColor: 'rgba(253,114,144,1)',
      pointBorderColor: '#FD7290',
      pointHoverBackgroundColor: '#FD7290',
      pointHoverBorderColor: 'rgba(253,114,144,1)'
    }
  ];
  public static readonly STATIC_TOOLTIP = `Total Gross: 0
                                           Total Orders: 0
                                           Total Net: 0`;
  public static readonly SEARCH_BY = [{
    id: 'localVendor',
    text: 'Local Vendor',
    value: 'false'
  }, {
    id: 'willTravel',
    text: 'Will Travel',
    value: 'true'
  }, {
    id: 'both',
    text: 'Both',
    value: ''
  }];
  public static readonly SET_SEARCH_BY = Constants.SEARCH_BY[2];
  public static readonly SET_RADIUS = { radius: Constants.DISTANCE_RANGE_MILES[3].id };
  public static readonly RATING_FILTER = [{
    id: '5',

  }, {
    id: '4'
  }, {
    id: '3'
  }, {
    id: '2',
  }, {
    id: '1'
  }];

  public static readonly NEW_ARRIVAL = 6;
  public static readonly KEY_CODE = {
    delete: 46,
    backSpace: 8,
    enter: 13
  };
  public static readonly LOCATION_KEY = {
    state: 'state',
    city: 'city',
    zipcode: 'zipcode',
    latitude: 'latitude',
    longitude: 'longitude',
    address: 'address',
    landmark: 'landmark'
  };
  public static readonly QUOTE_UPDATE_STATUS = {
    ACCEPTED_QUOTES: 'ACCEPTED_QUOTES',
    REJECTED_QUOTES: 'REJECTED_QUOTES',
    CANCELED_QUOTES: 'CANCELED_QUOTES',
    PENDING: 'PENDING',
    EXPIRED_QUOTES: 'EXPIRED_QUOTES'
  };

  public static readonly QUOTE_STATUS_DISPLAY = {
    ACCEPTED_QUOTES: 'Accepted',
    PURCHASED: 'PURCHASED',
    CANCELLED: 'Canceled'
  };

  public static readonly DEFAULT_SORTING_PARAMS = {
    ACCEPT_REJECT_AND_AWAITING_VENDOR_QUOTES: { order: 1, sort: 'quoteExpirationDate' },
    REJECTED_CANCELED_EXPIRED_REJECTED: { order: -1, sort: 'updatedAt' },
    ACCEPTED_QUOTES: { order: 1, sort: 'events.startdate' },
    NEW_ORDERS: { type: 'NEW_ORDERS' },
    DAY_OUT: { type: 'DAY_OUR_ORDERS' },
    AWAITING_QUOTES_ACCEPTANCE: { type: 'ACCEPT_REJECT_QUOTES', order: 1, sort: 'quoteExpirationDate' },
    FULFILLED: { type: 'FULFILLED_ORDERS' }
  };

  public static readonly CANCEL_REJECT_TITLE_KEY = {
    REJECTED_QUOTES: 'Reject Quote',
    CANCELED_QUOTES: 'Cancel Quote',
    REJECTED_QUOTES_Key: 'plannerNotes',
    CANCELED_QUOTES_KEY: 'vendorNotes',
  };
  public static readonly MONTH = 1;
  public static readonly GROUP_BY_MONTH = 'MONTH';
  public static readonly DEFAULT_PAGE = 1;

  public static readonly VALIDATE_NUMBER = /^\d+$/;

  public static readonly ORDER = { ascending: 1, descending: -1 };
  public static readonly PRODUCT_SORT_FIELDS = {
    name: 'name', createdAt: 'createdAt', price: 'price'
  };
  public static readonly EVENT_FIELD = {
    date: 'startDate',
  };
  public static readonly PRODUCT_LIST_SORT_BY =
    [{
      text: 'Product/Service Name',
      value: {
        order: Constants.ORDER.ascending,
        sort: Constants.PRODUCT_SORT_FIELDS.name,
      },
      id: 'nameAscending',
      iconName: Constants.ICON_TYPES.aToZ,
    }, {
      text: 'Product/Service Name',
      value: {
        order: Constants.ORDER.descending,
        sort: Constants.PRODUCT_SORT_FIELDS.name
      },
      id: 'nameDescending',
      iconName: Constants.ICON_TYPES.zToA,

    },
    {
      text: 'Category',
      value: {
        order: Constants.ORDER.ascending,
        sort: Constants.SORT_FIELDS.categoryName
      },
      id: 'categoryLowToHigh',
      iconName: Constants.ICON_TYPES.aToZ,
    },
    {
      text: 'Category',
      value: {
        order: Constants.ORDER.descending,
        sort: Constants.SORT_FIELDS.categoryName
      },
      id: 'categoryHighToLow',
      iconName: Constants.ICON_TYPES.zToA,
    },
    {
      text: 'Sub Category',
      value: {
        order: Constants.ORDER.ascending,
        sort: Constants.SORT_FIELDS.subCategoryName
      },
      id: 'subCategoryLowToHigh',
      iconName: Constants.ICON_TYPES.aToZ,
    },
    {
      text: 'Sub Category',
      value: {
        order: Constants.ORDER.descending,
        sort: Constants.SORT_FIELDS.subCategoryName
      },
      id: 'subCategoryHighToLow',
      iconName: Constants.ICON_TYPES.zToA,
    },
    {
      text: 'Starting Price',
      value: {
        order: Constants.ORDER.ascending,
        sort: Constants.PRODUCT_SORT_FIELDS.price
      },
      id: 'priceLowToHigh',
      iconName: Constants.ICON_TYPES.lowToHigh,
    },
    {
      text: 'Starting Price',
      value: {
        order: Constants.ORDER.descending,
        sort: Constants.PRODUCT_SORT_FIELDS.price
      },
      id: 'priceHighToLow',
      iconName: Constants.ICON_TYPES.highToLow,
    },
    {
      text: 'Date Added',
      value: {
        order: Constants.ORDER.ascending,
        sort: Constants.PRODUCT_SORT_FIELDS.createdAt,
      },
      id: 'dateAddedAscending',
      iconName: Constants.ICON_TYPES.lowToHigh,
    }, {
      text: 'Date Added',
      value: {
        order: Constants.ORDER.descending,
        sort: Constants.PRODUCT_SORT_FIELDS.createdAt
      },
      id: 'dateAddedDescending',
      iconName: Constants.ICON_TYPES.highToLow,
    }
    ];

  public static readonly PRODUCT_SERVICE_LIST_SORT_BY =
    [{
      text: 'Name',
      value: {
        order: Constants.ORDER.ascending,
        sort: Constants.PRODUCT_SORT_FIELDS.name,
      },
      id: 'nameAscending',
      iconName: Constants.ICON_TYPES.aToZ,
    }, {
      text: 'Name',
      value: {
        order: Constants.ORDER.descending,
        sort: Constants.PRODUCT_SORT_FIELDS.name
      },
      id: 'nameDescending',
      iconName: Constants.ICON_TYPES.zToA,

    },
    {
      text: 'Last Login',
      value: {
        order: Constants.ORDER.ascending,
        sort: Constants.PRODUCT_SORT_FIELDS.createdAt
      },
      id: 'createdAtAscending',
      iconName: Constants.ICON_TYPES.lowToHigh,
    },
    {
      text: 'Created At',
      value: {
        order: Constants.ORDER.descending,
        sort: Constants.PRODUCT_SORT_FIELDS.createdAt
      },
      id: 'createdAtDescending',
      iconName: Constants.ICON_TYPES.highToLow,
    },
    {
      text: 'Price',
      value: {
        order: Constants.ORDER.ascending,
        sort: Constants.PRODUCT_SORT_FIELDS.price
      },
      id: 'priceLowToHigh',
      iconName: Constants.ICON_TYPES.lowToHigh,
    },
    {
      text: 'Price',
      value: {
        order: Constants.ORDER.descending,
        sort: Constants.PRODUCT_SORT_FIELDS.price
      },
      id: 'priceHighToLow',
      iconName: Constants.ICON_TYPES.highToLow,
    }];




  public static readonly ADMIN_PRODUCT_LIST_SORT_BY = [
    ...Constants.PRODUCT_LIST_SORT_BY,
    {
      text: 'Vendor',
      value: {
        order: Constants.ORDER.ascending,
        sort: 'company.name'
      },
      id: 'vendorAscending',
      iconName: Constants.ICON_TYPES.aToZ,
    }, {
      text: 'Vendor',
      value: {
        order: Constants.ORDER.descending,
        sort: 'company.name'
      },
      id: 'vendorDescending',
      iconName: Constants.ICON_TYPES.zToA,

    }
  ];

  // event sort filter
  public static readonly EVENT_SORTBY_FIELDS =
    [{
      text: 'Event Date',
      value: {
        order: Constants.ORDER.ascending,
        sort: Constants.EVENT_FIELD.date,
      },
      id: 'dateAscending',
      iconName: Constants.ICON_TYPES.lowToHigh,
    }, {
      text: 'Event Date',
      value: {
        order: Constants.ORDER.descending,
        sort: Constants.EVENT_FIELD.date
      },
      id: 'dateDescending',
      iconName: Constants.ICON_TYPES.highToLow,
    },
    {
      text: 'Event Label',
      value: {
        order: Constants.ORDER.ascending,
        sort: 'label',
      },
      id: 'labelAscending',
      iconName: Constants.ICON_TYPES.aToZ,
    }, {
      text: 'Event Label',
      value: {
        order: Constants.ORDER.descending,
        sort: 'label'
      },
      id: 'labelDescending',
      iconName: Constants.ICON_TYPES.zToA,
    },
    {
      text: 'Awaiting vendor quotes',
      value: {
        order: Constants.ORDER.ascending,
        sort: 'quotesCount.AWAITING_VENDOR_QUOTES',
      },
      id: 'awaitingQuotesAscending',
      iconName: Constants.ICON_TYPES.lowToHigh,
    }, {
      text: 'Awaiting vendor quotes',
      value: {
        order: Constants.ORDER.descending,
        sort: 'quotesCount.AWAITING_VENDOR_QUOTES'
      },
      id: 'awaitingQuotesDescending',
      iconName: Constants.ICON_TYPES.highToLow,
    },
    {
      text: 'Accept/Reject quotes',
      value: {
        order: Constants.ORDER.ascending,
        sort: 'quotesCount.ACCEPT_REJECT_QUOTES',
      },
      id: 'acceptRejectQuotesAsc',
      iconName: Constants.ICON_TYPES.lowToHigh,
    }, {
      text: 'Accept/Reject quotes',
      value: {
        order: Constants.ORDER.descending,
        sort: 'quotesCount.ACCEPT_REJECT_QUOTES'
      },
      id: 'acceptRejectQuotesDsc',
      iconName: Constants.ICON_TYPES.highToLow,
    },
    {
      text: 'Quotes pending payment',
      value: {
        order: Constants.ORDER.ascending,
        sort: 'quotesCount.ACCEPTED_QUOTES',
      },
      id: 'pendingPaymentQuotesAsc',
      iconName: Constants.ICON_TYPES.lowToHigh,
    }, {
      text: 'Quotes pending payment',
      value: {
        order: Constants.ORDER.descending,
        sort: 'quotesCount.ACCEPTED_QUOTES'
      },
      id: 'pendingPaymentQuotesDsc',
      iconName: Constants.ICON_TYPES.highToLow,
    },
    {
      text: '# Of Products purchased',
      value: {
        order: Constants.ORDER.ascending,
        sort: 'productsPurchased',
      },
      id: 'ProductPurchasedAsc',
      iconName: Constants.ICON_TYPES.lowToHigh,
    }, {
      text: '# Of Products purchased',
      value: {
        order: Constants.ORDER.descending,
        sort: 'productsPurchased'
      },
      id: 'ProductPurchasedDsc',
      iconName: Constants.ICON_TYPES.highToLow,
    },


    {
      text: 'Expired quotes',
      value: {
        order: Constants.ORDER.ascending,
        sort: 'quotesCount.EXPIRED_QUOTES',
      },
      id: 'expiredQuotesAsc',
      iconName: Constants.ICON_TYPES.lowToHigh,
    }, {
      text: 'Expired quotes',
      value: {
        order: Constants.ORDER.descending,
        sort: 'quotesCount.EXPIRED_QUOTES'
      },
      id: 'expiredQuotesDsc',
      iconName: Constants.ICON_TYPES.highToLow,
    },
    {
      text: 'Rejected Quotes',
      value: {
        order: Constants.ORDER.ascending,
        sort: 'quotesCount.REJECTED_QUOTES',
      },
      id: 'rejectedQuotesAsc',
      iconName: Constants.ICON_TYPES.lowToHigh,
    }, {
      text: 'Rejected Quotes',
      value: {
        order: Constants.ORDER.descending,
        sort: 'quotesCount.REJECTED_QUOTES'
      },
      id: 'rejectedQuotesDsc',
      iconName: Constants.ICON_TYPES.highToLow,
    },
    {
      text: 'Amount Spent',
      value: {
        order: Constants.ORDER.ascending,
        sort: 'amountSpent',
      },
      id: 'amountSpentAsc',
      iconName: Constants.ICON_TYPES.lowToHigh,
    }, {
      text: 'Amount Spent',
      value: {
        order: Constants.ORDER.descending,
        sort: 'amountSpent'
      },
      id: 'amountSpentDsc',
      iconName: Constants.ICON_TYPES.highToLow,
    }];




  public static readonly PAST_EVENT_SORTBY_FIELDS =
    [{
      text: 'Event Label',
      value: {
        order: Constants.ORDER.ascending,
        sort: 'label',
      },
      id: 'labelAscending',
      iconName: Constants.ICON_TYPES.aToZ,
    }, {
      text: 'Event Label',
      value: {
        order: Constants.ORDER.descending,
        sort: 'label'
      },
      id: 'labelDescending',
      iconName: Constants.ICON_TYPES.zToA,
    },
    {
      text: 'Event Date',
      value: {
        order: Constants.ORDER.ascending,
        sort: Constants.EVENT_FIELD.date,
      },
      id: 'dateAscending',
      iconName: Constants.ICON_TYPES.lowToHigh,
    }, {
      text: 'Event Date',
      value: {
        order: Constants.ORDER.descending,
        sort: Constants.EVENT_FIELD.date
      },
      id: 'dateDescending',
      iconName: Constants.ICON_TYPES.highToLow,
    },
    {
      text: '# Of Products Purchased',
      value: {
        order: Constants.ORDER.ascending,
        sort: 'productsPurchased',
      },
      id: 'productPurchasedAscending',
      iconName: Constants.ICON_TYPES.lowToHigh,
    }, {
      text: '# Of Products Purchased',
      value: {
        order: Constants.ORDER.descending,
        sort: 'productsPurchased'
      },
      id: 'productPurchasedDescending',
      iconName: Constants.ICON_TYPES.highToLow,
    },
    {
      text: 'Accepted quotes',
      value: {
        order: Constants.ORDER.ascending,
        sort: 'quotesCount.ACCEPTED_QUOTES',
      },
      id: 'acceptQuotesAsc',
      iconName: Constants.ICON_TYPES.lowToHigh,
    }, {
      text: 'Accepted quotes',
      value: {
        order: Constants.ORDER.descending,
        sort: 'quotesCount.ACCEPTED_QUOTES'
      },
      id: 'acceptQuotesDsc',
      iconName: Constants.ICON_TYPES.highToLow,
    },
    {
      text: 'Rejected quotes',
      value: {
        order: Constants.ORDER.ascending,
        sort: 'quotesCount.REJECTED_QUOTES',
      },
      id: 'rejectedQuotesAscending',
      iconName: Constants.ICON_TYPES.lowToHigh,
    }, {
      text: 'Rejected quotes',
      value: {
        order: Constants.ORDER.descending,
        sort: 'quotesCount.REJECTED_QUOTES'
      },
      id: 'rejectedQuotesDescending',
      iconName: Constants.ICON_TYPES.highToLow,
    },
    {
      text: 'Expired quotes',
      value: {
        order: Constants.ORDER.ascending,
        sort: 'quotesCount.EXPIRED_QUOTES',
      },
      id: 'expiredQuotesAsc',
      iconName: Constants.ICON_TYPES.lowToHigh,
    }, {
      text: 'Expired quotes',
      value: {
        order: Constants.ORDER.descending,
        sort: 'quotesCount.EXPIRED_QUOTES'
      },
      id: 'expiredQuotesDsc',
      iconName: Constants.ICON_TYPES.highToLow,
    },
    {
      text: 'Canceled Quotes',
      value: {
        order: Constants.ORDER.ascending,
        sort: 'quotesCount.CANCELED_QUOTES',
      },
      id: 'canceledQuotesAsc',
      iconName: Constants.ICON_TYPES.lowToHigh,
    }, {
      text: 'Canceled Quotes',
      value: {
        order: Constants.ORDER.descending,
        sort: 'quotesCount.CANCELED_QUOTES'
      },
      id: 'canceledQuotesDsc',
      iconName: Constants.ICON_TYPES.highToLow,
    },
    {
      text: 'Amount Spent',
      value: {
        order: Constants.ORDER.ascending,
        sort: 'amountSpent',
      },
      id: 'amountSpentAsc',
      iconName: Constants.ICON_TYPES.lowToHigh,
    }, {
      text: 'Amount Spent',
      value: {
        order: Constants.ORDER.descending,
        sort: 'amountSpent'
      },
      id: 'amountSpentDsc',
      iconName: Constants.ICON_TYPES.highToLow,
    }];

  public static readonly PRODUCT_STATUS_FILTER = [
    {
      text: 'All',
      value: null
    },
    {
      text: 'Archive',
      value: true
    },
    {
      text: 'Activate',
      value: false
    }
  ];

  public static readonly SCROLL_CHAT_TIMEOUT = 100;
  public static readonly PRODUCT_SEARCH_FIELD = 'name,description';
  public static readonly PLAN_FREQUENCY = [
    { id: '1', name: 'Monthly' },
    { id: '12', name: 'Yearly' }
  ];
  public static readonly SHOW_PLAN_FREQUENCY = {
    1: 'Monthly',
    3: 'Quaterly',
    6: 'Halfyearly',
    12: 'Yearly'
  };
  public static readonly SORT_ITEMS = [
    { id: 1, name: 'Price: Low to High' },
    { id: 2, name: 'Price: High to Low' },
    { id: 3, name: 'Newest Arrivals' },
    { id: 4, name: 'Most Popular' }
  ];
  public static readonly ELASTIC_SEARCH_PAGINATION = {
    page: 1,
    from: 0,
    size: 12
  };

  public static readonly SLIDER_RANGE = {
    MINVALUE: 0,
    MAXVALUE: 9999
  };
  public static readonly SLIDER_FLOOR = Constants.SLIDER_RANGE.MINVALUE;
  public static readonly SLIDER_CEIL = Constants.SLIDER_RANGE.MAXVALUE;
  public static readonly SEARCH_CONSTANTS = {
    COMPANY: 'company',
    SUBCATEGORY: 'subCategory',
    CATEGORY: 'category',
    KEYWORD: 'keyword',
    LOCATION: 'location',
    LATITUDE: 'latitude',
    LONGITUDE: 'longitude',
    RADIUS: 'radius',
    CATEGORY_NAME: 'categoryName',
    HOMESEARCH: 'homeSearch',
    HEADERSEARCH: 'headerSearch',
    SEARCHFILTER: 'searchFilter',
    SUB_CATEGORY_NAME: 'subCategoryName',
    HOME: 'Home',
    SEARCH: 'Search',
    DETAILPAGE: 'detailPage',
    COMPNAY_NAME: 'companyName',
    FROM: 'from',
    SIZE: 'size',
    PAGE: 'page',
    RATINGS: 'ratings',
    WILLTRAVEL: 'willTravel',
    SORT: 'sort'
  };

  public static readonly SET_SEARCH_PARAMETER = {
    willTravel: Constants.SET_SEARCH_BY.value,
    minPrice: Constants.SLIDER_RANGE.MINVALUE,
    maxPrice: Constants.SLIDER_RANGE.MAXVALUE
  };

  public static readonly RESET_LOCATION_BASED_PARAMETER =
    {
      willTravel: Constants.SET_SEARCH_BY.value,
      radius: null,
      location: null,
      latitude: null,
      longitude: null
    };

  public static readonly SET_LOCATION_PARAMETER = {
    location: null,
    latitude: null,
    longitude: null
  };

  public static readonly PAGINATION_MAX_SIZE = 10;
  public static readonly SMALL_SCREEN_PAGINATION_MAX_SIZE = 2;
  public static readonly PRODUCT_COUNT = 6;
  public static readonly SHOW_HEADER_SEARCH_BAR = ['/search'];
  public static readonly SHOW_HEADER_SEARCH_BAR_ROUTE = 'details';
  public static readonly VARIABLE_INFO_WITH_STARTDATE =
    [{
      control: 'deliveryStartDate',

    }, {
      control: 'deliveryEndDate',

    },
    {
      control: 'setUpFromDate',

    },
    {
      control: 'setUpToDate',

    }
    ];


  public static readonly YOUTUBE_EMBED_BASE_URL = 'https://www.youtube.com/embed/';
  public static readonly MONTHS = [
    { id: 1, name: '01' },
    { id: 2, name: '02' },
    { id: 3, name: '03' },
    { id: 4, name: '04' },
    { id: 5, name: '05' },
    { id: 6, name: '06' },
    { id: 7, name: '07' },
    { id: 8, name: '08' },
    { id: 9, name: '09' },
    { id: 10, name: '10' },
    { id: 11, name: '11' },
    { id: 12, name: '12' }
  ];
  public static readonly CAROUSEL_PRODUCT_VIEW = {
    HOME_PAGE_PLANNER_REVEIW: 3
  };

  public static readonly NO_OF_LOC_AT_PRODUCT_VIEW = 2;
  public static readonly SEARCH_DEBOUNCE_TIME = 1000;
  public static readonly PAGE_THRESHOLD = 10;
  public static readonly MAX_YEARS_AHEAD_CARD_EXPIRE = 15;
  public static readonly PRODUCT_NOT_FOUND = 'PRODUCT_NOT_FOUND';
  public static readonly EVENT_TYPE = {
    upcomingEvent: 'upcoming-events',
    pastEvent: 'past-events'
  };

  public static readonly LOCATION_TYPES = {
    state: 'administrative_area_level_1',
    city: 'locality',
    country: 'country',
    zipcode: 'postal_code'
  };


  public static readonly EVENT_DATE_VALIDITY = {
    deliveryStartDate: 'deliveryStartDate',
    deliveryEndDate: 'deliveryEndDate',
    setUpFromDate: 'setUpFromDate',
    setUpToDate: 'setUpToDate',
    breakDownStartDate: 'breakDownStartDate',
    breakDownEndDate: 'breakDownEndDate',
    endDate: 'endDate',
    startDate: 'startDate',
    eventStartDate: 'eventStartDate',
    eventEndDate: 'eventEndDate'
  };
  public static readonly YOU_TUBE_ID_INDEX = 2;

  public static readonly FORMAT_HOURS = 12;

  public static readonly MAX_SINGLE_DIGIT = 9;

  public static readonly CUSTOM_DATE_FORMAT = 'MM-DD-YYYY';

  public static readonly SHOW_HEADER_WITH_LOGO_ONLY = ['/auth/reset'];

  public static readonly SHOW_NO_HEADER = ['/admin/login'];

  public static readonly VARIABLE_KEYS =
    {
      categoryQuoteVarriables: 'categoryQuoteVarriables',
      eventVarriables: 'eventVarriables', lastQuoteVarriables: 'lastQuoteVarriables'
    };
  public static readonly SORT_BY_CREATED_AT =
    {
      order: -1,
      sort: 'createdAt'
    };
  public static readonly DEFAULT_SORTING =
    {
      plannerAwaitngOrder: 1,
      plannerAwaitngSortBy: 'quoteExpirationDate',
      vendorManagement: Constants.SORT_BY_CREATED_AT,
      plannerManagement: Constants.SORT_BY_CREATED_AT,
      adminUserManagement: Constants.SORT_BY_CREATED_AT
    };
  public static readonly DEFAULT_PREQUOTE_VARIABLE = Constants.VARIABLE_KEYS.eventVarriables;
  public static readonly VARIABLE_INFO_READ_ONLY_FIELDS = ['eventStartDate', 'eventEndDate', 'eventStartTime', 'eventEndTime'];

  public static readonly QUOTE_STATUS = {
    INITIATED: 'INITIATED',
    AWAITING_VENDOR_QUOTES: 'AWAITING_VENDOR_QUOTES',
    PENDING_PAYMENT_QUOTES: 'PENDING_PAYMENT_QUOTES',
    ACCEPT_REJECT_QUOTES: 'ACCEPT_REJECT_QUOTES',
    EXPIRED_QUOTES: 'EXPIRED_QUOTES',
    ACCEPTED_QUOTES: 'ACCEPTED_QUOTES',
    REJECTED_QUOTES: 'REJECTED_QUOTES',
    PRICE_QUOTES_NEEDED: 'price-quotes',
    AWAITING_QUOTES_ACCEPTANCE: 'awaiting_quotes',
    CANCELED_QUOTES: 'CANCELED_QUOTES',
    PENDING_REPLIES: 'PENDING',
    DECLINED_REPLIES: 'DECLINED',
    REJECTED_BY_VENDOR: 'REJECTED_BY_VENDOR'
  };

  public static readonly PLANNER_EXPIRED_QUOTE_LIST_RADIO = [
    {
      text: 'All',
      value: 'all'
    }, {
      text: 'Upcoming Events',
      value: 'upcoming'
    }, {
      text: 'Past Events',
      value: 'past'
    }];

  public static readonly ALL_RADIO_OPTION = 'all';


  public static readonly MIN_QUANTITY = 1;
  public static readonly DECREAMENT_QUANTITY_KEY = -1;


  public static readonly PLANNER_QUOTE_HEADING = {
    ACCEPTED_REJECTED_QUOTES: 'Accept / Reject Quotes',
    AWAITNG_VENDOR_QUOTES: 'Awaiting Vendor Quotes',
    PENDING_PAYMENT_QUOTES: 'Quotes Pending Payment',
    EXPIRED_QUOTES: 'Expired / Rejected Quotes',
    ACCEPTED_QUOTES: 'Quotes Pending Payment',
    AWAITING_VENDOR_QUOTES: 'Awaiting Vendor Quotes',
    REJECTED_QUOTES: 'Rejected Quotes',
    PURCHASED: '# Of Products Purchased',
    DECLINED_QUOTES: 'Expired/Rejected'
  };

  public static readonly ORDER_TYPES = {
    NEW_ORDERS: 'NEW_ORDERS',
    FULFILLED_ORDERS: 'FULFILLED_ORDERS',
    DAY_OUR_ORDERS: 'DAY_OUR_ORDERS',
    CANCELLED: 'CANCELLED',
  };

  public static readonly FILTER_IN_ORDER_DATATYPE = {
    ORDER_BY_EVENT: 'event',
  };


  public static readonly QUOTES_LIST_FILTER = [
    {
      text: 'Product/Service Name',
      value: {
        order: Constants.ORDER.ascending,
        sort: Constants.SORT_FIELDS.productName,
      },
      iconName: Constants.ICON_TYPES.aToZ,
      id: 'productNameAscending'
    },
    {
      text: 'Product/Service Name',
      value: {
        order: Constants.ORDER.descending,
        sort: Constants.SORT_FIELDS.productName,
      },
      iconName: Constants.ICON_TYPES.zToA,
      id: 'productNameDescending'
    },
    {
      text: 'Event Name',
      value: {
        order: Constants.ORDER.ascending,
        sort: Constants.SORT_FIELDS.eventName,
      },
      iconName: Constants.ICON_TYPES.aToZ,
      id: 'eventNameAscending'
    },
    {
      text: 'Event Name',
      value: {
        order: Constants.ORDER.descending,
        sort: Constants.SORT_FIELDS.eventName,
      },
      iconName: Constants.ICON_TYPES.zToA,
      id: 'eventNameDescending'
    },
    {
      text: 'Planner Name',
      value: {
        order: Constants.ORDER.ascending,
        sort: Constants.SORT_FIELDS.plannerName,
      },
      iconName: Constants.ICON_TYPES.aToZ,
      id: 'plannerNameAscending'
    },
    {
      text: 'Planner Name',
      value: {
        order: Constants.ORDER.descending,
        sort: Constants.SORT_FIELDS.plannerName,
      },
      iconName: Constants.ICON_TYPES.zToA,
      id: 'plannerNameDescending'
    },
    {
      text: 'Planner Requested Date/Time',
      value: {
        order: Constants.ORDER.ascending,
        sort: 'quoteRequestedDate',
      },
      iconName: Constants.ICON_TYPES.lowToHigh,
      id: 'quoteRequestedDateAscending'
    },
    {
      text: 'Planner Requested Date/Time',
      value: {
        order: Constants.ORDER.descending,
        sort: 'quoteRequestedDate',
      },
      iconName: Constants.ICON_TYPES.highToLow,
      id: 'quoteRequestedDateDescending'
    },
    {
      text: 'Quantity',
      value: {
        order: Constants.ORDER.ascending,
        sort: Constants.SORT_FIELDS.quantity,
      },
      iconName: Constants.ICON_TYPES.lowToHigh,
      id: 'quantityAscending'
    },
    {
      text: 'Quantity',
      value: {
        order: Constants.ORDER.descending,
        sort: Constants.SORT_FIELDS.quantity,
      },
      iconName: Constants.ICON_TYPES.highToLow,
      id: 'quantityDescending'
    },
  ];

  public static readonly AWAITING_QUOTES_LIST_FILTER = [
    ...Constants.QUOTES_LIST_FILTER,
    {
      text: 'Price Quote',
      value: {
        order: Constants.ORDER.ascending,
        sort: Constants.SORT_FIELDS.totalPrice,
      },
      iconName: Constants.ICON_TYPES.lowToHigh,
      id: 'priceQuoteAscending'
    },
    {
      text: 'Price Quote',
      value: {
        order: Constants.ORDER.descending,
        sort: Constants.SORT_FIELDS.totalPrice,
      },
      iconName: Constants.ICON_TYPES.highToLow,
      id: 'priceQuoteDescending'
    },
    {
      text: 'Status',
      value: {
        order: Constants.ORDER.ascending,
        sort: Constants.SORT_FIELDS.status,
      },
      iconName: Constants.ICON_TYPES.aToZ,
      id: 'statusAscending'
    },
    {
      text: 'Status',
      value: {
        order: Constants.ORDER.descending,
        sort: Constants.SORT_FIELDS.status,
      },
      iconName: Constants.ICON_TYPES.zToA,
      id: 'statusDescending'
    },
  ];

  public static readonly CANCELED_QUOTES_LIST_FILTER = [
    ...Constants.QUOTES_LIST_FILTER,
    {
      text: 'Canceled Date',
      value: {
        order: Constants.ORDER.ascending,
        sort: 'updatedAt'
      },
      iconName: Constants.ICON_TYPES.lowToHigh,
      id: 'updatedAtAscending'
    },
    {
      text: 'Canceled Date',
      value: {
        order: Constants.ORDER.descending,
        sort: 'updatedAt'
      },
      iconName: Constants.ICON_TYPES.highToLow,
      id: 'updatedAtDescending'
    },
    {
      text: 'Vendor Response Date/Time',
      value: {
        order: Constants.ORDER.ascending,
        sort: 'createdAt'
      },
      iconName: Constants.ICON_TYPES.lowToHigh,
      id: 'createdAtAtAscending'
    },
    {
      text: 'Vendor Response Date/Time',
      value: {
        order: Constants.ORDER.descending,
        sort: 'createdAt'
      },
      iconName: Constants.ICON_TYPES.highToLow,
      id: 'createdAtDescending'
    },
    {
      text: 'Price Quote',
      value: {
        order: Constants.ORDER.ascending,
        sort: 'totalPrice',
      },
      iconName: Constants.ICON_TYPES.lowToHigh,
      id: 'priceQuoteAscending'
    },
    {
      text: 'Price Quote',
      value: {
        order: Constants.ORDER.descending,
        sort: 'totalPrice',
      },
      iconName: Constants.ICON_TYPES.highToLow,
      id: 'priceQuoteDescending'
    }
  ];
  public static readonly FAVOURITES_LIST_FILTER = [
    {
      text: 'Product/Service Name',
      value: {
        order: Constants.ORDER.ascending,
        sort: 'name',
      },
      iconName: Constants.ICON_TYPES.aToZ,
      id: 'nameAscending'
    },
    {
      text: 'Product/Service Name',
      value: {
        order: Constants.ORDER.descending,
        sort: 'name',
      },
      iconName: Constants.ICON_TYPES.zToA,
      id: 'nameDescending'
    },
    {
      text: 'Vendor Name',
      value: {
        order: Constants.ORDER.ascending,
        sort: 'company.name',
      },
      iconName: Constants.ICON_TYPES.aToZ,
      id: 'vendorNameAscending'
    },
    {
      text: 'Vendor Name',
      value: {
        order: Constants.ORDER.descending,
        sort: 'company.name',
      },
      iconName: Constants.ICON_TYPES.zToA,
      id: 'vendorNameDescending'
    },
    {
      text: 'Starting Price',
      value: {
        order: Constants.ORDER.ascending,
        sort: 'price',
      },
      iconName: Constants.ICON_TYPES.lowToHigh,
      id: 'priceAscending'
    },
    {
      text: 'Starting Price',
      value: {
        order: Constants.ORDER.descending,
        sort: 'price',
      },
      iconName: Constants.ICON_TYPES.highToLow,
      id: 'priceDescending'
    },
  ];
  public static readonly EXPIRED_QUOTES_LIST_FILTER = [
    {
      text: 'Product/Service Name',
      value: {
        order: Constants.ORDER.ascending,
        sort: Constants.SORT_FIELDS.productName,
      },
      iconName: Constants.ICON_TYPES.aToZ,
      id: 'productNameAscending'
    }, {
      text: 'Product/Service Name',
      value: {
        order: Constants.ORDER.descending,
        sort: Constants.SORT_FIELDS.productName,
      },
      iconName: Constants.ICON_TYPES.zToA,
      id: 'productNameDescending'
    },
    {
      text: 'Event Label',
      value: {
        order: Constants.ORDER.ascending,
        sort: Constants.SORT_FIELDS.eventLabel,
      },
      iconName: Constants.ICON_TYPES.aToZ,
      id: 'eventLabelAscending'
    }, {
      text: 'Event Label',
      value: {
        order: Constants.ORDER.descending,
        sort: Constants.SORT_FIELDS.eventLabel,
      },
      iconName: Constants.ICON_TYPES.zToA,
      id: 'eventLabelDescending'
    },
    {
      text: 'Vendor Name',
      value: {
        order: Constants.ORDER.ascending,
        sort: Constants.SORT_FIELDS.vendorName,
      },
      iconName: Constants.ICON_TYPES.aToZ,
      id: 'vendorNameAscending'
    },
    {
      text: 'Vendor Name',
      value: {
        order: Constants.ORDER.descending,
        sort: Constants.SORT_FIELDS.vendorName,
      },
      iconName: Constants.ICON_TYPES.zToA,
      id: 'vendorNameDescending'
    },
    {
      text: 'Quote Expiration',
      value: {
        order: Constants.ORDER.ascending,
        sort: Constants.SORT_FIELDS.quoteExpiration,
      },
      iconName: Constants.ICON_TYPES.lowToHigh,
      id: 'quoteExpirationAscending'
    },
    {
      text: 'Quote Expiration',
      value: {
        order: Constants.ORDER.descending,
        sort: Constants.SORT_FIELDS.quoteExpiration,
      },
      iconName: Constants.ICON_TYPES.highToLow,
      id: 'quoteExpirationDescending'
    },
    {
      text: 'Quantity',
      value: {
        order: Constants.ORDER.ascending,
        sort: Constants.SORT_FIELDS.quantity,
      },
      iconName: Constants.ICON_TYPES.lowToHigh,
      id: 'quantityAscending'
    },
    {
      text: 'Quantity',
      value: {
        order: Constants.ORDER.descending,
        sort: Constants.SORT_FIELDS.quantity,
      },
      iconName: Constants.ICON_TYPES.highToLow,
      id: 'quantityDescending'
    },
    {
      text: 'Price Quote',
      value: {
        order: Constants.ORDER.ascending,
        sort: Constants.SORT_FIELDS.totalPrice,
      },
      iconName: Constants.ICON_TYPES.lowToHigh,
      id: 'priceQuoteAscending'
    },
    {
      text: 'Price Quote',
      value: {
        order: Constants.ORDER.descending,
        sort: Constants.SORT_FIELDS.totalPrice,
      },
      iconName: Constants.ICON_TYPES.highToLow,
      id: 'priceQuoteDescending'
    },
    {
      text: 'Status',
      value: {
        order: Constants.ORDER.ascending,
        sort: Constants.SORT_FIELDS.status,
      },
      iconName: Constants.ICON_TYPES.aToZ,
      id: 'statusAscending'
    },
    {
      text: 'Status',
      value: {
        order: Constants.ORDER.descending,
        sort: Constants.SORT_FIELDS.status,
      },
      iconName: Constants.ICON_TYPES.zToA,
      id: 'statusDescending'
    },
  ];

  public static readonly ADMIN_EXPIRED_QUOTES_LIST_FILTER = [
    ...Constants.EXPIRED_QUOTES_LIST_FILTER,
    {
      text: 'Planner Name',
      value: {
        order: Constants.ORDER.ascending,
        sort: Constants.SORT_FIELDS.plannerName,
      },
      iconName: Constants.ICON_TYPES.aToZ,
      id: 'plannerNameAscending'
    },
    {
      text: 'Planner Name',
      value: {
        order: Constants.ORDER.descending,
        sort: Constants.SORT_FIELDS.plannerName,
      },
      iconName: Constants.ICON_TYPES.zToA,
      id: 'plannerNameDescending'
    },
  ];
  public static readonly RESPONSIVE_WINDOW_MIN_WIDTH = {
    INNERWIDTH: 576,
    VENDOR_MYPRODUCT_FILTER: 1024,
    MOBILE_ONLY_REVIEWS: 992
  };

  public static readonly COMMON_ORDER_FILTERS = [
    {
      text: 'Product/Service Name',
      value: {
        order: Constants.ORDER.ascending,
        sort: Constants.SORT_FIELDS.productName,
      },
      iconName: Constants.ICON_TYPES.aToZ,
      id: 'productNameAscending'
    }, {
      text: 'Product/Service Name',
      value: {
        order: Constants.ORDER.descending,
        sort: Constants.SORT_FIELDS.productName,
      },
      iconName: Constants.ICON_TYPES.zToA,
      id: 'productNameDescending'
    }, {
      text: 'Event Label',
      value: {
        order: Constants.ORDER.ascending,
        sort: Constants.SORT_FIELDS.eventLabel,
      },
      iconName: Constants.ICON_TYPES.aToZ,
      id: 'eventLabelAscending'
    }, {
      text: 'Event Label',
      value: {
        order: Constants.ORDER.descending,
        sort: Constants.SORT_FIELDS.eventLabel,
      },
      iconName: Constants.ICON_TYPES.zToA,
      id: 'eventLabelDescending'
    },
    {
      text: 'Quantity',
      value: {
        order: Constants.ORDER.ascending,
        sort: Constants.SORT_FIELDS.quantity,
      },
      iconName: Constants.ICON_TYPES.lowToHigh,
      id: 'quantityAsc'
    },
    {
      text: 'Quantity',
      value: {
        order: Constants.ORDER.descending,
        sort: Constants.SORT_FIELDS.quantity,
      },
      iconName: Constants.ICON_TYPES.highToLow,
      id: 'quantityDesc'
    },
    {
      text: 'Total',
      value: {
        order: Constants.ORDER.ascending,
        sort: Constants.SORT_FIELDS.total,
      },
      iconName: Constants.ICON_TYPES.lowToHigh,
      id: 'totalAsc'
    },
    {
      text: 'Total',
      value: {
        order: Constants.ORDER.descending,
        sort: Constants.SORT_FIELDS.total,
      },
      iconName: Constants.ICON_TYPES.highToLow,
      id: 'totalDesc'
    },
  ];
  public static readonly PURCHASED_ORDER_FILTER = [
    ...Constants.COMMON_ORDER_FILTERS,
    {
      text: 'Purchased Date',
      value: {
        order: Constants.ORDER.ascending,
        sort: Constants.SORT_FIELDS.purchasedDate,
      },
      iconName: Constants.ICON_TYPES.lowToHigh,
      id: 'purchasedDateAsc'
    },
    {
      text: 'Purchased Date',
      value: {
        order: Constants.ORDER.descending,
        sort: Constants.SORT_FIELDS.purchasedDate,
      },
      iconName: Constants.ICON_TYPES.highToLow,
      id: 'purchasedDateDesc'
    },
    {
      text: 'Vendor Email',
      value: {
        order: Constants.ORDER.ascending,
        sort: Constants.SORT_FIELDS.vendorEmail,
      },
      iconName: Constants.ICON_TYPES.aToZ,
      id: 'vendorEmailAsc'
    }, {
      text: 'Vendor Email',
      value: {
        order: Constants.ORDER.descending,
        sort: Constants.SORT_FIELDS.vendorEmail,
      },
      iconName: Constants.ICON_TYPES.zToA,
      id: 'vendorEmailDesc'
    },
  ];

  public static readonly ADMIN_PURCHASED_CANCELED_ORDER_FILTER = [
    {
      text: 'Product/Service Name',
      value: {
        order: Constants.ORDER.ascending,
        sort: Constants.SORT_FIELDS.productName,
      },
      iconName: Constants.ICON_TYPES.aToZ,
      id: 'productNameAscending'
    }, {
      text: 'Product/Service Name',
      value: {
        order: Constants.ORDER.descending,
        sort: Constants.SORT_FIELDS.productName,
      },
      iconName: Constants.ICON_TYPES.zToA,
      id: 'productNameDescending'
    }, {
      text: 'Event Label',
      value: {
        order: Constants.ORDER.ascending,
        sort: Constants.SORT_FIELDS.eventLabel,
      },
      iconName: Constants.ICON_TYPES.aToZ,
      id: 'eventLabelAscending'
    }, {
      text: 'Event Label',
      value: {
        order: Constants.ORDER.descending,
        sort: Constants.SORT_FIELDS.eventLabel,
      },
      iconName: Constants.ICON_TYPES.zToA,
      id: 'eventLabelDescending'
    },
    {
      text: 'Quantity',
      value: {
        order: Constants.ORDER.ascending,
        sort: Constants.SORT_FIELDS.quantity,
      },
      iconName: Constants.ICON_TYPES.lowToHigh,
      id: 'quantityAsc'
    },
    {
      text: 'Quantity',
      value: {
        order: Constants.ORDER.descending,
        sort: Constants.SORT_FIELDS.quantity,
      },
      iconName: Constants.ICON_TYPES.highToLow,
      id: 'quantityDesc'
    },
    {
      text: 'Amount',
      value: {
        order: Constants.ORDER.ascending,
        sort: Constants.SORT_FIELDS.total,
      },
      iconName: Constants.ICON_TYPES.lowToHigh,
      id: 'totalAsc'
    },
    {
      text: 'Amount',
      value: {
        order: Constants.ORDER.descending,
        sort: Constants.SORT_FIELDS.total,
      },
      iconName: Constants.ICON_TYPES.highToLow,
      id: 'totalDesc'
    },
    {
      text: 'Planner Name',
      value: {
        order: Constants.ORDER.ascending,
        sort: Constants.SORT_FIELDS.plannerName,
      },
      id: 'firstNameAscending',
      iconName: Constants.ICON_TYPES.aToZ,
    },
    {
      text: 'Planner Name',
      value: {
        order: Constants.ORDER.descending,
        sort: Constants.SORT_FIELDS.plannerName
      },
      id: 'firstNameDescending',
      iconName: Constants.ICON_TYPES.zToA,
    },
    {
      text: 'Vendor Name',
      value: {
        order: Constants.ORDER.ascending,
        sort: Constants.SORT_FIELDS.vendorName,
      },
      id: 'vendorNameAscending',
      iconName: Constants.ICON_TYPES.aToZ,
    },
    {
      text: 'Vendor Name',
      value: {
        order: Constants.ORDER.descending,
        sort: Constants.SORT_FIELDS.vendorName
      },
      id: 'vendorNameDescending',
      iconName: Constants.ICON_TYPES.zToA,
    },
  ];

  public static readonly ADMIN_PURCHASED_ORDERS_FILTER = [
    ...Constants.ADMIN_PURCHASED_CANCELED_ORDER_FILTER,
    {
      text: 'Purchased Date',
      value: {
        order: Constants.ORDER.ascending,
        sort: Constants.SORT_FIELDS.purchasedDate,
      },
      iconName: Constants.ICON_TYPES.lowToHigh,
      id: 'purchasedDateAsc'
    },
    {
      text: 'Purchased Date',
      value: {
        order: Constants.ORDER.descending,
        sort: Constants.SORT_FIELDS.purchasedDate,
      },
      iconName: Constants.ICON_TYPES.highToLow,
      id: 'purchasedDateDesc'
    },
  ];
  public static readonly ADMIN_CANCELED_ORDERS_FILTER = [
    ...Constants.ADMIN_PURCHASED_CANCELED_ORDER_FILTER,
    {
      text: 'Canceled Date',
      value: {
        order: Constants.ORDER.ascending,
        sort: Constants.SORT_FIELDS.cancelledDate,
      },
      iconName: Constants.ICON_TYPES.lowToHigh,
      id: 'canceledDateAsc'
    },
    {
      text: 'Canceled Date',
      value: {
        order: Constants.ORDER.descending,
        sort: Constants.SORT_FIELDS.cancelledDate,
      },
      iconName: Constants.ICON_TYPES.highToLow,
      id: 'canceledDateDesc'
    },
  ];

  public static readonly CANCELED_ORDERS_FILTER = [
    ...Constants.COMMON_ORDER_FILTERS,
    {
      text: 'Canceled Date',
      value: {
        order: Constants.ORDER.ascending,
        sort: Constants.SORT_FIELDS.cancelledDate,
      },
      iconName: Constants.ICON_TYPES.lowToHigh,
      id: 'canceledDateAsc'
    },
    {
      text: 'Canceled Date',
      value: {
        order: Constants.ORDER.descending,
        sort: Constants.SORT_FIELDS.cancelledDate,
      },
      iconName: Constants.ICON_TYPES.highToLow,
      id: 'canceledDateDesc'
    },
  ];

  public static readonly SEARCH_LIST_FILTER = [
    {
      text: 'Price: Low to High',
      value: {
        sort: Constants.SORT_FIELDS.priceLowToHigh,
      },
      iconName: 'low-to-high.svg',
      id: 'priceLowToHigh'
    },
    {
      text: 'Price: High to Low',
      value: {
        sort: Constants.SORT_FIELDS.priceHighToLow,
      },
      iconName: 'high-to-low.svg',
      id: 'priceHighToLow'
    },
    {
      text: 'Newest Arrivals',
      value: {
        sort: Constants.SORT_FIELDS.newArrivals,
      },
      iconName: 'new-arrivals.svg',
      id: 'newArrivals'
    },
    {
      text: 'Most Popular',
      value: {
        sort: Constants.SORT_FIELDS.mostPopular,
      },
      iconName: 'most-popular.svg',
      id: 'mostPopular'
    }
  ];


  public static readonly QUOTE_REQ_FOLDER_LIST_FILTER = [
    {
      text: 'Product/Service Name',
      value: {
        order: Constants.ORDER.ascending,
        sort: Constants.SORT_FIELDS.productName,
      },
      iconName: Constants.ICON_TYPES.aToZ,
      id: 'productNameAscending'
    },
    {
      text: 'Product/Service Name',
      value: {
        order: Constants.ORDER.descending,
        sort: Constants.SORT_FIELDS.productName,
      },
      iconName: Constants.ICON_TYPES.zToA,
      id: 'productNameDescending'
    }, {
      text: 'Vendor Name',
      value: {
        order: Constants.ORDER.ascending,
        sort: Constants.SORT_FIELDS.vendorName,
      },
      iconName: Constants.ICON_TYPES.aToZ,
      id: 'vendorNameAscending'
    },
    {
      text: 'Vendor Name',
      value: {
        order: Constants.ORDER.descending,
        sort: Constants.SORT_FIELDS.vendorName,
      },
      iconName: Constants.ICON_TYPES.zToA,
      id: 'vendorNameDescending'
    },
    {
      text: 'Event Label',
      value: {
        order: Constants.ORDER.ascending,
        sort: Constants.SORT_FIELDS.eventLabel,
      },
      iconName: Constants.ICON_TYPES.aToZ,
      id: 'eventLabelAscending'
    }, {
      text: 'Event Label',
      value: {
        order: Constants.ORDER.descending,
        sort: Constants.SORT_FIELDS.eventLabel,
      },
      iconName: Constants.ICON_TYPES.zToA,
      id: 'eventLabelDescending'
    },
    {
      text: 'Quote Requested',
      value: {
        order: Constants.ORDER.ascending,
        sort: Constants.SORT_FIELDS.quoteRequestedDate,
      },
      iconName: Constants.ICON_TYPES.lowToHigh,
      id: 'quoteRequestedDateAscending'
    },
    {
      text: 'Quote Requested',
      value: {
        order: Constants.ORDER.descending,
        sort: Constants.SORT_FIELDS.quoteRequestedDate,
      },
      iconName: Constants.ICON_TYPES.highToLow,
      id: 'quoteRequestedDateDescending'
    },
    {
      text: 'Quantity',
      value: {
        order: Constants.ORDER.ascending,
        sort: Constants.SORT_FIELDS.quantity,
      },
      iconName: Constants.ICON_TYPES.lowToHigh,
      id: 'quantityAscending'
    },
    {
      text: 'Quantity',
      value: {
        order: Constants.ORDER.descending,
        sort: Constants.SORT_FIELDS.quantity,
      },
      iconName: Constants.ICON_TYPES.highToLow,
      id: 'quantityDescending'
    },
    {
      text: 'Price',
      value: {
        order: Constants.ORDER.ascending,
        sort: Constants.SORT_FIELDS.totalPrice,
      },
      iconName: Constants.ICON_TYPES.lowToHigh,
      id: 'priceAscending'
    },
    {
      text: 'Price',
      value: {
        order: Constants.ORDER.descending,
        sort: Constants.SORT_FIELDS.totalPrice,
      },
      iconName: Constants.ICON_TYPES.highToLow,
      id: 'priceDescending'
    }
  ];

  public static readonly ADMIN_QUOTE_REQ_FOLDER_LIST_FILTER = [
    ...Constants.QUOTE_REQ_FOLDER_LIST_FILTER,
    {
      text: 'Planner Name',
      value: {
        order: Constants.ORDER.ascending,
        sort: Constants.SORT_FIELDS.plannerName,
      },
      iconName: Constants.ICON_TYPES.aToZ,
      id: 'plannerNameAscending'
    },
    {
      text: 'Planner Name',
      value: {
        order: Constants.ORDER.descending,
        sort: Constants.SORT_FIELDS.plannerName,
      },
      iconName: Constants.ICON_TYPES.zToA,
      id: 'plannerNameDescending'
    },

  ];

  public static readonly ACCEPT_REJECT_QUOTE_LIST_FILTER = [
    {
      text: 'Product/Service Name',
      value: {
        order: Constants.ORDER.ascending,
        sort: Constants.SORT_FIELDS.productName,
      },
      iconName: Constants.ICON_TYPES.aToZ,
      id: 'productNameAscending'
    },
    {
      text: 'Product/Service Name',
      value: {
        order: Constants.ORDER.descending,
        sort: Constants.SORT_FIELDS.productName,
      },
      iconName: Constants.ICON_TYPES.zToA,
      id: 'productNameDescending'
    },
    {
      text: 'Event Label',
      value: {
        order: Constants.ORDER.ascending,
        sort: Constants.SORT_FIELDS.eventLabel,
      },
      iconName: Constants.ICON_TYPES.aToZ,
      id: 'eventLabelAscending'
    }, {
      text: 'Event Label',
      value: {
        order: Constants.ORDER.descending,
        sort: Constants.SORT_FIELDS.eventLabel,
      },
      iconName: Constants.ICON_TYPES.zToA,
      id: 'eventLabelDescending'
    }, {
      text: 'Vendor Name',
      value: {
        order: Constants.ORDER.ascending,
        sort: Constants.SORT_FIELDS.vendorName,
      },
      iconName: Constants.ICON_TYPES.aToZ,
      id: 'vendorNameAscending'
    },
    {
      text: 'Vendor Name',
      value: {
        order: Constants.ORDER.descending,
        sort: Constants.SORT_FIELDS.vendorName,
      },
      iconName: Constants.ICON_TYPES.zToA,
      id: 'vendorNameDescending'
    },
    {
      text: 'Quote Expiration',
      value: {
        order: Constants.ORDER.ascending,
        sort: Constants.SORT_FIELDS.quoteExpiration,
      },
      iconName: Constants.ICON_TYPES.lowToHigh,
      id: 'quoteExpirationAscending'
    },
    {
      text: 'Quote Expiration',
      value: {
        order: Constants.ORDER.descending,
        sort: Constants.SORT_FIELDS.quoteExpiration,
      },
      iconName: Constants.ICON_TYPES.highToLow,
      id: 'quoteExpirationDescending'
    },
    {
      text: 'Price',
      value: {
        order: Constants.ORDER.ascending,
        sort: Constants.SORT_FIELDS.totalPrice
      },
      id: 'priceLowToHigh',
      iconName: Constants.ICON_TYPES.lowToHigh,
    },
    {
      text: 'Price',
      value: {
        order: Constants.ORDER.descending,
        sort: Constants.SORT_FIELDS.totalPrice
      },
      id: 'priceHighToLow',
      iconName: Constants.ICON_TYPES.highToLow,
    },
    {
      text: 'Quantity',
      value: {
        order: Constants.ORDER.ascending,
        sort: Constants.SORT_FIELDS.quantity,
      },
      iconName: Constants.ICON_TYPES.lowToHigh,
      id: 'quantityAscending'
    },
    {
      text: 'Quantity',
      value: {
        order: Constants.ORDER.descending,
        sort: Constants.SORT_FIELDS.quantity,
      },
      iconName: Constants.ICON_TYPES.highToLow,
      id: 'quantityDescending'
    },
  ];

  public static readonly ADMIN_ACCEPT_REJECT_QUOTE_LIST_FILTER = [
    ...Constants.ACCEPT_REJECT_QUOTE_LIST_FILTER,
    {
      text: 'Planner Name',
      value: {
        order: Constants.ORDER.ascending,
        sort: Constants.SORT_FIELDS.plannerName,
      },
      iconName: Constants.ICON_TYPES.aToZ,
      id: 'plannerNameAscending'
    },
    {
      text: 'Planner Name',
      value: {
        order: Constants.ORDER.descending,
        sort: Constants.SORT_FIELDS.plannerName,
      },
      iconName: Constants.ICON_TYPES.zToA,
      id: 'plannerNameDescending'
    },

  ];
  public static readonly QUOTES_PENDING_PAYMENT = [
    {
      text: 'Product/Service Name',
      value: {
        order: Constants.ORDER.ascending,
        sort: Constants.SORT_FIELDS.productName,
      },
      iconName: Constants.ICON_TYPES.aToZ,
      id: 'productNameAscending'
    },
    {
      text: 'Product/Service Name',
      value: {
        order: Constants.ORDER.descending,
        sort: Constants.SORT_FIELDS.productName,
      },
      iconName: Constants.ICON_TYPES.zToA,
      id: 'productNameDescending'
    },
    {
      text: 'Event Label',
      value: {
        order: Constants.ORDER.ascending,
        sort: Constants.SORT_FIELDS.eventLabel,
      },
      iconName: Constants.ICON_TYPES.aToZ,
      id: 'eventLabelAscending'
    }, {
      text: 'Event Label',
      value: {
        order: Constants.ORDER.descending,
        sort: Constants.SORT_FIELDS.eventLabel,
      },
      iconName: Constants.ICON_TYPES.zToA,
      id: 'eventLabelDescending'
    }, {
      text: 'Vendor Name',
      value: {
        order: Constants.ORDER.ascending,
        sort: Constants.SORT_FIELDS.vendorName,
      },
      iconName: Constants.ICON_TYPES.aToZ,
      id: 'vendorNameAscending'
    },
    {
      text: 'Vendor Name',
      value: {
        order: Constants.ORDER.descending,
        sort: Constants.SORT_FIELDS.vendorName,
      },
      iconName: Constants.ICON_TYPES.zToA,
      id: 'vendorNameDescending'
    },
    {
      text: 'Price',
      value: {
        order: Constants.ORDER.ascending,
        sort: Constants.SORT_FIELDS.totalPrice
      },
      id: 'priceLowToHigh',
      iconName: Constants.ICON_TYPES.lowToHigh,
    },
    {
      text: 'Price',
      value: {
        order: Constants.ORDER.descending,
        sort: Constants.SORT_FIELDS.totalPrice
      },
      id: 'priceHighToLow',
      iconName: Constants.ICON_TYPES.highToLow,
    },
    {
      text: 'Quantity',
      value: {
        order: Constants.ORDER.ascending,
        sort: Constants.SORT_FIELDS.quantity,
      },
      iconName: Constants.ICON_TYPES.lowToHigh,
      id: 'quantityAscending'
    },
    {
      text: 'Quantity',
      value: {
        order: Constants.ORDER.descending,
        sort: Constants.SORT_FIELDS.quantity,
      },
      iconName: Constants.ICON_TYPES.highToLow,
      id: 'quantityDescending'
    },
  ];

  public static readonly ADMIN_QUOTES_PENDING_PAYMENT = [
    ...Constants.QUOTES_PENDING_PAYMENT,
    {
      text: 'Planner Name',
      value: {
        order: Constants.ORDER.ascending,
        sort: Constants.SORT_FIELDS.plannerName,
      },
      iconName: Constants.ICON_TYPES.aToZ,
      id: 'plannerNameAscending'
    },
    {
      text: 'Planner Name',
      value: {
        order: Constants.ORDER.descending,
        sort: Constants.SORT_FIELDS.plannerName,
      },
      iconName: Constants.ICON_TYPES.zToA,
      id: 'plannerNameDescending'
    }
  ];

  public static readonly COMMON_VENDOR_ORDER_FILTERS = [
    {
      text: 'Product/Service Name',
      value: {
        order: Constants.ORDER.ascending,
        sort: Constants.SORT_FIELDS.productName,
      },
      iconName: Constants.ICON_TYPES.aToZ,
      id: 'productNameAscending'
    }, {
      text: 'Product/Service Name',
      value: {
        order: Constants.ORDER.descending,
        sort: Constants.SORT_FIELDS.productName,
      },
      iconName: Constants.ICON_TYPES.zToA,
      id: 'productNameDescending'
    },
    {
      text: 'Quantity',
      value: {
        order: Constants.ORDER.ascending,
        sort: Constants.SORT_FIELDS.quantity,
      },
      iconName: Constants.ICON_TYPES.lowToHigh,
      id: 'quantityAsc'
    },
    {
      text: 'Quantity',
      value: {
        order: Constants.ORDER.descending,
        sort: Constants.SORT_FIELDS.quantity,
      },
      iconName: Constants.ICON_TYPES.highToLow,
      id: 'quantityDesc'
    },
    {
      text: 'Total Paid',
      value: {
        order: Constants.ORDER.ascending,
        sort: Constants.SORT_FIELDS.totalPaid,
      },
      iconName: Constants.ICON_TYPES.lowToHigh,
      id: 'totalAsc'
    },
    {
      text: 'Total Paid',
      value: {
        order: Constants.ORDER.descending,
        sort: Constants.SORT_FIELDS.totalPaid,
      },
      iconName: Constants.ICON_TYPES.highToLow,
      id: 'totalDesc'
    }, {
      text: 'Date of Purchased',
      value: {
        order: Constants.ORDER.ascending,
        sort: Constants.SORT_FIELDS.purchasedDate,
      },
      iconName: Constants.ICON_TYPES.lowToHigh,
      id: 'purchasedDateAsc'
    },
    {
      text: 'Date of Purchased',
      value: {
        order: Constants.ORDER.descending,
        sort: Constants.SORT_FIELDS.purchasedDate,
      },
      iconName: Constants.ICON_TYPES.highToLow,
      id: 'purchasedDateDesc'
    },
    {
      text: 'Event Name',
      value: {
        order: Constants.ORDER.ascending,
        sort: Constants.SORT_FIELDS.eventName,
      },
      iconName: Constants.ICON_TYPES.aToZ,
      id: 'eventNameAscending'
    }, {
      text: 'Event Name',
      value: {
        order: Constants.ORDER.descending,
        sort: Constants.SORT_FIELDS.eventName,
      },
      iconName: Constants.ICON_TYPES.zToA,
      id: 'eventNameDescending'
    },
    {
      text: 'Planner Name',
      value: {
        order: Constants.ORDER.ascending,
        sort: 'planners.firstName',
      },
      id: 'firstNameAscending',
      iconName: Constants.ICON_TYPES.aToZ,
    },
    {
      text: 'Planner Name',
      value: {
        order: Constants.ORDER.descending,
        sort: 'planners.firstName'
      },
      id: 'firstNameDescending',
      iconName: Constants.ICON_TYPES.zToA,
    },
    {
      text: 'Company Name',
      value: {
        order: Constants.ORDER.ascending,
        sort: 'planners.companyName',
      },
      id: 'companyNameAscending',
      iconName: Constants.ICON_TYPES.aToZ,
    },
    {
      text: 'Company Name',
      value: {
        order: Constants.ORDER.descending,
        sort: 'planners.companyName',
      },
      id: 'companyNameDescending',
      iconName: Constants.ICON_TYPES.zToA,
    },
  ];

  public static readonly NEW_DAYOUT_ORDER_FILTER = [
    ...Constants.COMMON_VENDOR_ORDER_FILTERS,
    {
      text: 'Event Date',
      value: {
        order: Constants.ORDER.ascending,
        sort: Constants.SORT_FIELDS.eventDate,
      },
      iconName: Constants.ICON_TYPES.lowToHigh,
      id: 'eventDateAsc'
    },
    {
      text: 'Event Date',
      value: {
        order: Constants.ORDER.descending,
        sort: Constants.SORT_FIELDS.eventDate,
      },
      iconName: Constants.ICON_TYPES.highToLow,
      id: 'eventDateDesc'
    }
  ];

  public static readonly VENDOR_CANCELLED_ORDER_FILTER = [
    ...Constants.COMMON_VENDOR_ORDER_FILTERS,
    {
      text: 'Canceled Date',
      value: {
        order: Constants.ORDER.ascending,
        sort: Constants.SORT_FIELDS.cancelledDate,
      },
      iconName: Constants.ICON_TYPES.lowToHigh,
      id: 'canceledDateAsc'
    },
    {
      text: 'Canceled Date',
      value: {
        order: Constants.ORDER.descending,
        sort: Constants.SORT_FIELDS.cancelledDate,
      },
      iconName: Constants.ICON_TYPES.highToLow,
      id: 'canceledDateDesc'
    }
  ];

  public static readonly FULFILLED_ORDER_FILTER = [
    ...Constants.COMMON_VENDOR_ORDER_FILTERS,
    {
      text: 'Date order Filled',
      value: {
        order: Constants.ORDER.ascending,
        sort: Constants.SORT_FIELDS.eventEndDate,
      },
      iconName: Constants.ICON_TYPES.lowToHigh,
      id: 'purchasedDateAsc'
    },
    {
      text: 'Date order Filled',
      value: {
        order: Constants.ORDER.descending,
        sort: Constants.SORT_FIELDS.eventEndDate,
      },
      iconName: Constants.ICON_TYPES.highToLow,
      id: 'purchasedDateDesc'
    }
  ];


  public static readonly PURCHASED_ORDERS_LIST_FILTER = [
    {
      text: 'Product/Service Name',
      value: {
        order: Constants.ORDER.ascending,
        sort: Constants.SORT_FIELDS.productName,
      },
      iconName: Constants.ICON_TYPES.aToZ,
      id: 'productNameAscending'
    }, {
      text: 'Product/Service Name',
      value: {
        order: Constants.ORDER.descending,
        sort: Constants.SORT_FIELDS.productName,
      },
      iconName: Constants.ICON_TYPES.zToA,
      id: 'productNameDescending'
    },
    {
      text: 'Category',
      value: {
        order: Constants.ORDER.ascending,
        sort: Constants.SORT_FIELDS.categoryName,
      },
      iconName: Constants.ICON_TYPES.aToZ,
      id: 'catAscending'
    }, {
      text: 'Category',
      value: {
        order: Constants.ORDER.descending,
        sort: Constants.SORT_FIELDS.categoryName,
      },
      iconName: Constants.ICON_TYPES.zToA,
      id: 'catDescending'
    },
    {
      text: 'Quantity',
      value: {
        order: Constants.ORDER.ascending,
        sort: Constants.SORT_FIELDS.quantity,
      },
      iconName: Constants.ICON_TYPES.lowToHigh,
      id: 'quantityAsc'
    },
    {
      text: 'Quantity',
      value: {
        order: Constants.ORDER.descending,
        sort: Constants.SORT_FIELDS.quantity,
      },
      iconName: Constants.ICON_TYPES.highToLow,
      id: 'quantityDesc'
    },
    {
      text: 'Amount',
      value: {
        order: Constants.ORDER.ascending,
        sort: Constants.SORT_FIELDS.totalPaid,
      },
      iconName: Constants.ICON_TYPES.lowToHigh,
      id: 'amountAsc'
    },
    {
      text: 'Amount',
      value: {
        order: Constants.ORDER.descending,
        sort: Constants.SORT_FIELDS.totalPaid,
      },
      iconName: Constants.ICON_TYPES.highToLow,
      id: 'amountDesc'
    }, {
      text: 'Date of Order',
      value: {
        order: Constants.ORDER.ascending,
        sort: Constants.SORT_FIELDS.purchasedDate,
      },
      iconName: Constants.ICON_TYPES.lowToHigh,
      id: 'orderDateAsc'
    },
    {
      text: 'Date of Order',
      value: {
        order: Constants.ORDER.descending,
        sort: Constants.SORT_FIELDS.purchasedDate,
      },
      iconName: Constants.ICON_TYPES.highToLow,
      id: 'orderDateDesc'
    },
    {
      text: 'Vendor Name',
      value: {
        order: Constants.ORDER.ascending,
        sort: Constants.SORT_FIELDS.vendorName,
      },
      iconName: Constants.ICON_TYPES.aToZ,
      id: 'vendorNameAscending'
    }, {
      text: 'Vendor Name',
      value: {
        order: Constants.ORDER.descending,
        sort: Constants.SORT_FIELDS.vendorName,
      },
      iconName: Constants.ICON_TYPES.zToA,
      id: 'vendorNameDescending'
    },
    {
      text: 'Planner Name',
      value: {
        order: Constants.ORDER.ascending,
        sort: 'planners.firstName',
      },
      id: 'firstNameAscending',
      iconName: Constants.ICON_TYPES.aToZ,
    },
    {
      text: 'Planner Name',
      value: {
        order: Constants.ORDER.descending,
        sort: 'planners.firstName'
      },
      id: 'firstNameDescending',
      iconName: Constants.ICON_TYPES.zToA,
    }
  ];

  public static readonly ADMIN_ORDER_LIST = [
    {
      text: 'Product/Service Name',
      value: {
        order: Constants.ORDER.ascending,
        sort: Constants.SORT_FIELDS.productName,
      },
      iconName: Constants.ICON_TYPES.aToZ,
      id: 'productNameAscending'
    }, {
      text: 'Product/Service Name',
      value: {
        order: Constants.ORDER.descending,
        sort: Constants.SORT_FIELDS.productName,
      },
      iconName: Constants.ICON_TYPES.zToA,
      id: 'productNameDescending'
    },
    {
      text: 'Event Name',
      value: {
        order: Constants.ORDER.ascending,
        sort: Constants.SORT_FIELDS.eventName,
      },
      iconName: Constants.ICON_TYPES.aToZ,
      id: 'eventNameAscending'
    }, {
      text: 'Event Name',
      value: {
        order: Constants.ORDER.descending,
        sort: Constants.SORT_FIELDS.eventName,
      },
      iconName: Constants.ICON_TYPES.zToA,
      id: 'eventNameDescending'
    },
    {
      text: 'Event Date',
      value: {
        order: Constants.ORDER.ascending,
        sort: Constants.SORT_FIELDS.eventDate,
      },
      iconName: Constants.ICON_TYPES.lowToHigh,
      id: 'purchasedDateAsc'
    },
    {
      text: 'Event Date',
      value: {
        order: Constants.ORDER.descending,
        sort: Constants.SORT_FIELDS.eventDate,
      },
      iconName: Constants.ICON_TYPES.highToLow,
      id: 'purchasedDateDesc'
    },
    {
      text: 'Date of Order',
      value: {
        order: Constants.ORDER.ascending,
        sort: Constants.PRODUCT_SORT_FIELDS.createdAt
      },
      id: 'createdAtAscending',
      iconName: Constants.ICON_TYPES.lowToHigh,
    },
    {
      text: 'Date of Order',
      value: {
        order: Constants.ORDER.descending,
        sort: Constants.PRODUCT_SORT_FIELDS.createdAt
      },
      id: 'createdAtDescending',
      iconName: Constants.ICON_TYPES.highToLow,
    },

    {
      text: 'Quantity',
      value: {
        order: Constants.ORDER.ascending,
        sort: Constants.SORT_FIELDS.quantity,
      },
      iconName: Constants.ICON_TYPES.lowToHigh,
      id: 'quantityAsc'
    },
    {
      text: 'Quantity',
      value: {
        order: Constants.ORDER.descending,
        sort: Constants.SORT_FIELDS.quantity,
      },
      iconName: Constants.ICON_TYPES.highToLow,
      id: 'quantityDesc'
    },
    {
      text: 'Total Paid',
      value: {
        order: Constants.ORDER.ascending,
        sort: Constants.SORT_FIELDS.totalPaid,
      },
      iconName: Constants.ICON_TYPES.lowToHigh,
      id: 'totalAsc'
    },
    {
      text: 'Total Paid',
      value: {
        order: Constants.ORDER.descending,
        sort: Constants.SORT_FIELDS.totalPaid,
      },
      iconName: Constants.ICON_TYPES.highToLow,
      id: 'totalDesc'
    },
    {
      text: 'Planner Name',
      value: {
        order: Constants.ORDER.ascending,
        sort: Constants.SORT_FIELDS.plannerName,
      },
      id: 'firstNameAscending',
      iconName: Constants.ICON_TYPES.aToZ,
    },
    {
      text: 'Planner Name',
      value: {
        order: Constants.ORDER.descending,
        sort: Constants.SORT_FIELDS.plannerName
      },
      id: 'firstNameDescending',
      iconName: Constants.ICON_TYPES.zToA,
    },
  ];
  public static readonly TEST_MODE_BANK_DETAILS = 'test mode';
  public static readonly API_DATE_FORMAT = 'YYYY-MM-DD';
  public static readonly PRODUCT_LOCATION_CONTROLS = ['location', 'miles'];

  public static readonly MESSAGE_TYPE = {
    QUOTE: 'QUOTE',
    PRODUCT: 'PRODUCT',
    TEXT: 'TEXT',
    MEDIA: 'MEDIA',
    ORDER: 'ORDER'
  };

  public static readonly NUMBER = {
    zero: 0,
    one: 1,
    two: 2,
    three: 3,
    four: 4,
    five: 5,
    six: 6,
    seven: 7,
    eight: 8,
    nine: 9,
    ten: 10,
    thirty: 30,
    hundred: 100
  };

  public static readonly SET_RATING = [1, 2, 3, 4, 5];
  public static readonly ADMIN_PENDING_USER_SORTING =
    [
      {
        text: 'First Name',
        value: {
          order: Constants.ORDER.ascending,
          sort: 'firstName',
        },
        id: 'firstNameAscending',
        iconName: Constants.ICON_TYPES.aToZ,
      },
      {
        text: 'First Name',
        value: {
          order: Constants.ORDER.descending,
          sort: 'firstName'
        },
        id: 'firstNameDescending',
        iconName: Constants.ICON_TYPES.zToA,

      },
      {
        text: 'Last Name',
        value: {
          order: Constants.ORDER.ascending,
          sort: 'lastName',
        },
        id: 'LastNameAscending',
        iconName: Constants.ICON_TYPES.aToZ,
      },
      {
        text: 'Last Name',
        value: {
          order: Constants.ORDER.descending,
          sort: 'lastName'
        },
        id: 'LastNameDescending',
        iconName: Constants.ICON_TYPES.zToA,
      },
      {
        text: 'Email',
        value: {
          order: Constants.ORDER.ascending,
          sort: 'email',
        },
        id: 'emailAscending',
        iconName: Constants.ICON_TYPES.aToZ,
      },
      {
        text: 'Email',
        value: {
          order: Constants.ORDER.descending,
          sort: 'email'
        },
        id: 'emailDescending',
        iconName: Constants.ICON_TYPES.zToA,
      },
      {
        text: 'Created At',
        value: {
          order: Constants.ORDER.ascending,
          sort: Constants.PRODUCT_SORT_FIELDS.createdAt
        },
        id: 'createdAtAscending',
        iconName: Constants.ICON_TYPES.lowToHigh,
      },
      {
        text: 'Created At',
        value: {
          order: Constants.ORDER.descending,
          sort: Constants.PRODUCT_SORT_FIELDS.createdAt
        },
        id: 'createdAtDescending',
        iconName: Constants.ICON_TYPES.highToLow,
      },
    ];

  public static readonly RATINGS_N_REVIEWS_FILTERS = [
    {
      text: 'Product/Service Name',
      value: {
        order: Constants.ORDER.ascending,
        sort: Constants.SORT_FIELDS.productName,
      },
      iconName: Constants.ICON_TYPES.aToZ,
      id: 'productNameAscending'
    }, {
      text: 'Product/Service Name',
      value: {
        order: Constants.ORDER.descending,
        sort: Constants.SORT_FIELDS.productName,
      },
      iconName: Constants.ICON_TYPES.zToA,
      id: 'productNameDescending'
    }, {
      text: 'Event Label',
      value: {
        order: Constants.ORDER.ascending,
        sort: Constants.SORT_FIELDS.eventLabel,
      },
      iconName: Constants.ICON_TYPES.aToZ,
      id: 'eventLabelAscending'
    }, {
      text: 'Event Label',
      value: {
        order: Constants.ORDER.descending,
        sort: Constants.SORT_FIELDS.eventLabel,
      },
      iconName: Constants.ICON_TYPES.zToA,
      id: 'eventLabelDescending'
    }, {
      text: 'Vendor Name',
      value: {
        order: Constants.ORDER.ascending,
        sort: Constants.SORT_FIELDS.vendorName,
      },
      iconName: Constants.ICON_TYPES.aToZ,
      id: 'vendorNameAscending'
    }, {
      text: 'Vendor Name',
      value: {
        order: Constants.ORDER.descending,
        sort: Constants.SORT_FIELDS.vendorName,
      },
      iconName: Constants.ICON_TYPES.zToA,
      id: 'vendorNameDescending'
    }
  ];

  public static readonly COMMON_RATINGS_N_REVIEWS_VENDOR_FILTERS = [
    {
      text: '# Of Star',
      value: {
        order: Constants.ORDER.ascending,
        sort: Constants.SORT_FIELDS.eventLabel,
      },
      iconName: Constants.ICON_TYPES.lowToHigh,
      id: 'eventLabelAscending'
    }, {
      text: '# Of Star',
      value: {
        order: Constants.ORDER.descending,
        sort: Constants.SORT_FIELDS.eventLabel,
      },
      iconName: Constants.ICON_TYPES.highToLow,
      id: 'eventLabelDescending'
    }, {
      text: 'Planner Name',
      value: {
        order: Constants.ORDER.ascending,
        sort: Constants.SORT_FIELDS.vendorName,
      },
      iconName: Constants.ICON_TYPES.aToZ,
      id: 'vendorNameAscending'
    }, {
      text: 'Planner Name',
      value: {
        order: Constants.ORDER.descending,
        sort: Constants.SORT_FIELDS.vendorName,
      },
      iconName: Constants.ICON_TYPES.zToA,
      id: 'vendorNameDescending'
    }, {
      text: 'Date/Time of Review',
      value: {
        order: Constants.ORDER.ascending,
        sort: Constants.PRODUCT_SORT_FIELDS.createdAt
      },
      id: 'createdAtAscending',
      iconName: Constants.ICON_TYPES.lowToHigh,
    }, {
      text: 'Date/Time of Review',
      value: {
        order: Constants.ORDER.descending,
        sort: Constants.PRODUCT_SORT_FIELDS.createdAt
      },
      id: 'createdAtDescending',
      iconName: Constants.ICON_TYPES.highToLow,
    }
  ];

  public static readonly RATINGS_N_REVIEWS_VENDOR_FILTERS = [
    {
      text: 'Product Name',
      value: {
        order: Constants.ORDER.ascending,
        sort: Constants.SORT_FIELDS.productName,
      },
      iconName: Constants.ICON_TYPES.aToZ,
      id: 'productNameAscending'
    }, {
      text: 'Product Name',
      value: {
        order: Constants.ORDER.descending,
        sort: Constants.SORT_FIELDS.productName,
      },
      iconName: Constants.ICON_TYPES.zToA,
      id: 'productNameDescending'
    },
    ...Constants.COMMON_RATINGS_N_REVIEWS_VENDOR_FILTERS
  ];

  public static readonly ADMIN_PLANNER_SORTING =
    [
      {
        text: 'Planner Name',
        value: {
          order: Constants.ORDER.ascending,
          sort: 'firstName',
        },
        id: 'firstNameAscending',
        iconName: Constants.ICON_TYPES.aToZ,
      },
      {
        text: 'Planner Name',
        value: {
          order: Constants.ORDER.descending,
          sort: 'firstName'
        },
        id: 'firstNameDescending',
        iconName: Constants.ICON_TYPES.zToA,
      },
      {
        text: 'Company',
        value: {
          order: Constants.ORDER.ascending,
          sort: 'companyName',
        },
        id: 'companyNameAscending',
        iconName: Constants.ICON_TYPES.aToZ,
      },
      {
        text: 'Company',
        value: {
          order: Constants.ORDER.descending,
          sort: 'companyName',
        },
        id: 'companyNameDescending',
        iconName: Constants.ICON_TYPES.zToA,
      },
      {
        text: 'Total # of purchases',
        value: {
          order: Constants.ORDER.ascending,
          sort: 'totalNumberPurchase'
        },
        id: 'totalNumberPurchaseAscending',
        iconName: Constants.ICON_TYPES.lowToHigh,

      },
      {
        text: 'Total # of purchases',
        value: {
          order: Constants.ORDER.descending,
          sort: 'totalNumberPurchase'
        },
        id: 'totalNumberPurchaseDescending',
        iconName: Constants.ICON_TYPES.highToLow,

      },
      {
        text: 'Total purchase',
        value: {
          order: Constants.ORDER.ascending,
          sort: 'totalPurchaseAmount'
        },
        id: 'totalPurchaseAmountAscending',
        iconName: Constants.ICON_TYPES.lowToHigh,

      },
      {
        text: 'Total purchase',
        value: {
          order: Constants.ORDER.descending,
          sort: 'totalPurchaseAmount'
        },
        id: 'totalPurchaseAmountDescending',
        iconName: Constants.ICON_TYPES.highToLow,

      },
      {
        text: 'Email Address',
        value: {
          order: Constants.ORDER.ascending,
          sort: 'email',
        },
        id: 'emailAscending',
        iconName: Constants.ICON_TYPES.aToZ,
      },
      {
        text: 'Email Address',
        value: {
          order: Constants.ORDER.descending,
          sort: 'email'
        },
        id: 'emailDescending',
        iconName: Constants.ICON_TYPES.zToA,
      },
      {
        text: 'Last Login',
        value: {
          order: Constants.ORDER.ascending,
          sort: 'lastLogin'
        },
        id: 'lastLoginAscending',
        iconName: Constants.ICON_TYPES.lowToHigh,
      },
      {
        text: 'Last Login',
        value: {
          order: Constants.ORDER.descending,
          sort: 'lastLogin'
        },
        id: 'lastLoginDescending',
        iconName: Constants.ICON_TYPES.highToLow,
      },
      {
        text: 'Active Planner',
        value: {
          order: Constants.ORDER.descending,
          sort: 'status'
        },
        id: 'activStatus',
        iconName: Constants.ICON_TYPES.lowToHigh,

      },
      {
        text: 'Inactive Planner',
        value: {
          order: Constants.ORDER.ascending,
          sort: 'status'
        },
        id: 'InctivStatus',
        iconName: Constants.ICON_TYPES.highToLow,

      },
    ];

  public static readonly PROMO_CODE_SELECTALL = { _id: 'selectall', name: 'All' };

  public static readonly PROMO_CODE = {
    AMOUNT: 'AMOUNT',
    PERCENT: 'PERCENT',
    DOLLOR_SIGN: '$',
    PERCENT_SIGN: '%',
    ASSOCIATE_MORE_COUNT: 3,
    // tslint:disable-next-line: max-line-length
    TERMS_N_CONDITIONS: `<p>This <span>VENDOR AGREEMENT,</span> effective as of the date first listed above, and as may be updated from
            time to time, shall constitute a legally binding agreement ( “Agreement”) between you, your representatives,
            parent companies, subsidiaries, officers, directors and/or authorized agents (“User” or “Vendor”) and Events
            by Social, Inc. d/b/a Event Box, its parents, subsidiaries, members, representatives, affiliates, officers
            and directors (“Event Box”), and shall govern your use of the EVENT BOX website, technology platform and
            application (collectively, “Event Box Platform”). You agree to the following terms and conditions:</p>

          <p>PLEASE READ THESE TERMS AND CONDITIONS CAREFULLY. BY ACCESSING, DOWNLOADING, PURCHASING, USING, OR
            ATTEMPTING TO USE THE EVENT BOX PLATFORM YOU AGREE TO BECOME BOUND BY THESE TERMS AND CONDITIONS. IF YOU DO
            NOT AGREE TO ALL OF THESE TERMS AND CONDITIONS THEN YOU MAY NOT ACCESS AND USE, OR ATTEMPT TO USE, THE EVENT
            BOX PLATFORM.</p>

          <p><span>1. Acceptance of Terms.</span> This Agreement incorporates by reference the Vendor’s Membership
            Agreement entered into with Event Box upon registering for and joining the Event Box Platform. The terms of
            the Membership Agreement are incorporated herein by reference. </p>

          <p><span>2. Nature of Business.</span> Event Box provides a web-based platform called the Event Box Platform,
            that enables Vendors and people or businesses seeking event-related goods and/or services (“Planners”) to
            communicate and enter into an agreement directly between the parties (“Order”). The Event Box Platform only
            enables a connection between the parties. It does not, however, control, manage, monitor, or impact the
            fulfillment of an Order, nor does Event Box have or claim to have control over the quality, timing,
            legality, failure to provide, or any other aspect whatsoever of the work included in the Order. Event Box
            makes no warranties or representations about the suitability, reliability, timeliness, or accuracy of a
            Vendor, or its goods or services, except to the extent that User has been vetted by Event Box. </p>

          <p><span>3. Independent Contractor.</span> The Event Box Platform enables a Planner to search, review, select,
            arrange, schedule, design and purchase party related goods and services from vetted individuals or
            businesses, Vendors, that specialize in supplying party related goods and/or services. Planners and Vendors
            must have an account in order to access, contact, review, select, arrange, schedule, design, purchase, or
            sell services through the Event Box Platform. A decision to engage or use a Vendor’s services is determined
            by the Planner in his or her sole discretion. Vendors and Planners contract for event or party planning
            services directly with one another through the Event Box Platform, through an Order, identifying the goods
            and/or services selected, the price for the goods and/or services and other terms and conditions of the
            party services from the Vendor. Event Box is not a party to any contract between a Vendor and Planner and
            under no circumstance shall a Vendor be considered an employee of Event Box or any of its parents,
            subsidiaries, or related companies. USER UNDERSTANDS THAT HE/SHE/IT IS AN INDEPENDENT CONTRACTOR AND IS NOT
            NOW AND WILL NEVER BE AN EMPLOYEE OF EVENT BOX. VENDOR HEREBY ACKNOWLEDGES THAT EVENT BOX DOES NOT PROVIDE
            PARTY SERVICES AND THAT IT DOES NOT SUPERVISE, DIRECT, CONTROL, OR MONITOR VENDOR’S PARTY SERVICES. EVENT
            BOX IS NOT RESPONSIBLE IN ANY WAY, MANNER, OR FORM, FOR THE PARTY SERVICES THAT YOU PROVIDE. Event Box is
            compensated pursuant to the Vendor’s Membership Agreement, as may be modified from time to time by Event
            Box, in its sole discretion, upon notice to Vendor. </p>

          <p><span>4. Service Agreements, Payment and Commissions.</span> Vendors and Planners utilize the Event Box
            Platform to enter into a Service Agreement for goods and/or services. A Planner shall utilize the Event Box
            Platform to search for, select and request a quote from Vendor(s). Once a Vendor receives a request for a
            quote from a Planner, the Vendor has one hundred twenty (120) hours to provide a quote and provide the
            Planner with the requested information, including the cost for goods and/or services, accurate taxes and
            shipping and/or set up fees for labor and delivery, as applicable, as separate line items in the bid/quote
            (“Order”). Once received, a Planner has one hundred twenty (120) hours to either accept or reject the Quote.
            If the Planner accepts a quote, the Planner will have forty-eight (48) hours from the time the quote is
            accepted to pay for the Order. Payment shall be made through the Event Box Platform, using the credit card
            or other payment method on file with Event Box. (“Payment”). Event Box will accept the Payment on behalf of
            the Vendor. Event Box shall be paid a commission on the amount of the Order for goods and/or services, based
            on the commission amount agreed upon in the Membership Agreement, and retain that commission amount from the
            Payment, prior to paying Vendor the remaining funds. Vendor shall receive payment from Event Box on the
            Friday immediately following the date of the paid Order, as long as the payment was processed at least one
            hundred twenty (120) hours in advance of that Friday. If the Planner’s payment is processed less than one
            hundred twenty (120) hours prior to the immediate Friday, payment will be sent to Vendor on the following
            Friday. Event Box shall not derive any revenue from shipping and/or tax amounts quoted in the Order Planner
            shall be solely responsible for paying any related taxes and/or shipping fees pursuant to a confirmed Order.
            Vendor acknowledges, understands and agrees, that ACH transfers will be executed as explained above, but
            Vendor may have to wait three (3) or more business days for the money to clear and reflect in Vendor’s bank
            account.</p>

          <p><span>5. Submission of Reviews.</span> Vendor acknowledges and agrees that as part of the use and enjoyment
            of the Event Box Platform, Planners are encouraged to submit reviews and ratings of Vendors for goods and
            services received from the Vendors. However, Vendors and Planners understand and acknowledge that all
            reviews must follow a particular set of guidelines, including: </p>
          <ul>
            <li>Planner reviews and ratings of a Vendor are accurate, truthful and complete in all respects;</li>
            <li>Planner reviews and ratings shall be based on actual first-hand experiences with the Vendor and the
              goods and/or services received; </li>
            <li>Planner has the legal authority to disclose the information posted and it does not violate any local,
              state, federal or other law; </li>
            <li>Planner does not work for, no has any interest in, and does not serve on a board or, and/or is not
              related by blood or family, to any of the Vendors for which he/she/it submits a rating and/or review;
            </li>
            <li>Planner’s name and review information will be made available to the Vendor on which is being reviewed;
              and</li>
            <li>Event Box retains the full right and authority to delete, reject, or redact, a Planer’s reviews if they
              do not conform to our publication criteria, which may change from time to time in Event Box’s sole
              discretion.</li>
          </ul>
          <p>In the event that Vendor has evidence to materially rebut a Planner’s review or disputes the nature or
            terms of the Planner’s review, Event Box may, in its sole discretion intervene and delete the review on a
            case by case basis. </p>

          <p><span>6. Vendor Representation and Warranties.</span> Vendor represents and warrants that he/she/it has the
            legal authority and right to enter in this Agreement and that you are at least eighteen (18) years old.
            Vendor warrants that he/she/it has the right, authority and capacity to enter into and abide by the terms
            and conditions of this Agreement. Vendor shall provide services in accordance with the highest industry
            standards and deliver to the Planner high-quality products/services, for which the Vendor is fully qualified
            to offer. Vendor warrants that it is a business in good standing, is operating lawfully in accordance with
            all relevant laws, rules and/or regulations, with all required valid licenses, and insurance sufficient for
            its business. You are responsible for all information, correspondence, execution, timely execution and other
            bookings associated with your account. As such, you are solely responsible to secure access to your account
            and Planner information and prevent the unauthorized use of the same. If you are entering into this
            Agreement as the representative of a company or organization, you hereby represent and warrant that you are
            fully authorized to act on behalf of that entity and to bind the same to this Agreement. You further
            represent and warrant that you have read, understand and agree to be bound by the terms of this Agreement
            and of the Membership Agreement. You further represent and warrant that you will fulfill, per industry
            standards, the commitments that you make to other Users, including communicating clearly and timely through
            the Event Box Platform, and conducting yourself and your business in a professional manner, making yourself
            available to the Planner at the times and through the methods agreed. Further, Vendor agrees that he/she/it
            shall only receive payment for services booked or rendered through the Event Box Platform, and pursuant to
            the terms of this Agreement. In the event that during the delivery of goods and/or execution of services to
            the Planner, or during the course of Planner’s event, Vendor must charge Planner for goods and/or services
            that were not contemplated under the Order, Vendor may bill Planner directly for this additional work
            (“Additional Services”). Vendor agrees that they will use their best efforts to keep all transactions within
            the Event Box platform for any Additional Services. Vendor acknowledges that he/she/it is aware that Event
            Box shall utilize a third party payment processing system that is integrated into the Event Box Platform and
            consents to said use. </p>

          <p><span>7. Vendor Responsibilities.</span> Once Vendor has been approved by Event Box and issued an account,
            it is Vendor’s sole and exclusive responsibility to set up and manage his/her/its own account and listings.
            Each listing must contain an accurate and reasonably detailed description of the good or services offered,
            duration of the work, the price and any additional terms required for the listing. As a Vendor, you
            understand and agree that you are solely responsible for determining your own tax reporting and sales tax
            collection requirements and represent that you have consulted with a tax adviser. You must indicate the
            anticipated sales tax, if any, for each listing, based upon federal, state and local requirements and must
            review the invoice amount before entering into a Service Agreement to ensure that you have charged the
            correct amount of tax required. In addition to setting the prices and assessing the correct tax, you have
            agreed to provide a commission to Event Box for each Service Agreement, as outlined in your Membership
            Agreement. Event Box has established different commission rates for various categories of goods/service.
            Once a Vendor has agreed to a Service Agreement, unless a cancellation event has been triggered, you may not
            cancel the Service Agreement, or you shall be assessed a possible penalty as outlined herein. In the event
            that Vendor is unable to perform under an Order, Event Box may, in its sole and exclusive discretion, find a
            substitute vendor to provide goods and/or services similar to those contemplated under the Order, or may ask
            Vendor for a recommendation for substitute services to fulfill the order. </p>

          <p><span>8. Vetting.</span> In Event Box’s sole discretion, Vendors may be subject to an extensive vetting
            process before they can register for and use the Event Box Platform, including, but not limited to a
            verification of identity by using third party services as appropriate (“Identity Checks”). This requires the
            Vendor to supply Event Box with his/her social security number or its EIN number. Although Event Box may
            perform Identity Checks, it is not required to do so. Event Box does not assume any responsibility for the
            accuracy or reliability of Identity Check information or any information provided through the Event Box
            Platform. However, Event Box shall attempt to verify Vendor’s identity and to make sure that Vendor is not
            on the National Sex Offender Registry. Vendor shall perform his/her/its own background check for any of its
            employees or independent contractors who perform services or provide goods to a Planner pursuant to an
            Order. </p>

          <p class="mb-0"><span>9. Cancellation of Order Policy.</span> </p>
          <p><span>a. Cancellation by Planner.</span> Cancellation by Planner. It is our policy to allow Planners to
            cancel within 24 hours after paying for their order under the Terms and Conditions Agreement. </p>
          <p><span>b. Rescheduling by Planner.</span> It is our policy that paid orders are non-refundable after the
            cancellation period of 24 hours. If, for any reason, a planner requests to reschedule goods and/or services
            under an Order, Vendor shall make reasonable efforts to accommodate Planner’s request on a mutually agreed
            upon and available future date and time, within the same calendar year. Planner agrees and is aware that
            Planner is responsible to pay Vendor for any out of pocket and/or non-refundable expenses incurred by Vendor
            in order to rebook Planner’s goods and/or services, pursuant to the Order. The Vendor and Planner shall
            provide advance Notice to Event Box of any changes contemplated under this section.</p>
          <p><span>c. Cancellation by Mutual Consent.</span> In the event that a cancellation occurs by mutual consent
            between Planner and Vendor, all amounts shall be immediately refunded to the Planner. </p>
          <p><span>d. Cancellation by Event Box and Automatic Removal.</span> At any time, Event Box, in its sole
            discretion, for any reason whatsoever, has the right to revoke or suspend a Vendor’s right to list their
            products or services on the Event Box Platform. In the event that a Vendor enters into an Order that has
            been confirmed and no cancellation has occurred, and fails to meet its obligation under that Order by
            failing to appear or to deliver goods or services as agreed in the Order, the Vendor shall be automatically
            and immediately removed from the Event Box Platform. </p>
          <p><span>e. Excused Non-Performance.</span> Should events beyond the reasonable control of Vendor and Planner,
            including but not limited to (1) acts of God, (2) war, including armed conflict, (3) strikes or labor
            disputes, (4) Threat of Pandemic disease (examples of disease: COVID-19, SARS, Legionnaires), (5) government
            regulation or advisory (including travel advisory warnings), (6) civil disturbance, (7) terrorism or threats
            of terrorism in the United States and/or the state/country of the said Event, as substantiated by
            governmental warnings or advisory notices, (8) curtailment of transportation services or facilities which
            would materially affect attendees from attending the event, (9) disaster, fire, earthquakes, hurricanes in
            New York and/or the state/country of the said Event, (10) unseasonable extreme inclement weather in New York
            and/or the state/country of the said Event, (11) shortages or disruption of the electrical power supply
            causing blackouts or rolling blackouts or other essential utilities in New York and/or the state/country of
            the said Event, or (12) any other cause reasonably beyond the parties' control (collectively referred to as
            "occurrences"), making the event commercially impracticable, impracticable to perform, illegal, or
            impossible to fully perform under this Agreement as the Parties originally contracted. In such a case, the
            affected Party/Parties may postpone the event to a mutually agreed upon date within the contracted calendar
            year, upon written notification. Vendor shall appropriately apply advance payment to the mutually agreed
            upon date within the Contracted Calendar Year.</p>

          <p><span>10. Insurance.</span> Pursuant to the terms of the Membership Agreement, incorporated by reference
            herein, Vendor is required to have current, sufficient and appropriate coverage for his/her/its specific
            type of business. Vendor’s insurance policy shall name Events by Social, Inc. d/b/a Event Box as an
            additional insured party under its insurance policy. A copy of the policy certificate shall be furnished to
            Event Box as a condition to registration for the use of the Event Box Platform.</p>

          <p><span>11. Limited License.</span> Subject to the terms of this Agreement and the Membership Agreement,
            Event Box grants to Vendor a limited, non-exclusive, nontransferable, revocable license to reproduce and
            display its own promotional materials, trademark, personal and commercial information on the Event Box
            Platform only in connection with Vendor’s permitted access to and participation in the Event Box Platform.
            Vendor agrees that it will not exploit, copy, use, modify, adapt, prepare, distribute, stream, transmit,
            broadcast, sell, transfer, publicly display or perform information or materials available on or through the
            Event Box Platform, except as expressly permitted herein. The Event Box Platform is provided to Vendor “as
            is”. No other rights shall be conveyed or granted to Vendor except for those that have been expressly
            articulated herein. </p>

          <p><span>12. Customer Database.</span> Event Box may, from time to time, request that Vendor share or disclose
            to Event Box, the email contact information of its customer list or database, as may be amended from time to
            time, for the sole purpose of marketing Event Box to Vendor’s customers so that they subscribe to Event
            Box’s site and/or marketing materials (“Opt-Ins”). Vendor and Event Box shall separately agree to the number
            of Email blasts that will be used in order to seek Opt-Ins from Vendor’s customers. Pursuant to applicable
            law, any email sent by Event Box for the purpose of Opt-Ins or marketing purposes shall have an unsubscribe
            option that is fully functional and any request to unsubscribe shall be honored within ten (10) business
            days from receipt by Event Box, and pursuant to Event Box’s Privacy Policy.</p>

          <p><span>13. Privacy and Security.</span> As part of your Membership, you will be given a user account and a
            unique account number in order to access the Event Box Platform. You are the sole authorized user of your
            account and are responsible for maintaining the confidentiality of any log-in, password and account number
            provided to you by Event Box for accessing the Event Box Platform. You are also solely and fully responsible
            for all activities that occur under your password and/or account, even if not expressly authorized by you.
            Should you suspect any unauthorized party may be using your password or account, or you suspect any other
            breach of security or violation of use, you agree to immediately contact Event Box to report your suspicion
            or evidence of violation. By providing your email and phone number, you hereby affirmatively consent to
            Event Box’s use of the same to contact you with information about your Service Agreements, your account,
            changes or updates to the Event Box Platform, this Agreement or any marketing purpose, including reminders,
            push notifications, feedback or other information. You may contact Event Box for help or questions by
            emailing: support@myeventbox.com. </p>

          <p><span>14. Term and Termination.</span> The term of this Agreement (“Term”) will be in effect and continue
            as long as you are an active user of the Event Box Platform. In other words, the Term shall continue until
            termination by either party in accordance with the terms of this Agreement. Event Box may, at any time and
            for any reason, with or without cause, terminate the terms of this Agreement, and may terminate, limit or
            suspend a Vendor’s use and/or access to the Event Box Platform. In doing so, Event Box may also remove and
            discard any Content related to the Vendor and seek to cancel pending Service Agreements. Termination means
            that Vendor’s access to all offerings by Event Box and/or our Planners will be removed. Your account,
            password and all related information and files, which may include the deletion of the Content associated
            with Your account may also be removed. If Event Box terminates or suspends a Vendor from using the Event Box
            Platform, the Vendor shall be prohibited from registering and creating a new account under any name, real or
            assumed, without the express consent of Event Box, which may be unreasonably withheld. In the event of
            termination based on a breach of this Agreement, Event Box reserves the right to take appropriate legal
            action, including without limitation, pursuing arbitration, seeking injunctive relieve or other legal remedy
            permitted under this agreement. Vendor may terminate his/her/its use of the Event Box Platform and Your
            membership by canceling by emailing membership@myeventbox.com. In the event of termination, Event Box
            reserves the right to match a Planner with another Vendor to minimize any disruption in the Planner’s event.
            Vendor shall be permitted to cancel his/her/its membership with Event Box and this Agreement by canceling
            through the Vendor Portal. If Vendor is terminated, and is unable or unwilling to perform under any
            confirmed Order, Vender shall immediately refund Planner’s full payment made on the Event Box Platform for
            goods and/or services under the Order to Planner. </p>

          <p><span>15. Disputes/Conflict Resolution.</span> As stated above, Event Box is not a party to, nor
            responsible for, the delivery of goods and/or services contracted for under the Order. In the event that
            there is a dispute between a Vendor and Planner, Event Box may, in its sole discretion, and on a case by
            case basis, seek to resolve the dispute between a Vendor and Planner, at the Vendor and Planner’s sole
            expense.</p>

          <p><span>16. Disclaimer of Warranties.</span> Event Box makes no representation and offers no warranty
            associated with Vendor’s use of the Event Box Platform. Use of this service is at the sole risk of the
            Vendor. The Event Box Platform is offered “As Is”, with no warranties, either express or implied, including:
            fitness for a particular purpose, warranties of merchantability or non-infringement. Event Box makes no
            warranties or representations about the accuracy or completeness of the content provided through the Event
            Box Platform or the content of any sites linked thereto and assumes no liability or responsibility for any
            (i) errors, mistakes, or inaccuracies of content, (ii) personal injury or property damage, of any nature
            whatsoever, resulting from your access to and use of the Event Box Platform, (iii) any unauthorized access
            to or use of our secure servers and/or any and all personal information and/or financial information stored
            therein. Event Box does not warrant, endorse, guarantee or assume responsibility for any service advertised
            or offered by a party service provider through the Event Box Platform and will not be a party to or in any
            way be responsible for monitoring any transaction between a consumer and a party service provider, other
            than as provided herein. You should use your best judgment and exercise caution where appropriate. Without
            limiting the foregoing, neither Event Box nor its affiliates or licensors warrant that access to the Event
            Box platform will be uninterrupted or that it will be error-free; nor do we make any warranty as to the
            results that may be obtained from the use of our site, or as to the timeliness, accuracy, reliability,
            completeness or content of any good or service, information or materials provided through or in connection
            with the use of the Event Box platform. We also do not warrant that the site is free from viruses, worms,
            Trojan horses, or other harmful components. Event Box cannot and does not guarantee that any personal
            information supplied by you will not be misappropriated, intercepted, deleted, destroyed or used by others.
            In addition, notwithstanding any feature a consumer may use to select a party service provider, each
            consumer is responsible for determining the services they want and selecting their party service provider.
            Event Box does not provide any warranties or guarantees regarding any party service provider’s professional
            accreditation, registration or license.</p>

          <p class="mb-0"><span>17. Intellectual Property.</span></p>
          <p><span>a. Grant of License.</span> Event Box, in its sole discretion, may permit Vendor to upload, post,
            submit and/or transmit content on the Event Box Platform, in furtherance of the sale of its goods and/or
            services (“Vendor’s Generated Content”). Vendor Generated Content includes any information and materials
            provided by Vendor in connection with its registration for and use on the Event Box Platform. Vendor is
            solely responsible for the quality, nature and accuracy of Vendor’s Generated Content, and hereby warrants
            that it is not fraudulent, incomplete or misleading; it does not infringe on the rights of any third
            parties; does not violate any law, statute, or ordinance (consumer protection, unfair competition,
            anti-discrimination, false advertising, anti-spam or piracy, privacy); will not be defamatory, libelous,
            unlawfully threatening, harassing, harmful to minors, obscene or contain pornography; will not have viruses,
            Trojan Horses, worms, time bombs, cancelbots; will not cause Event Box harm to its reputation or impact its
            business growth in a negative manner. Vendor hereby grants Event Box a worldwide, irrevocable, perpetual,
            non-exclusive, transferrable, royalty-free license, with the right to sell, use, adapt, modify, sublicense,
            distribute, publicly display, transmit, stream, broadcast, access, make distributive works and otherwise
            exploit such content by any means and for any purpose, including to promote, market, or advertise the Event
            Box Platform or its services, or for any other purpose in Event Box’s sole discretion (“License”). The
            rights granted to Event Box in the License shall survive the termination of this Agreement and the
            Membership Agreement, and Vendor’s use of the Event Box Platform. Private messages between Vendor and
            Planners for the purpose of inquiry or negotiation a Service Agreement shall be excluded from the License.
          </p>
          <p><span>b. Ownership of Content.</span> Event Box does not claim ownership rights in any content that Vendor
            creates and nothing in this Agreement shall be deemed to restrict rights that Vendor may have to use any of
            its own content that it has uploaded, posted, published, or transmitted on or through the Event Box
            Platform. </p>
          <p><span>c. No Ownership.</span> Nothing in this Agreement or in the Membership Agreement shall convey any
            rights in any of the Event Box’s intellectual property to the Vendor. All text, graphics, editorial content,
            data, formatting, graphs, designs, HTML, photographs, music, sounds, images, software, look and feel, video,
            designs, trademarks, logos, slogans, typefaces and other content (“Proprietary Material”) shall remain the
            sole and exclusive property of Event Box. The Proprietary Material is protected under domestic and
            international copyright, trademark and patent law. </p>

          <p class="mb-0"><span>18. Miscellaneous.</span></p>
          <p><span>a. Modification.</span> Event Box reserves the right to modify and change this Agreement at any time.
            Such changes will be effective when posted. We may only amend portions of this Agreement and only to the
            extent allowed by applicable law. Notwithstanding the foregoing, a change in this Agreement shall not
            impact, change, or modify the terms of your individual Membership Agreement, the amount of commission you,
            as a Vendor, have agreed to share with Event Box, without the express consent of Event Box and Vendor. By
            continuing to use the Event Box Platform after we post any modification, you accept this Agreement as
            modified. </p>

          <p><span>b. Notices.</span> Vendor expressly agrees that Event Box, or any of its affiliates, subsidiaries,
            directors, agents, counsel or authorized person or business, may provide you with notices, regarding changes
            or updates to this Agreement, by email, regular mail, or postings on the Event Box Platform, which you are
            obligated, from time to time, to check. You may also be contacted by Event Box through the phone number that
            was submitted on the Membership Agreement, by a call or text message. All notices to Event Box will be
            provided by sending a letter, first class, certified mail to Event Box at 333 West 52nd Street, New York, NY
            10019, Suite #1008, Attn: Member Services. Such notices will be deemed delivered upon the earlier of the
            verification of delivery or two (2) business days after being sent. </p>
          <ul class="nested-ul">
            <li>To California Vendors, pursuant to California Civil Code, §1789.3, you are entitled to the following
              specific consumer rights notices: The services provided are by Event Box, 333 West 52nd Street, New York,
              NY 10019, Suite #1008. If you have any questions, concerns, or complaints regarding any services provided
              by Event Box, please contact Event Box by: (i) signing into your account and visiting
              support@myeventbox.com to correspond with a representative from Event Box; or (ii) sending a letter, first
              class, certified mail to Event Box, 333 West 52nd Street, New York, NY 10019, Suite #1008, Attn: Member
              Services. California residents may reach the Complaint Assistance Unit of the Division of Consumer
              Services of the California Department of Consumer Affairs may be contacted in writing at 1625 N. Market
              Blvd., Suite S-202, Sacramento, California 95834, or by telephone at (916) 445-1254, or (800) 952-5210, or
              Hearing Impaired at TDD (800) 326-2297, or TDD (916) 322-1700.</li>
          </ul>
          <p><span>c. Allegations of Copyright or Trademark Infringement.</span> In accordance with the Digital
            Millennium Copyright Act of 1998, Title 17 of the United States Code, Section 512 (the “DMCA”), Event Box
            shall respond promptly to claims of copyright or trademark infringement that are reported to Event Box’s
            designated agent by contacting: support@myeventbox.com. Event Box shall duly investigate notices of
            copyright and trademark infringement and take appropriate actions under the DMCA, provided that an alleged
            copyright or trademark owner, or agent authorized to act on an owner’s behalf, provides Event Box with
            written notification of claimed infringement that includes substantially the following information:</p>
          <ul class="nested-ul">
            <li>Identification of the copyrighted or trademarked claimed to have been infringed, or, if multiple
              materials, a representative list of such works, along with information reasonably sufficient to permit us
              to contact you, such as an address, telephone number and, if available, an email address; </li>
            <li>Evidence of ownership of the copyrighted or trademarked claimed to have been infringed; </li>
            <li>A physical or electronic signature of a person authorized to act on behalf of the owners of an exclusive
              right that is allegedly infringed; </li>
            <li>A statement that you have a bona fide or good faith belief that use of the material in the manner
              complained of is not authorized by the copyright or trademark owners, its agent, or the law; and</li>
            <li>A statement that the information in the notification is accurate, and under penalty of perjury, that you
              are authorized to act on behalf of the owner of an exclusive right that is allegedly infringed.</li>
          </ul>
          <p><span>d. No Liability.</span> Vendor hereby agrees, acknowledges and consents that it shall not hold Event
            Box, its affiliates, licensors, partners, agents, employees, officers, directors, corporate partners, or
            participants, liable for any damage, suits, claims, and/or controversies (collectively the “Liabilities”)
            that have arisen or may arise, whether known or unknown, relating to your or any other party’s use of or
            inability to use the Event Box Platform, including without limitation any liabilities arising in connection
            with the conduct, act or omission of any user (including, without limitation stalking, harassment, acts of
            physical, mental or emotional violence and the destruction or damage of property) any dispute with any other
            Vendor or Planner, any instruction, advice, act or service provided by Event Box, its affiliates, licensors,
            or any of its agents, employees, officers, directors, agents, counsel, corporate partners, or participants,
            be liable for any direct, indirect, incidental, consequential, special or exemplary damages arising in
            connection with your use or inability to use the Event Box Platform or any of Event Box’s related services,
            to the fullest extent permitted by governing and applicable law. Event Box does not accept any
            responsibility for the quality or fitness of any work performed or goods provided by a Vendor to a Planner
            through the Event Box Platform or related in any way to Event Box.</p>

          <p><span>e. Breach of Agreement and Liquidated Damages.</span> You expressly agree and acknowledge that,
            because damages are often difficult to calculate, if it becomes necessary for Event Box to pursue legal
            action to enforce the terms of this Agreement, You will be liable to pay us the following amounts of
            liquidated damages, where applicable, which You accept as reasonable estimates of Event Box’s damages for
            the specified breaches of this Agreement: </p>
          <ul class="nested-ul">
            <li>If you display, copy, duplicate, reproduce, sell, re-sell or exploit for any purposes any Content in
              violation of this Agreement, You agree to pay one thousand ($1,000) dollars for each item of Content
              displayed, copied, duplicated, reproduced, sold, re-sold, or exploited in violation of this Agreement.
            </li>
            <li>If you allow a Planner to engage your services after having made any contact or connection with the
              Planner and/or submitted a quote to Planner through the Event Box Platform, but enter into an agreement
              for the provision of goods and/or services to that Planner independent of the Event Box Platform, you
              agree to pay Event Box a commission fee of thirty (30%) percent of the value of your full agreement with
              the Planner.</li>
            <li>If You post Content in violation of this Agreement, You agree to promptly pay Event Box one thousand
              ($1,000) dollars for each item of Content posted in violation of this Agreement. We may (but shall not be
              required to) issue You a warning before assessing damages. </li>
            <li>Except as set forth to the contrary herein, You agree to pay the actual damages suffered by Event Box,
              including, but not limited to reasonable attorneys’ fees and court costs, to the extent such actual
              damages can be reasonably calculated. Notwithstanding any other provision of this Agreement, we reserve
              the right to seek the remedy of specific performance of any term contained herein, or a preliminary or
              permanent injunction against the breach of any such term or in aid of the exercise of any power granted in
              this Agreement, or any combination thereof. </li>
          </ul>
          <p><span>f. Indemnification.</span> Vendor hereby agrees to indemnify, defend, hold harmless Event Box, its
            directors, officers, employees, agents, licensors, attorneys, independent contractors, providers, successors
            and assigns, subsidiaries, parent company(ies) and affiliates from and against any and all claim, loss,
            expense or demand of liability, including attorneys’ fees and costs incurred, in connection with: (1)
            Vendor’s use or inability to use the Event Box Platform or to obtain work from a Planner; or (2) your
            violation of any law or rights of any other Vendor, Planner, Event Box, or related third-party; (3) your
            breach or violation of this Agreement or your Membership Agreement; (4) any content submitted by you to the
            Event Box Platform, including, without limitation content that is illegal, unlawful, unethical or incorrect,
            or infringes upon the rights, including intellectual property rights of any party other than Vendor. Event
            Box reserves the exclusive right, at Vendor’s expense, to assume the exclusive defense and control of any
            matter otherwise subject to this indemnification. Notwithstanding the foregoing, Vendor shall not settle any
            claim or matter without the express written consent of Event Box, which consent may be unreasonably
            withheld, provided that the settlement includes a complete release for the benefit of Event Box. </p>

          <p><span>g. Force majeure</span> Other than pending payment obligations, neither Event Box nor Vendor shall be
            liable to the other for any delay or failure in performance under this Agreement arising out of a cause
            beyond the control of either party, including, but not limited to: floods, fires, earthquakes, strikes,
            unavailability of required utilities, blackouts, acts of God, act of war, acts of regulatory agencies or the
            government, terrorism or terroristic acts, national emergencies, pandemics, or natural disasters.</p>

          <p><span>h. Entire Agreement.</span> This Agreement, including any attachments and related agreements,
            including, without limitation the Membership Agreement and the Privacy Policy, or as otherwise incorporated
            by reference, sets forth the entire agreement between Event Box and Vendor, with regard to the subject
            matter hereof. All prior agreements, representations and warranties, express or implied, oral or written,
            with respect to the subject matter hereof, are superseded by this Agreement. If any provision of this
            Agreement is deemed invalid by a court of competent jurisdiction, the invalidity of such provision shall not
            affect the validity of the remaining provisions of the Agreement, which shall remain in full force and
            effect. </p>

          <p><span>i. Assignments; Waiver; Severability.</span> This Agreement may not be assigned by Vendor without the
            prior written consent of Event Box, which may be unreasonably withheld in Event Box’s sold discretion and
            any attempt to do so shall be null and void and of no effect. Failure by either party at any time to require
            performance by the other party or to claim a breach of a provision of this Agreement shall not be construed
            as a waiver of any right accruing under this Agreement, nor shall it affect any subsequent breach, the
            effectiveness of this Agreement, or any part hereof, nor shall it prejudice either party regarding any
            subsequent action. No provision may be amended, modified, terminated, or revoked, except by a writing signed
            by all parties hereto. This Agreement shall inure to the benefit of and be binding upon the parties hereto
            and their respective successors and any permitted assigns. If any provisions of this Agreement shall be
            invalid, illegal, or unenforceable for any reason, the remaining terms and provisions shall be unaffected
            thereby and shall continue in full force and effect. </p>

          <p><span>j. Construction.</span> Each party represents that they have read this Agreement, and that they have
            had the opportunity to review the same with an attorney of its choice. All counsel shall be held harmless in
            the event that there is any dispute relating to the drafting, construction, or interpretation of this
            Agreement. </p>

          <p><span>k. Choice of Law and Venue.</span> This Agreement shall be governed by and construed in accordance
            with the laws of the State, City and County of New York, without regard to the conflicts of law provisions
            of such State. The Parties hereby further irrevocably and unconditionally waive and agree not to plead or
            claim that any action, suit or proceeding has been brought in an inconvenient forum. Vendor agrees that
            regardless of any statute or law to the contrary, any claim arising out of or relating to this Agreement or
            the Event Box Platform, or any services offered by Event Box or the Event Box Platform must commence within
            three (3) months after the claim or cause of action arises. Otherwise, such claim or cause of action is
            permanently barred, unless not permitted by relevant law.</p>

          <p><span>l. Arbitration.</span> You hereby agree and consent to engage in Arbitration for any dispute, claim,
            or controversy arising out of or relating to the breach, dispute, termination, enforcement, interpretation,
            or validity of this Agreement and Event Box and Vendor both waive their respective rights to a jury trial to
            participate as a Plaintiff or class member in any purported class action or proceeding. Any arbitration
            shall be conducted on an individual basis, and not a class, consolidated or representative proceeding. Any
            arbitration shall be governed and administered by the American Arbitration Association (“AAA”) in accordance
            with its Consumer Arbitration Rules and Supplementary Procedures, in existence at the time of dispute.
            However, for applicable matters, each party hereby reserves its right to seek relief in equity or injunctive
            relief in a court of competent jurisdiction in New York, to prevent the immediate, urgent, threatened or
            actual infringement, misappropriation, or violation of a party’s intellectual property rights, including
            copyrights, trademarks, trade secrets, patents or other rights.</p>

          <p><span>m. Section Headings.</span> The use of section headings in this Agreement are for the convenience of
            the parties only and have no legally binding or contractual effect.</p>`,
    ASSOCIATED_VENDORS_ALL: 'all',
    minCartValueErrortype: 'MINIMUM_CART_VALUE_MUST',
    TITLE_ALREADY_IN_USE: 'TITLE_ALREADY_IN_USE',
    PERCENT_MAX_LENGTH: 3,
    AMOUNT_MAX_LENGTH: 10
  };

  public static readonly PROMO_CODE_PREFIX_SUFFIX = {
    AMOUNT: { MAX_LENGTH: 11, PREFIX_SIGN: '$', SUFFIX_SIGN: '' },
    PERCENT: { MAX_LENGTH: 4, PREFIX_SIGN: '', SUFFIX_SIGN: '%' }
  };

  public static readonly PROMO_CODE_TYPE = [{
    id: 'percent',
    text: 'Discount %',
    value: Constants.PROMO_CODE.PERCENT
  }, {
    id: 'amount',
    text: '$ Amount',
    value: Constants.PROMO_CODE.AMOUNT
  }];

  public static readonly PROMO_CODE_DATE_FIELD = {
    promoCodeStartDate: 'promoCodeStartDate',
    promoCodeEndDate: 'promoCodeEndDate'
  };

  public static readonly MEMBERSHIP_DATE_FIELD = {
    startDate: 'startDate'
  };


  public static readonly PAYMENT_STATUS = {
    PURCHASED: 'PURCHASED',
    CANCELLED: 'CANCELLED',
    REFUNDED: 'REFUNDED'
  };

  public static readonly REFUND_STATUS = {
    pending: 'Pending',
    succeeded: 'Completed', failed: 'Failed', canceled: 'Canceled'
  };

  public static readonly PAYMENT_STATUS_TEXT = {
    [Constants.PAYMENT_STATUS.CANCELLED]: 'Canceled',
    [Constants.PAYMENT_STATUS.REFUNDED]: 'Refunded'
  };

  public static readonly ADMIN_PROMO_CODE_SORTING =
    [
      {
        text: 'Promo Code',
        value: {
          order: Constants.ORDER.ascending,
          sort: 'promocodeSlug',
        },
        id: 'titleAscending',
        iconName: Constants.ICON_TYPES.aToZ,
      },
      {
        text: 'Promo Code',
        value: {
          order: Constants.ORDER.descending,
          sort: 'promocodeSlug'
        },
        id: 'titleDescending',
        iconName: Constants.ICON_TYPES.zToA,

      },
      {
        text: 'Type',
        value: {
          order: Constants.ORDER.ascending,
          sort: 'promoCodeType',
        },
        id: 'typeAscending',
        iconName: Constants.ICON_TYPES.promoType,
      },
      {
        text: 'Type',
        value: {
          order: Constants.ORDER.descending,
          sort: 'promoCodeType'
        },
        id: 'typeDescending',
        iconName: Constants.ICON_TYPES.promoTypeRev,
      },
      {
        text: 'Value',
        value: {
          order: Constants.ORDER.ascending,
          sort: 'promoCodeValue',
        },
        id: 'valueAscending',
        iconName: Constants.ICON_TYPES.lowToHigh,
      },
      {
        text: 'Value',
        value: {
          order: Constants.ORDER.descending,
          sort: 'promoCodeValue'
        },
        id: 'valueDescending',
        iconName: Constants.ICON_TYPES.highToLow,
      },
      {
        text: 'Order Above',
        value: {
          order: Constants.ORDER.ascending,
          sort: 'promoCodeThreshold',
        },
        id: 'orderAboveAscending',
        iconName: Constants.ICON_TYPES.lowToHigh,
      },
      {
        text: 'Order Above',
        value: {
          order: Constants.ORDER.descending,
          sort: 'promoCodeThreshold'
        },
        id: 'orderAboveDescending',
        iconName: Constants.ICON_TYPES.highToLow,
      },
      {
        text: 'Start Date',
        value: {
          order: Constants.ORDER.ascending,
          sort: 'promoCodeStartDate'
        },
        id: 'startDateAscending',
        iconName: Constants.ICON_TYPES.lowToHigh,
      },
      {
        text: 'Start Date',
        value: {
          order: Constants.ORDER.descending,
          sort: 'promoCodeStartDate'
        },
        id: 'startDateDescending',
        iconName: Constants.ICON_TYPES.highToLow,
      },
      {
        text: 'End Date',
        value: {
          order: Constants.ORDER.ascending,
          sort: 'promoCodeEndDate'
        },
        id: 'endDateAscending',
        iconName: Constants.ICON_TYPES.lowToHigh,
      },
      {
        text: 'End Date',
        value: {
          order: Constants.ORDER.descending,
          sort: 'promoCodeEndDate'
        },
        id: 'endDateDescending',
        iconName: Constants.ICON_TYPES.highToLow,
      },
    ];

  public static readonly ADMIN_VENDOR_SORTING =
    [
      {
        text: 'Company',
        value: {
          order: Constants.ORDER.ascending,
          sort: 'companyName',
        },
        id: 'companyNameAscending',
        iconName: Constants.ICON_TYPES.aToZ,
      },
      {
        text: 'Company',
        value: {
          order: Constants.ORDER.descending,
          sort: 'companyName'
        },
        id: 'companyNameDescending',
        iconName: Constants.ICON_TYPES.zToA,

      },
      {
        text: 'Vendor Name',
        value: {
          order: Constants.ORDER.ascending,
          sort: 'fullName',
        },
        id: 'firstNameAscending',
        iconName: Constants.ICON_TYPES.aToZ,
      },
      {
        text: 'Vendor Name',
        value: {
          order: Constants.ORDER.descending,
          sort: 'fullName'
        },
        id: 'firstNameDescending',
        iconName: Constants.ICON_TYPES.zToA,

      },
      {
        text: 'Email Address',
        value: {
          order: Constants.ORDER.ascending,
          sort: 'email',
        },
        id: 'emailAscending',
        iconName: Constants.ICON_TYPES.aToZ,
      },
      {
        text: 'Email Address',
        value: {
          order: Constants.ORDER.descending,
          sort: 'email'
        },
        id: 'emailDescending',
        iconName: Constants.ICON_TYPES.zToA,
      },
      {
        text: 'Total Gross',
        value: {
          order: Constants.ORDER.ascending,
          sort: Constants.SORT_FIELDS.totalGrossAmount,
        },
        iconName: Constants.ICON_TYPES.lowToHigh,
        id: 'totalGrossAscending'
      },
      {
        text: 'Total Gross',
        value: {
          order: Constants.ORDER.descending,
          sort: Constants.SORT_FIELDS.totalGrossAmount,
        },
        iconName: Constants.ICON_TYPES.highToLow,
        id: 'totalGrossDescending'
      },
      {
        text: 'Last Login',
        value: {
          order: Constants.ORDER.ascending,
          sort: 'lastLogin'
        },
        id: 'lastLoginAscending',
        iconName: Constants.ICON_TYPES.lowToHigh,
      },
      {
        text: 'Last Login',
        value: {
          order: Constants.ORDER.descending,
          sort: 'lastLogin'
        },
        id: 'lastLoginDescending',
        iconName: Constants.ICON_TYPES.highToLow,
      },
      {
        text: 'Active Vendor',
        value: {
          order: Constants.ORDER.descending,
          sort: 'company.status'
        },
        id: 'activStatus',
        iconName: Constants.ICON_TYPES.lowToHigh,

      },
      {
        text: 'Inactive Vendor',
        value: {
          order: Constants.ORDER.ascending,
          sort: 'company.status'
        },
        id: 'InctivStatus',
        iconName: Constants.ICON_TYPES.highToLow,

      }
    ];

  public static readonly ADMIN_PENDING_VENDOR_SORTING =
    [
      {
        text: 'Company',
        value: {
          order: Constants.ORDER.ascending,
          sort: 'companyName',
        },
        id: 'companyNameAscending',
        iconName: Constants.ICON_TYPES.aToZ,
      },
      {
        text: 'Company',
        value: {
          order: Constants.ORDER.descending,
          sort: 'companyName'
        },
        id: 'companyNameDescending',
        iconName: Constants.ICON_TYPES.zToA,

      },
      {
        text: 'First Name',
        value: {
          order: Constants.ORDER.ascending,
          sort: 'firstName',
        },
        id: 'firstNameAscending',
        iconName: Constants.ICON_TYPES.aToZ,
      },
      {
        text: 'First Name',
        value: {
          order: Constants.ORDER.descending,
          sort: 'firstName'
        },
        id: 'firstNameDescending',
        iconName: Constants.ICON_TYPES.zToA,

      },
      {
        text: 'Last Name',
        value: {
          order: Constants.ORDER.ascending,
          sort: 'lastName',
        },
        id: 'LastNameAscending',
        iconName: Constants.ICON_TYPES.aToZ,
      },
      {
        text: 'Last Name',
        value: {
          order: Constants.ORDER.descending,
          sort: 'lastName'
        },
        id: 'LastNameDescending',
        iconName: Constants.ICON_TYPES.zToA,
      },
      {
        text: 'Email Address',
        value: {
          order: Constants.ORDER.ascending,
          sort: 'email',
        },
        id: 'emailAscending',
        iconName: Constants.ICON_TYPES.aToZ,
      },
      {
        text: 'Email Address',
        value: {
          order: Constants.ORDER.descending,
          sort: 'email'
        },
        id: 'emailDescending',
        iconName: Constants.ICON_TYPES.zToA,
      },
      {
        text: 'Date and Time Signed Up',
        value: {
          order: Constants.ORDER.ascending,
          sort: Constants.PRODUCT_SORT_FIELDS.createdAt
        },
        id: 'createdAtAscending',
        iconName: Constants.ICON_TYPES.lowToHigh,
      },
      {
        text: 'Date and Time Signed Up',
        value: {
          order: Constants.ORDER.descending,
          sort: Constants.PRODUCT_SORT_FIELDS.createdAt
        },
        id: 'createdAtDescending',
        iconName: Constants.ICON_TYPES.highToLow,
      },
    ];


  public static readonly ADMIN_REJECTED_VENDOR_SORTING = [
    ...Constants.ADMIN_PENDING_VENDOR_SORTING,
    {
      text: 'Rejected Date',
      value: {
        order: Constants.ORDER.ascending,
        sort: 'updatedAt'
      },
      id: 'updatedAtAscending',
      iconName: Constants.ICON_TYPES.lowToHigh,
    },
    {
      text: 'Rejected Date',
      value: {
        order: Constants.ORDER.descending,
        sort: 'updatedAt'
      },
      id: 'updatedAtDescending',
      iconName: Constants.ICON_TYPES.highToLow,
    }
  ];

  public static readonly DATE_PICKER_ADMIN_VALIDATIONS = {
    startDate: {
      min: null,
      max: null,
      ...Constants.DATE_CONFIG,
      disableKeypress: false
    },
    endDate: {
      min: null,
      max: null,
      ...Constants.DATE_CONFIG,
      disableKeypress: false
    },
    promoCodeStartDate: {
      min: null,
      max: null,
      ...Constants.DATE_CONFIG
    },
    promoCodeEndDate: {
      min: null,
      max: null,
      ...Constants.DATE_CONFIG
    }
  };

  public static readonly DATE_PICKER_VALIDATIONS = {
    eventEndDate: {
      min: null,
      max: null,
      ...Constants.DATE_PICKER_CONFIG
    },
    promoCodeStartDate: {
      min: null,
      max: null,
      ...Constants.DATE_CONFIG
    },
    promoCodeEndDate: {
      min: null,
      max: null,
      ...Constants.DATE_CONFIG
    },
    eventStartTime: {
      min: null,
      max: null,
      ...Constants.DATE_PICKER_CONFIG
    },
    eventEndTime: {
      min: null,
      max: null,
      ...Constants.DATE_PICKER_CONFIG
    },
    eventStartDate: {
      max: null,
      ...Constants.DATE_PICKER_CONFIG
    },
    startDate: {
      min: null,
      max: null,
      ...Constants.DATE_PICKER_CONFIG
    },
    endDate: {
      min: null,
      max: null,
      ...Constants.DATE_PICKER_CONFIG
    },
    deliveryStartDate: {
      min: null,
      max: null,
      ...Constants.DATE_PICKER_CONFIG
    },
    deliveryEndDate: {
      min: null,
      max: null,
      ...Constants.DATE_PICKER_CONFIG
    },
    setUpFromDate: {
      min: null,
      max: null,
      ...Constants.DATE_PICKER_CONFIG
    },
    setUpToDate: {
      min: null,
      max: null,
      ...Constants.DATE_PICKER_CONFIG
    },

    breakDownStartDate: {
      min: null,
      max: null,
      ...Constants.DATE_PICKER_CONFIG
    },
    breakDownEndDate: {
      min: null,
      max: null,
      ...Constants.DATE_PICKER_CONFIG
    },
  };

  public static readonly DATE_VALIDATION = {
    PREFIX: 'prefix',
    SUFFIX: 'suffix'
  };
  public static readonly FRACTION_TO_ROLL_BACK = 50;
  public static readonly ADMIN_VENDOR_EDIT_FIELDS_TO_PATCH = {
    commissionPercent: 'commissionPercent',
    setupFee: 'setupFee', yearlySubscriptionFee: 'yearlySubscriptionFee',
    startDate: 'startDate', planFrequency: 'planFrequency'
  };

  public static readonly QUOTE_SECTION_QUERY_PARAMS = {
    quotePendingPayment: { order: 1, sort: 'events.startdate' },
    awaitingVendorQuotes: { order: 1, sort: 'quoteRequestedDate' }
  };
  public static readonly QUOTE_SECTION_TAB_HEADING = {
    acceptRej: 'accept-reject-quotes',
    awaiting: 'awaiting-vendor-quotes',
    quotePending: 'quote-pending-payment',
    expired: 'expired-quotes'
  };

  public static readonly API_DATE_FILTER_FORMAT = 'YYYY-MM-DD';
  public static readonly DISPLAY_DATE_FILTER_FORMAT = 'MM-DD-YYYY';
  public static readonly API_DATE_FILTER_TYPE = {
    month: 'month',
    year: 'year',
    quarter: 'quarter',
    all: 'all'
  };

  public static readonly DATE_FILTER_OPTIONS = [{
    id: Constants.API_DATE_FILTER_TYPE.month,
    text: 'Current Month'
  },
  {
    id: Constants.API_DATE_FILTER_TYPE.quarter,
    text: 'Current Quarter'
  },
  {
    id: Constants.API_DATE_FILTER_TYPE.year,
    text: 'Current Year'
  }];

  public static readonly PARTNER_REPORT_FILTER = [{
    id: Constants.API_DATE_FILTER_TYPE.month,
    text: 'Current Month'
  },
  {
    id: Constants.API_DATE_FILTER_TYPE.all,
    text: 'All'
  }];


  public static readonly SKIP_SCROLL_TOP = ['/event/event-detail/', '/admin/events/'];
  public static readonly ADMIN_REPORT_FILTER_TYPE = { order: 'order', quote: 'quote' };
  public static readonly EXPORTS_DATA = {
    events: {
      exportType: 'events',
      past: 'past',
      upcoming: 'upcoming'
    },
    vendors: 'vendors',
    planners: 'planners',
    orders: {
      exportType: 'orders',
      purchased: 'PURCHASED',
      canceled: 'CANCELLED'
    },
    products: {
      exportType: 'products'
    },
    vendorListAdmin: {
      extraParams: { order: -1, sort: 'lastLogin' }
    },
    payout: {
      exportType: 'payout'
    }
  };

  public static readonly AUTO_DETECT_DEBOUNCE_TIME = 1000;
  public static readonly STAY_SIGN_IN_DAYS = 10;
  public static readonly DEFAULT_COUNTRY_CODE = '+1';

  public static readonly PLANNER_QUOTE_STATUS = {
    ACCEPTED_QUOTES: { status: `Accepted` },
    REJECTED_QUOTES: { status: `Planner Rejected` },
    ACCEPT_REJECT_QUOTES: { status: `Quote Sent` },
    EXPIRED_QUOTES: { status: `Expired` },
    DECLINED_QUOTES: { status: `Declined` },
    PENDING: { status: `Pending` },
    REJECTED_BY_VENDOR: { status: 'Vendor Rejected' },
    CANCELED_QUOTES: {status: 'Canceled By Vendor'}
  };

  public static readonly CANCELED_ORDER_PERIOD = 24;
  public static readonly X_AXIS_MONTHLY_INTERVAL = 5;
  public static readonly NEW_ORDERS_ADMIN_DASHBOARD = 5;
  public static readonly AVG_PURCHASED_ORDERS_PRECISON = 2;
  public static readonly MAX_ZIP_LENGTH = 5;
  public static readonly PRECISION_FIXED = 2;
  public static readonly ACCEPT_VENDOR_FORM = {
    FEE_PATTERN: '^[0-9]*(\.[0-9]{0,2})$'
  };
  public static readonly MODAL_EXTRA_LG = 'modal-extra-large';
  public static readonly QUOTE_REQUEST_PROCESS_DEBOUNCE = 1000;
  public static readonly PARTNER_ORDER_TYPES = {
    vendorOrders: 'vendor',
    plannerOrders: 'planner'
  };

  public static readonly PARTNER_ADD_PROFILE_TAB = {
    basicDetails: 1,
    commissionDetails: 2,
    bankDetails: 3
  };

  public static readonly ADD_PARTNER_DATE_FIELD = {
    startDate: 'startDate',
    endDate: 'endDate'
  };
  public static readonly MAP_PARTNER_BANK_FIELDS =
    {
      account_holder_name: 'accountHolderName',
      account_number: 'accountNumber',
      bank_name: 'bankName',
      routing_number: 'routingNumber',
      tax_id: 'tax_id'
    };

  public static readonly PARTNER_LIST_SORT =
    [{
      text: 'Business Name',
      value: {
        order: Constants.ORDER.ascending,
        sort: 'partnerDetails.businessName',
      },
      id: 'businessNameAscending',
      iconName: Constants.ICON_TYPES.aToZ,
    }, {
      text: 'Business Name',
      value: {
        order: Constants.ORDER.descending,
        sort: 'partnerDetails.businessName'
      },
      id: 'businessNameDescending',
      iconName: Constants.ICON_TYPES.zToA,
    },
    {
      text: 'Partner Name',
      value: {
        order: Constants.ORDER.ascending,
        sort: 'name'
      },
      id: 'nameAsc',
      iconName: Constants.ICON_TYPES.aToZ,
    },
    {
      text: 'Partner Name',
      value: {
        order: Constants.ORDER.descending,
        sort: 'name'
      },
      id: 'nameDsc',
      iconName: Constants.ICON_TYPES.zToA,
    },
    {
      text: 'Start Date',
      value: {
        order: Constants.ORDER.ascending,
        sort: 'partnerDetails.startDate',
      },
      id: 'startDateAddedAscending',
      iconName: Constants.ICON_TYPES.lowToHigh,
    }, {
      text: 'Start Date',
      value: {
        order: Constants.ORDER.descending,
        sort: 'partnerDetails.startDate'
      },
      id: 'startDateAddedDescending',
      iconName: Constants.ICON_TYPES.highToLow,
    },
    {
      text: 'End Date',
      value: {
        order: Constants.ORDER.ascending,
        sort: 'partnerDetails.endDate',
      },
      id: 'endDateAddedAscending',
      iconName: Constants.ICON_TYPES.lowToHigh,
    }, {
      text: 'End Date',
      value: {
        order: Constants.ORDER.descending,
        sort: 'partnerDetails.endDate'
      },
      id: 'endDateAddedDescending',
      iconName: Constants.ICON_TYPES.highToLow,
    },
    {
      text: 'Total Vendors',
      value: {
        order: Constants.ORDER.ascending,
        sort: 'referrals.vendor'
      },
      id: 'vendorsLowToHigh',
      iconName: Constants.ICON_TYPES.lowToHigh,
    },
    {
      text: 'Total Vendors',
      value: {
        order: Constants.ORDER.descending,
        sort: 'referrals.vendor'
      },
      id: 'vendorsHighToLow',
      iconName: Constants.ICON_TYPES.highToLow,
    },
    {
      text: 'Total Planners',
      value: {
        order: Constants.ORDER.ascending,
        sort: 'referrals.planner'
      },
      id: 'plannersLowToHigh',
      iconName: Constants.ICON_TYPES.lowToHigh,
    },
    {
      text: 'Total Planners',
      value: {
        order: Constants.ORDER.descending,
        sort: 'referrals.planner'
      },
      id: 'plannersHighToLow',
      iconName: Constants.ICON_TYPES.highToLow,
    },
    {
      text: 'Vendor Sales',
      value: {
        order: Constants.ORDER.ascending,
        sort: 'vendorSales'
      },
      id: 'vendorSellLowToHigh',
      iconName: Constants.ICON_TYPES.lowToHigh,
    },
    {
      text: 'Vendor Sales',
      value: {
        order: Constants.ORDER.descending,
        sort: 'vendorSales'
      },
      id: 'vendorSellHighToLow',
      iconName: Constants.ICON_TYPES.highToLow,
    },
    {
      text: 'Planner Purchases',
      value: {
        order: Constants.ORDER.ascending,
        sort: 'plannerPurchase'
      },
      id: 'plannerPurchaseLowToHigh',
      iconName: Constants.ICON_TYPES.lowToHigh,
    },
    {
      text: 'Planner Purchases',
      value: {
        order: Constants.ORDER.descending,
        sort: 'plannerPurchase'
      },
      id: 'plannerPurchaseHighToLow',
      iconName: Constants.ICON_TYPES.highToLow,
    },

    ];

  // partner vendor sort
  public static readonly PARTNER_VENDOR_SORT =
    [{
      text: 'Company Name',
      value: {
        order: Constants.ORDER.ascending,
        sort: 'name',
      },
      id: 'businessNameAscending',
      iconName: Constants.ICON_TYPES.aToZ,
    }, {
      text: 'Company Name',
      value: {
        order: Constants.ORDER.descending,
        sort: 'name'
      },
      id: 'businessNameDescending',
      iconName: Constants.ICON_TYPES.zToA,
    },
    {
      text: 'Email',
      value: {
        order: Constants.ORDER.ascending,
        sort: 'companyAdmin.email'
      },
      id: 'emailAsc',
      iconName: Constants.ICON_TYPES.aToZ,
    },
    {
      text: 'Email',
      value: {
        order: Constants.ORDER.descending,
        sort: 'companyAdmin.email'
      },
      id: 'emailDsc',
      iconName: Constants.ICON_TYPES.zToA,
    },
    {
      text: 'Total Gross',
      value: {
        order: Constants.ORDER.ascending,
        sort: 'commissions.totalSale'
      },
      id: 'totalSellLowToHigh',
      iconName: Constants.ICON_TYPES.lowToHigh,
    },
    {
      text: 'Total Gross',
      value: {
        order: Constants.ORDER.descending,
        sort: 'commissions.totalSale'
      },
      id: 'totalSellsHighToLow',
      iconName: Constants.ICON_TYPES.highToLow,
    },
    {
      text: 'Event Box Revenue',
      value: {
        order: Constants.ORDER.ascending,
        sort: 'commissions.eventBoxAmount'
      },
      id: 'revenueLowToHigh',
      iconName: Constants.ICON_TYPES.lowToHigh,
    },
    {
      text: 'Event Box Revenue',
      value: {
        order: Constants.ORDER.descending,
        sort: 'commissions.eventBoxAmount'
      },
      id: 'revenueHighToLow',
      iconName: Constants.ICON_TYPES.highToLow,
    },
    {
      text: 'Partner Revenue',
      value: {
        order: Constants.ORDER.ascending,
        sort: 'commissions.partnerAmount'
      },
      id: 'partnerRevenueLowToHigh',
      iconName: Constants.ICON_TYPES.lowToHigh,
    },
    {
      text: 'Partner Revenue',
      value: {
        order: Constants.ORDER.descending,
        sort: 'commissions.partnerAmount'
      },
      id: 'partnerRevenueHighToLow',
      iconName: Constants.ICON_TYPES.highToLow,
    },
    ];


  public static readonly PARTNER_PLANNER_SORT =
    [{
      text: 'Planner Name',
      value: {
        order: Constants.ORDER.ascending,
        sort: 'name',
      },
      id: 'plannerNameAscending',
      iconName: Constants.ICON_TYPES.aToZ,
    }, {
      text: 'Planner Name',
      value: {
        order: Constants.ORDER.descending,
        sort: 'name'
      },
      id: 'plannerNameDescending',
      iconName: Constants.ICON_TYPES.zToA,
    },
    {
      text: 'Company',
      value: {
        order: Constants.ORDER.ascending,
        sort: 'companyName',
      },
      id: 'companyNameAscending',
      iconName: Constants.ICON_TYPES.aToZ,
    }, {
      text: 'Company',
      value: {
        order: Constants.ORDER.descending,
        sort: 'companyName'
      },
      id: 'companyNameDescending',
      iconName: Constants.ICON_TYPES.zToA,
    },
    {
      text: 'Email',
      value: {
        order: Constants.ORDER.ascending,
        sort: 'email'
      },
      id: 'emailAsc',
      iconName: Constants.ICON_TYPES.aToZ,
    },
    {
      text: 'Email',
      value: {
        order: Constants.ORDER.descending,
        sort: 'email'
      },
      id: 'emailDsc',
      iconName: Constants.ICON_TYPES.zToA,
    },
    {
      text: 'Total Paid',
      value: {
        order: Constants.ORDER.ascending,
        sort: 'commissions.totalPaid'
      },
      id: 'totalPaidLowToHigh',
      iconName: Constants.ICON_TYPES.lowToHigh,
    },
    {
      text: 'Total Paid',
      value: {
        order: Constants.ORDER.descending,
        sort: 'commissions.totalPaid'
      },
      id: 'totalPaidHighToLow',
      iconName: Constants.ICON_TYPES.highToLow,
    },
    {
      text: 'Event Box Revenue',
      value: {
        order: Constants.ORDER.ascending,
        sort: 'commissions.eventBoxAmount'
      },
      id: 'revenueLowToHigh',
      iconName: Constants.ICON_TYPES.lowToHigh,
    },
    {
      text: 'Event Box Revenue',
      value: {
        order: Constants.ORDER.descending,
        sort: 'commissions.eventBoxAmount'
      },
      id: 'revenueHighToLow',
      iconName: Constants.ICON_TYPES.highToLow,
    },
    {
      text: 'Partner Revenue',
      value: {
        order: Constants.ORDER.ascending,
        sort: 'commissions.partnerAmount'
      },
      id: 'partnerRevenueLowToHigh',
      iconName: Constants.ICON_TYPES.lowToHigh,
    },
    {
      text: 'Partner Revenue',
      value: {
        order: Constants.ORDER.descending,
        sort: 'commissions.partnerAmount'
      },
      id: 'partnerRevenueHighToLow',
      iconName: Constants.ICON_TYPES.highToLow,
    },
    ];

  public static readonly PARTNER_ORDERS_SORT =
    [
      {
        text: 'Product/Service Purchased',
        value: {
          order: Constants.ORDER.ascending,
          sort: Constants.SORT_FIELDS.productName,
        },
        id: 'productNameAscending',
        iconName: Constants.ICON_TYPES.aToZ,
      }, {
        text: 'Product/Service Purchased',
        value: {
          order: Constants.ORDER.descending,
          sort: Constants.SORT_FIELDS.productName
        },
        id: 'productNameDescending',
        iconName: Constants.ICON_TYPES.zToA,
      },
      {
        text: 'Date Of Order',
        value: {
          order: Constants.ORDER.ascending,
          sort: 'createdAt',
        },
        id: 'createdAtAddedAscending',
        iconName: Constants.ICON_TYPES.lowToHigh,
      }, {
        text: 'Date Of Order',
        value: {
          order: Constants.ORDER.descending,
          sort: 'createdAt'
        },
        id: 'createdAtAddedDescending',
        iconName: Constants.ICON_TYPES.highToLow,
      },
      {
        text: 'Total Paid',
        value: {
          order: Constants.ORDER.ascending,
          sort: 'partnerOrders.totalPaid'
        },
        id: 'totalPaidLowToHigh',
        iconName: Constants.ICON_TYPES.lowToHigh,
      },
      {
        text: 'Total Paid',
        value: {
          order: Constants.ORDER.descending,
          sort: 'partnerOrders.totalPaid'
        },
        id: 'totalPaidHighToLow',
        iconName: Constants.ICON_TYPES.highToLow,
      },
      {
        text: 'Event Box Revenue',
        value: {
          order: Constants.ORDER.ascending,
          sort: 'partnerOrders.eventBoxAmount'
        },
        id: 'revenueLowToHigh',
        iconName: Constants.ICON_TYPES.lowToHigh,
      },
      {
        text: 'Event Box Revenue',
        value: {
          order: Constants.ORDER.descending,
          sort: 'partnerOrders.eventBoxAmount'
        },
        id: 'revenueHighToLow',
        iconName: Constants.ICON_TYPES.highToLow,
      },
      {
        text: 'Partner Revenue',
        value: {
          order: Constants.ORDER.ascending,
          sort: 'partnerOrders.partnerAmount'
        },
        id: 'partnerRevenueLowToHigh',
        iconName: Constants.ICON_TYPES.lowToHigh,
      },
      {
        text: 'Partner Revenue',
        value: {
          order: Constants.ORDER.descending,
          sort: 'partnerOrders.partnerAmount'
        },
        id: 'partnerRevenueHighToLow',
        iconName: Constants.ICON_TYPES.highToLow,
      },
    ];

  public static readonly PARTNER_PLANNER_ORDERS_SORT = [
    {
      text: 'Planner Name',
      value: {
        order: Constants.ORDER.ascending,
        sort: 'planners.name',
      },
      id: 'plannerNameAscending',
      iconName: Constants.ICON_TYPES.aToZ,
    }, {
      text: 'Planner Name',
      value: {
        order: Constants.ORDER.descending,
        sort: 'planners.name'
      },
      id: 'plannerNameDescending',
      iconName: Constants.ICON_TYPES.zToA,
    },
    ...Constants.PARTNER_ORDERS_SORT
  ];
  public static readonly PARTNER_VENDOR_ORDERS_SORT = [
    {
      text: 'Vendor Name',
      value: {
        order: Constants.ORDER.ascending,
        sort: 'vendors.name',
      },
      id: 'vendorNameAscending',
      iconName: Constants.ICON_TYPES.aToZ,
    }, {
      text: 'Vendor Name',
      value: {
        order: Constants.ORDER.descending,
        sort: 'vendors.name'
      },
      id: 'vendorNameDescending',
      iconName: Constants.ICON_TYPES.zToA,
    },
    ...Constants.PARTNER_ORDERS_SORT
  ];

  public static readonly VENDOR_PAYOUT_REPORT =
    [{
      text: 'Product Purchased',
      value: {
        order: Constants.ORDER.ascending,
        sort: 'orderDetail.products.name',
      },
      id: 'productNameAscending',
      iconName: Constants.ICON_TYPES.aToZ,
    }, {
      text: 'Product Purchased',
      value: {
        order: Constants.ORDER.descending,
        sort: 'orderDetail.products.name'
      },
      id: 'productNameDescending',
      iconName: Constants.ICON_TYPES.zToA,
    },
    {
      text: 'Total Price',
      value: {
        order: Constants.ORDER.ascending,
        sort: 'totalAmount'
      },
      id: 'totalAmountLowToHigh',
      iconName: Constants.ICON_TYPES.lowToHigh,
    },
    {
      text: 'Total Price',
      value: {
        order: Constants.ORDER.descending,
        sort: 'totalAmount'
      },
      id: 'totalAmountHighToLow',
      iconName: Constants.ICON_TYPES.highToLow,
    },
    {
      text: 'Date Of Payout',
      value: {
        order: Constants.ORDER.ascending,
        sort: 'createdAt'
      },
      id: 'dateOfpayoutLowToHigh',
      iconName: Constants.ICON_TYPES.lowToHigh,
    },
    {
      text: 'Date Of Payout',
      value: {
        order: Constants.ORDER.descending,
        sort: 'createdAt'
      },
      id: 'dateOfPayoutHighToLow',
      iconName: Constants.ICON_TYPES.highToLow,
    },
    {
      text: 'Event Box Amount',
      value: {
        order: Constants.ORDER.ascending,
        sort: 'eventBoxAmount'
      },
      id: 'eventBoxAmountLowToHigh',
      iconName: Constants.ICON_TYPES.lowToHigh,
    },
    {
      text: 'Event Box Amount',
      value: {
        order: Constants.ORDER.descending,
        sort: 'eventBoxAmount'
      },
      id: 'eventBoxAmountHighToLow',
      iconName: Constants.ICON_TYPES.highToLow,
    },

    {
      text: 'Partner/Vendor Share',
      value: {
        order: Constants.ORDER.ascending,
        sort: 'commissionAmount'
      },
      id: 'commissionAmountLowToHigh',
      iconName: Constants.ICON_TYPES.lowToHigh,
    },
    {
      text: 'Partner/Vendor Share',
      value: {
        order: Constants.ORDER.descending,
        sort: 'commissionAmount'
      },
      id: 'commissionAmountHighToLow',
      iconName: Constants.ICON_TYPES.highToLow,
    },
    {
      text: 'Partner Name',
      value: {
        order: Constants.ORDER.ascending,
        sort: 'referrerPartner.partnerDetails.businessName',
      },
      id: 'partnerNameAscending',
      iconName: Constants.ICON_TYPES.aToZ,
    }, {
      text: 'Partner Name',
      value: {
        order: Constants.ORDER.descending,
        sort: 'referrerPartner.partnerDetails.businessName'
      },
      id: 'partnerNameDescending',
      iconName: Constants.ICON_TYPES.zToA,
    },
    {
      text: 'Net Amount',
      value: {
        order: Constants.ORDER.ascending,
        sort: 'netAmount',
      },
      id: 'netAmountAscending',
      iconName: Constants.ICON_TYPES.lowToHigh,
    }, {
      text: 'Net Amount',
      value: {
        order: Constants.ORDER.descending,
        sort: 'netAmount'
      },
      id: 'netAmountDescending',
      iconName: Constants.ICON_TYPES.highToLow,
    },

    ];

  public static readonly ADMIN_PAYOUT_REPORT = [
    ...Constants.VENDOR_PAYOUT_REPORT,
    {
      text: 'Vendor Name',
      value: {
        order: Constants.ORDER.ascending,
        sort: 'orderDetail.vendors.name',
      },
      id: 'vendorNameAscending',
      iconName: Constants.ICON_TYPES.aToZ,
    }, {
      text: 'Vendor Name',
      value: {
        order: Constants.ORDER.descending,
        sort: 'orderDetail.vendors.name'
      },
      id: 'vendorNameDescending',
      iconName: Constants.ICON_TYPES.zToA,
    }
  ];


  public static readonly CUSTOM_PRELOAD_DELAY = 150;
  public static readonly COPY_SELECTION_RANGE = 99999;
  public static readonly MAX_ONLY_PHONE_LENGTH = 10;
  public static readonly PAYOUT_TYPES = {
    PLANNER_PARTNER: 'PLANNER_PARTNER',
    VENDOR: 'VENDOR',
    VENDOR_PARTNER: 'VENDOR_PARTNER',
    PLANNER_VENDOR: 'PLANNER_VENDOR'
  };

  public static readonly TIME_ZONES_LIST =
    [{
      text: 'ET',
      value: 'America/New_York'
    }, {
      text: 'CT',
      value: 'America/Chicago'
    }, {
      text: 'MT',
      value: 'America/Denver'
    }, {
      text: 'PT',
      value: 'America/Los_Angeles'
    }];

  public static readonly TIME_ZONE_DISPLAY_MAP = {
    'America/New_York': '(ET)',
    'America/Chicago': '(CT)',
    'America/Denver': '(MT)',
    'America/Los_Angeles': '(PT)'
  };

  public static readonly DEFAULT_TIME_ZONE = 'America/New_York';
  public static QUOTE_VARIABLE_FIELDS =
    ['deliveryStartDate', 'deliveryEndDate', 'setUpFromDate', 'setUpToDate', 'breakDownStartDate', 'breakDownEndDate'];
  public static readonly DATE_RANGE_FIELDS = { dateFrom: 'dateFrom', dateTo: 'dateTo' };
  public static readonly ACH_REPORT_START_YEAR = 2020;
  public static readonly MONTH_SELECT_OPTIONS = [
    { id: '01', text: 'Jan' }, { id: '02', text: 'Feb' }, { id: '03', text: 'Mar' },
    { id: '04', text: 'Apr' }, { id: '05', text: 'May' }, { id: '06', text: 'Jun' },
    { id: '07', text: 'Jul' }, { id: '08', text: 'Aug' },
    { id: '09', text: 'Sep' }, { id: '10', text: 'Oct' },
    { id: '11', text: 'Nov' }, { id: '12', text: 'Dec' }];
  public static readonly EVENT_BOX_SOCIAL_LINKS = {
    facebook: 'https://www.facebook.com/myeventbox.planningperfected',
    instagram: 'https://www.instagram.com/myeventbox',
    linkedIn: 'http://www.linkedin.com/company/my-eventbox'
  };

  public static readonly LOCATION_MAX_VENDOR = 40;
  public static getVariableDropDown(value = '') {
      return {
        eventVarriables: `Use default information from ${value} event page`,
        lastQuoteVarriables: 'Use most recent information input',
        categoryQuoteVarriables: `Use custom information for ${value} category`
      };
    }
  public static readonly getArchivepopUpData = (status, type) => {
      return {
        text: `Are you sure you want to ${status ? 'activate' : 'archive'}
       this ${type === Constants.PRODUCT_TYPE ? 'product' : 'service'} from the list?`,
        title: `${status ? 'Activate' : 'Archive'} ${type === Constants.PRODUCT_TYPE ? 'Product' : 'Service'}`,
        leftButton: 'Yes',
        rightButton: 'No',
        imageSrc: '../../../../assets/images/archive.svg'
      };
    }
  }
