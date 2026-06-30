export interface CustomerRequest {

  store: string;

  storefrontToken: string;

  adminToken: string;

  apiVersion: string;

  customerAccessToken: string;

}

export interface Customer {

  id: string;

  firstName: string;

  lastName: string;

  email: string;

  phone?: string;

  displayName: string;

  acceptsMarketing: boolean;

  numberOfOrders: number;

}

export interface CustomerResponse {

  customer: Customer;

}