export interface StoreRequest {

  store: string;

  storefrontToken: string;

  adminToken: string;

  apiVersion: string;

}

export interface Shop {

  id: string;

  name: string;

  description: string;

  primaryDomain: {

    url: string;

  };

  paymentSettings: {

    currencyCode: string;

    countryCode: string;

  };

}

export interface StoreResponse {

  shop: Shop;

}