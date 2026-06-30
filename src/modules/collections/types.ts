export interface CollectionRequest {

  store: string;

  storefrontToken: string;

  adminToken: string;

  apiVersion: string;

  pageSize: number;

}

export interface Collection {

  id: string;

  title: string;

  handle: string;

  description: string;

  image?: {

    url: string;

  };

  productsCount: {

    count: number;

  };

}

export interface CollectionsResponse {

  collections: {

    nodes: Collection[];

  };

}