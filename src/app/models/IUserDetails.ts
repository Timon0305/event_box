export interface IUserDetails {
    data: {
        token: string;
        user: IBasicUser;

    };
}
export interface ILoginDetails {
    email: string;
    password: string;
}

export interface IPayment {
    name: string;
    last4: string;
    exp_month: string;
    exp_year: string;
    address_line1: string;
    address_city: string;
    address_state: string;
    address_zip: string;
    _id: string;
    isDefault: boolean;
    brand?: string;
}

export interface IBasicUser {
    role: string;
    status: number;
    email: string;
    _id: string;
    company?: ICompany;
    firstName: string;
    lastName: string;
    googleId?: string;
    token?: string;
    companyWebsiteUrl?: string;
    companyPhone?: string;
    companyName?: string;
    phone?: string;
    payment?: {
      cards: IPayment[]
    };
    imageUrl: string;
    isVerified?: boolean;
    badges: {
        Quotes: IBadgesQuotes[]
    };
    dob: string;
}

interface ICompany {
    facebook: string;
    instagram: string;
    isAdminVerified: boolean;
    isTermsAccepted: boolean;
    logo: string;
    name: string;
    phone: string;
    status: number;
    website: string;
    profileCompleteStatus: number;
    bankDetail?: IBankDetails;
    memberPackage: {
        subscriptionCancelled: boolean;
    };

}



interface IBankDetails {
    accountHolderName: string;
    accountNumber: string;
    bankName: string;
    routingNumber: string;
}

export interface ForgotPassword {
    email: string;
}

export interface ResetPassword {
    id: string;
    password: string;
}

export interface ChangePassword {
    oldPassword: string;
    newPassword: string;
}

export interface IBadgesQuotes {
    _id: string;
    count: number;
}
