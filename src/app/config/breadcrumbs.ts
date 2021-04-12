import { Constants } from './constant';

export class BreadCrumb {
    public static readonly plannerEditProfile = [{
        text: 'Profile',
        route: Constants.APPLICATION_ROUTES.planner.profile
    }, {
        text: 'Edit Profile',
        route: ''
    }];

    public static readonly adminSubUserAdd = [{
        text: 'User Management',
        route: Constants.APPLICATION_ROUTES.admin.adminUserManagement
    }, {
        text: 'Add User',
        route: ''
    }];

    public static readonly adminAcceptVendor = [{
        text: 'Pending Vendor Sign Ups',
        route: `${Constants.APPLICATION_ROUTES.admin.adminPendingVendorManagement}?order=-1&sort=createdAt`
    }, {
        text: 'Membership Package',
        route: ''
    }];

    public static readonly adminSubUserEdit = [{
        text: 'User Management',
        route: Constants.APPLICATION_ROUTES.admin.adminUserManagement
    }, {
        text: 'Edit User',
        route: ''
    }];

    public static readonly adminCategoryUpdate = [{
        text: 'Category List',
        route: Constants.APPLICATION_ROUTES.admin.adminCategoryManagement
    }, {
        text: 'Edit Category',
        route: ''
    }];

    public static readonly adminSubCategoryAdd = [{
        text: 'Sub Category List',
        route: Constants.APPLICATION_ROUTES.admin.adminCategoryManagement
    }, {
        text: 'Add New Sub Category',
        route: ''
    }];

    public static readonly adminSubCategoryUpdate = [{
        text: 'Sub Category List',
        route: Constants.APPLICATION_ROUTES.admin.adminCategoryManagement
    }, {
        text: 'Edit Sub Category',
        route: ''
    }];

    public static readonly adminPromoCodeAdd = [{
        text: 'Promo Code Management',
        route: Constants.APPLICATION_ROUTES.admin.adminPromoCodeManagement
    }, {
        text: 'Create Promo Code',
        route: ''
    }];

    public static readonly plannerAddCreditCard = [{
        text: 'Profile',
        route: Constants.APPLICATION_ROUTES.planner.profile
    }, {
        text: 'Add Credit Card',
        route: ''
    }];

    public static readonly shoppingCart = [{
        text: 'Quote Pending Payment',
        route: `${Constants.APPLICATION_ROUTES.planner.quotePendingpayment}?order=1&sort=events.startdate`
    }, {
        text: 'Shopping Cart',
        route: ''
    }];

    public static readonly checkout = [{
        text: 'Quote Pending Payment',
        route: `${Constants.APPLICATION_ROUTES.planner.quotePendingpayment}?order=1&sort=events.startdate`
    }, {
        text: 'Shopping Cart',
        route: Constants.APPLICATION_ROUTES.planner.shoppingCart
    },
    {
        text: 'Payments',
        route: ''
    }];
    public static readonly adminEditVendor = [{
        text: 'Vendor Management',
        route: Constants.APPLICATION_ROUTES.admin.vendorManagement
    }, {
        text: 'Edit Vendor',
        route: ''
    }];

