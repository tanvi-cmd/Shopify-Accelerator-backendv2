export interface ProductRequest {

  store: string;

  storefrontToken: string;

  adminToken: string;

  apiVersion: string;

  pageSize: number;

}

export interface Product {

  id: string;

  title: string;

  handle: string;

  vendor: string;

  productType: string;

  description: string;

  featuredImage?: {

    url: string;

  };

  priceRange: {

    minVariantPrice: {

      amount: string;

      currencyCode: string;

    };

  };

}

export interface ProductsResponse {

  products: {

    nodes: Product[];

  };

}