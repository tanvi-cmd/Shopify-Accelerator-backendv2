export interface RuntimeContext {
  store: string;
  storefrontToken: string;
  adminToken: string;
  apiVersion: string;
  pageSize: number;
  searchQuery?: string;
  selectedModules: string[];
  enableWishlist: boolean;
  enableConfigurator: boolean;
  metaobjectType?: string;
  metaobjectHandle?: string;

  export interface RuntimeContext {
  store: string;
  storefrontToken: string;
  adminToken: string;
  apiVersion: string;
  pageSize: number;
  searchQuery?: string;
  selectedModules: string[];
  enableWishlist: boolean;
  enableConfigurator: boolean;

  databaseUrl?: string;
  jwtSecret?: string;

  customerId?: string;
  productId?: string;
  customerAccessToken?: string;
  email?: string;
  password?: string;

  [key: string]: any;
}
}