    public static readonly vendorQuoteDetail = {
        [Constants.QUOTE_STATUS.ACCEPTED_QUOTES]:
            [
                {
                    text: 'Awaiting Quotes Acceptance',
                    route: `/vendor/quotes/list?type=ACCEPT_REJECT_QUOTES`
                }, {
                    text: 'Quote Request Information',
                    route: ''
                }
            ],
        [Constants.QUOTE_STATUS.AWAITING_VENDOR_QUOTES]:
            [
                {
                    text: 'Price Quotes Needed',
                    route: `/vendor/quotes/list`
                }, {
                    text: 'Quote Request Information',
                    route: ''
                }
            ],
        [Constants.QUOTE_STATUS.ACCEPT_REJECT_QUOTES]:
            [
                {
                    text: 'Awaiting Quotes Acceptance',
                    route: `/vendor/quotes/list?type=ACCEPT_REJECT_QUOTES`
                }, {
                    text: 'Quote Request Information',
                    route: ''
                }
            ],
        [Constants.QUOTE_STATUS.EXPIRED_QUOTES]:
            [
                {
                    text: 'Expired/Rejected Quotes',
                    route: `/vendor/quotes/expired-cancelled-list?type=EXPIRED_QUOTES`
                }, {
                    text: 'Quote Request Information',
                    route: ''
                }
            ],
        [Constants.QUOTE_STATUS.REJECTED_BY_VENDOR]: [{
            text: 'Expired/Rejected Quotes',
            route: `/vendor/quotes/expired-cancelled-list?type=EXPIRED_QUOTES`
        }, {
            text: 'Quote Request Information',
            route: ''
        }],
        [Constants.QUOTE_STATUS.REJECTED_QUOTES]: [{
            text: 'Expired/Rejected Quotes',
            route: `/vendor/quotes/expired-cancelled-list?type=EXPIRED_QUOTES`
        }, {
            text: 'Quote Request Information',
            route: ''
        }],
        [Constants.ORDER_TYPES.DAY_OUR_ORDERS]: [
            {
                text: '30 Days Out',
                route: `/vendor/orders?type=${Constants.ORDER_TYPES.DAY_OUR_ORDERS}`
            }, {
                text: 'Order Details',
                route: ''
            }
        ],
        [Constants.ORDER_TYPES.NEW_ORDERS]: [
            {
                text: 'New Orders',
                route: `/vendor/orders?type=${Constants.ORDER_TYPES.NEW_ORDERS}`
            },
            {
                text: 'Order Details',
                route: ''
            }
        ],
        [Constants.ORDER_TYPES.FULFILLED_ORDERS]: [
            {
                text: 'Fulfilled Orders',
                route: `/vendor/orders?type=${Constants.ORDER_TYPES.FULFILLED_ORDERS}`
            },
            {
                text: 'Order Details',
                route: ''
            }
        ],
        [Constants.ORDER_TYPES.CANCELLED]: [
            {
                text: 'Canceled Orders',
                route: `/vendor/orders?status=${Constants.ORDER_TYPES.CANCELLED}`
            },
            {
                text: 'Order Details',
                route: ''
            }
        ]
    };

    public static readonly quotesRequestDetail = {
        [Constants.QUOTE_STATUS.AWAITING_VENDOR_QUOTES]:
            [
                {
                    text: 'Awaiting Vendor Quotes',
                    route: `/planner/quotes/awaiting-vendor-quotes/list`
                }, {
                    text: 'Quote Request Details',
                    route: ''
                }
            ],
        [Constants.QUOTE_STATUS.ACCEPT_REJECT_QUOTES]:
            [
                {
                    text: 'Accept-Reject Quotes',
                    route: `/planner/quotes/accept-reject-quotes/list`
                }, {
                    text: 'Quote Request Details',
                    route: ''
                }
            ],
        [Constants.QUOTE_STATUS.PENDING_PAYMENT_QUOTES]:
            [
                {
                    text: 'Quotes Pending Payment',
                    route: `/planner/quotes/quote-pending-payment/list?order=1&sort=events.startdate`
                }, {
                    text: 'Quote Request Details',
                    route: ''
                }
            ],
        [Constants.QUOTE_STATUS.EXPIRED_QUOTES]:
            [
                {
                    text: 'Expired / Rejected Quotes',
                    route: `/planner/quotes/expired-quotes/list`
                }, {
                    text: 'Quote Request Details',
                    route: ''
                }
            ],
        [Constants.QUOTE_STATUS.REJECTED_QUOTES]: [
            {
                text: 'Expired / Rejected Quotes',
                route: `/planner/quotes/expired-quotes/list`
            }, {
                text: 'Quote Request Details',
                route: ''
            }
        ],
        [Constants.QUOTE_STATUS.CANCELED_QUOTES]: [
            {
                text: 'Expired / Rejected Quotes',
                route: `/planner/quotes/expired-quotes/list`
            }, {
                text: 'Quote Request Details',
                route: ''
            }
        ],
        [Constants.QUOTE_STATUS.ACCEPTED_QUOTES]:
            [
                {
                    text: 'Quotes Pending Payment',
                    route: `${Constants.APPLICATION_ROUTES.planner.quotePendingpayment}?order=1&sort=events.startdate`
                }, {
                    text: 'Quote Request Details',
                    route: ''
                }
            ],
        [Constants.PAYMENT_STATUS.PURCHASED]:
            [{
                text: 'Purchased Orders',
                route: `${Constants.APPLICATION_ROUTES.planner.purchasedOrders}`
            }, {
                text: 'Order Details',
                route: ''
            }],
        [Constants.PAYMENT_STATUS.CANCELLED]:
            [{
                text: 'Canceled Orders',
                route: `${Constants.APPLICATION_ROUTES.planner.canceledOrders}`
            }, {
                text: 'Order Details',
                route: ''
            }],
        [Constants.QUOTE_STATUS.REJECTED_BY_VENDOR]:
            [
                {
                    text: 'Expired / Rejected Quotes',
                    route: `/planner/quotes/expired-quotes/list`
                }, {
                    text: 'Quote Request Details',
                    route: ''
                }
            ],

    };

