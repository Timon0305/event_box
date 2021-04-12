import { Constants } from './constant';


export class Notifications {
    public static readonly NOTIFICATION_TYPE_REDIRECT = {
        NOTIFY_NEW_PLANNER_MESSAGE: '/planner/messages',
        NOTIFY_NEW_LOCATION: '/vendor/products-services',
        NOTIFY_NEW_VENDOR_MESSAGE: '/vendor/messages',
        NOTIFY_NEW_EVENT: '/planner/event/list?type=upcoming-events',
        NOTIFY_NEW_QUOTE: '/planner/quotes/accept-reject-quotes/list?order=1&sort=quoteExpirationDate',
        NOTIFY_UPDATE_PROFILE_VENDOR: '/vendor/profile',
        NOTIFY_UPDATE_BANK_VENDOR: '/vendor/profile',
        NOTIFY_PLANNER_EXPIRED: '/planner/quotes/expired-quotes/list',
        NOTIFY_AWAITING_VENDOR_QUOTES: '/planner/quotes/awaiting-vendor-quotes/list',
        NEW_REQUEST_FOR_QUOTE: '/vendor/quotes/list?order=1&sort=quoteExpirationDate',
        REJECTED_QUOTE_NEED_COUNTER_OFFER: '/vendor/quotes/list?order=1&sort=quoteExpirationDate',
        REJECTED_QUOTE_NO_COUNTER_OFFER_REQUIRED: '/vendor/quotes/expired-cancelled-list?type=EXPIRED_QUOTES',
        NOTIFY_UPDATE_LOCATION: Constants.APPLICATION_ROUTES.vendor.productsServices,
        NOTIFY_NEW_ORDER_VENDOR: '/vendor/orders?type=NEW_ORDERS',
        NOTIFY_REGISTER_VENDOR: Constants.APPLICATION_ROUTES.admin.adminPendingVendorManagement,
        EXPORTED_CSV_IS_READY: 'EXPORTED_CSV_IS_READY',
        NOTIFY_CANCEL_ORDER_VENDOR: '/vendor/orders?status=CANCELLED',
        PLANNER_EXPIRED_QUOTE: '/planner/quotes/expired-quotes/list',
        NOTIFY_NEW_ORDER_PLANNER: '/planner/orders/purchased',
        VENDOR_EXPIRED_QUOTE: '/vendor/quotes/expired-cancelled-list?type=EXPIRED_QUOTES',
        NEW_REQUEST_FOR_QUOTE_HALF_TIME: '/vendor/quotes/list?order=1&sort=quoteExpirationDate',
        NOTIFY_PRODUCT_REVIEW_VENDOR: 'NOTIFY_PRODUCT_REVIEW_VENDOR',
        NOTIFY_ACH_PAYOUT_VENDOR: 'NOTIFY_ACH_PAYOUT_VENDOR',
        REJECTED_BY_VENDOR: '/planner/quotes/expired-quotes/list?order=-1&sort=quoteExpirationDate',
        ACCEPTED_QUOTE_PAYMENT_NEEDED: '/planner/quotes/quote-pending-payment/list?order=1&sort=events.startdate',
        WRITE_REVIEW_PLANNER: '/planner/my-rating-review',
        REMINDER_TO_DELIVER: '/vendor/orders?type=DAY_OUR_ORDERS',
        REJECTED_QUOTE_NEED_COUNTER_OFFER_LAST_CALL: 'vendor/quotes/list?order=1&sort=quoteExpirationDate '
    };
}
