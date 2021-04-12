export interface IElasticSearch {
    total: string | {
        relation: string;
        value: number;
    };
    max_score: number;
    hits: {hits: Array<IHitsObject>};
    data?: {
        company: ICompany;
        locations: Array<IDataLocationsObject>;
    };
}

interface ISource {
    _source: {
        name: string;
        type: string;
        willTravel: boolean;
        price: number;
        category: string;
        locations: ILocation;
        defaultImageUrl?: string;
        travelType?: string;
    };
}

interface ILocation {
    location: {
        _id: string;
    };
    _id: number;
    name: string;
}

interface ICompany {
    _id: string;
    name: string;
    logo: string;
    logoUrl: string;
}

interface IHitsObject {
    _index: string;
    _type: string;
    _id: string;
    _score: number;
    _source: ISource;
}

interface IDataLocationsObject {
    geoLocation: {
        lat: number;
        lon: number;
    };
    _id: string;
    landmark: string;
    address: string;
    city: number;
    state: ISource;
    zipcode: string;
}