    public static readonly adminQuotesRequestDetail = {
        [Constants.QUOTE_STATUS.AWAITING_VENDOR_QUOTES]:
            [
                {
                    text: 'Report',
                    route: Constants.APPLICATION_ROUTES.admin.reports
                },
                {
                    text: 'Awaiting Vendor Quotes',
                    route: `/admin/reports/quotes/awaiting-vendor-quotes/list?order=1&sort=quoteExpirationDate`
                }, {
                    text: 'Quote Details',
                    route: ''
                }
            ],
        [Constants.QUOTE_STATUS.EXPIRED_QUOTES]:
            [
                {
                    text: 'Report',
                    route: Constants.APPLICATION_ROUTES.admin.reports
                },
                {
                    text: 'Expired / Rejected Quotes',
                    route: `/admin/reports/quotes/expired-quotes/list?order=-1&sort=updatedAt`
                }, {
                    text: 'Quote  Details',
                    route: ''
                }
            ],
        [Constants.QUOTE_STATUS.ACCEPT_REJECT_QUOTES]:
            [
                {
                    text: 'Report',
                    route: Constants.APPLICATION_ROUTES.admin.reports
                },
                {
                    text: 'Accept-Reject Quotes',
                    route: `/admin/reports/quotes/accept-reject-quotes/list?order=1&sort=quoteExpirationDate`
                }, {
                    text: 'Quote  Details',
                    route: ''
                }
            ],
        [Constants.QUOTE_STATUS.PENDING_PAYMENT_QUOTES]:
            [
                {
                    text: 'Report',
                    route: Constants.APPLICATION_ROUTES.admin.reports
                },
                {
                    text: 'Quotes Pending Payment',
                    route: `/admin/reports/quotes/quote-pending-payment/list?order=1&sort=events.startdate`
                }, {
                    text: 'Quote  Details',
                    route: ''
                }
            ],
    };

    public static readonly adminOrderDetails = {
        [Constants.PAYMENT_STATUS.PURCHASED]: [
            {
                text: 'Report',
                route: Constants.APPLICATION_ROUTES.admin.reports
            }, {
                text: 'Purchased Orders',
                route: `${Constants.APPLICATION_ROUTES.admin.orders}/purchased`
            }, {
                text: 'Order Details',
                route: ''
            }],
        [Constants.PAYMENT_STATUS.CANCELLED]: [
            {
                text: 'Report',
                route: Constants.APPLICATION_ROUTES.admin.reports
            }, {
                text: 'Canceled Orders',
                route: `${Constants.APPLICATION_ROUTES.admin.orders}/canceled`
            }, {
                text: 'Order Details',
                route: ''
            }],
    };

