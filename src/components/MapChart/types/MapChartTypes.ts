export interface CountryData {
    countryCode: string;
    countryName: string;
    requests: string;
}

export interface MapPosition {
    coordinates: [number, number];
    zoom: number;
}

export interface GeographyFeature {
    properties: {
        name: string;
        [key: string]: any;
    };
}
