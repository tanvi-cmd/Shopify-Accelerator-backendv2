export interface LoginRequest {

  store: string;

  storefrontToken: string;

  adminToken: string;

  apiVersion: string;

  email: string;

  password: string;

}

export interface LoginResponse {

  customerAccessTokenCreate: {

    customerAccessToken: {

      accessToken: string;

      expiresAt: string;

    };

    customerUserErrors: {

      code: string;

      field: string[];

      message: string;

    }[];

  };

}