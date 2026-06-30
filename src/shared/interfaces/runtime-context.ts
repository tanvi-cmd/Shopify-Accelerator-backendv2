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
}