    public static readonly adminPurchasedOrderList = [
        {
            text: 'Report',
            route: Constants.APPLICATION_ROUTES.admin.reports
        }, {
            text: 'Total Products/Services Purchased',
            route: `${Constants.APPLICATION_ROUTES.admin.productsServicesPurchased}`
        }, {
            text: 'Order Details',
            route: ''
        }];

    public static readonly eventDetail = {
        navigateOptions: [
            {
                text: 'Upcoming Events',
                route: `/planner/event/list?type=upcoming-events`,
                navigationId: 1

            },
            {
                text: 'Past Events',
                route: `/planner/event/list?type=past-events`,
                navigationId: 2

            },
            {
                text: 'Awaiting Vendor Quotes',
                route: `/planner/quotes/awaiting-vendor-quotes/list`,
                navigationId: 3
            },
            {
                text: 'Quote Request Folder',
                route: `/planner/quote-request-folder`,
                navigationId: 4
            },
            {
                text: 'My Ratings & Reviews',
                route: `/planner/my-rating-review`,
                navigationId: 5
            },
        ],
        lastOption: {
            text: 'Event Details',
            route: ``,
        }

    };

    public static readonly adminProductServiceList = [{
        text: 'Report',
        route: Constants.APPLICATION_ROUTES.admin.reports
    }, {
        text: 'Products/Services',
        route: ''
    }];

    public static readonly adminProductServicePurchased =
        [{
            text: 'Reports',
            route: Constants.APPLICATION_ROUTES.admin.reports
        },
        {
            text: 'Total Products/Services Purchased',
            route: ''
        },
        ];

    public static readonly adminOrders =
        [{
            text: 'Reports',
            route: Constants.APPLICATION_ROUTES.admin.reports
        },
        {
            text: 'Orders',
            route: ''
        },
        ];
    public static readonly adminEvents =
        [{
            text: 'Reports',
            route: Constants.APPLICATION_ROUTES.admin.reports
        },
        {
            text: 'Events',
            route: Constants.APPLICATION_ROUTES.admin.events
        },
        ];

    public static readonly adminEventDetails = [
        ...BreadCrumb.adminEvents,
        {
            text: 'Event Details',
            route: ''
        }
    ];

    public static readonly vendorEditproducts = (...data) => {
        return [
            {
                text: 'My Products/Services',
                route: Constants.APPLICATION_ROUTES.vendor.productsServices
            },
            {
                text: `Edit ${data[0] ? 'Product' : 'Service'}`,
                route: ``
            }
        ];
    }

    public static readonly vendorViewProductService = (...data) => {
        return [
            {
                text: 'My Products/Services',
                route: Constants.APPLICATION_ROUTES.vendor.productsServices
            },
            {
                text: `${data}`,
                route: ``
            }
        ];
    }

    public static readonly vendorRatingNReviewProductService = (product) => {
        return [
            {
                text: 'My Products/Services',
                route: Constants.APPLICATION_ROUTES.vendor.productsServices
            },
            {
                text: `${product.name}`,
                route: Constants.APPLICATION_ROUTES.vendor.productsServices + '/' + `${product._id}`
            },
            {
                text: 'Ratings & Reviews',
                route: ``
            }
        ];
    }

    public static readonly adminViewProductService = (...data) => {
        return [
            {
                text: 'Reports',
                route: Constants.APPLICATION_ROUTES.admin.reports
            },
            {
                text: 'Products/Services',
                route: Constants.APPLICATION_ROUTES.admin.productsServicesList
            },
            {
                text: `${data}`,
                route: ``
            }
        ];
    }



    public static readonly acceptVendor = () => {
        return [
            {
                text: 'Upcoming Events',
                route: `/planner/event/list?type=upcoming-events`,
                navigationId: 1

            },
            {
                text: 'Past Events',
                route: `/planner/event/list?type=past-events`,
                navigationId: 2

            },
        ];
    }
}
