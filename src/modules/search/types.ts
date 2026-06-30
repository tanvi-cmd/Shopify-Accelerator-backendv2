import { Product } from "../products/types";

export interface SearchRequest {

  store: string;

  storefrontToken: string;

  adminToken: string;

  apiVersion: string;

  pageSize: number;

  searchQuery: string;

}

export interface SearchResponse {

  search: {

    nodes: Product[];

  };

}