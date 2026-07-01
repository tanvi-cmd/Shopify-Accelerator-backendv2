import { Request } from "express";
import { RuntimeContext } from "../shared/interfaces/runtime-context";

export function createRuntimeContext(
  req: Request
): RuntimeContext {
  return {
    store: req.body.store,
    storefrontToken: req.body.storefrontToken,
    adminToken: req.body.adminToken,
    apiVersion: req.body.apiVersion,
    pageSize: req.body.pageSize ?? 10,
    searchQuery: req.body.searchQuery ?? "",
    selectedModules: req.body.selectedModules ?? [],
    enableWishlist: req.body.enableWishlist ?? false,
    enableConfigurator: req.body.enableConfigurator ?? false,
    //metaobjectType: req.body.metaobjectType ?? "faq",
    metaobjectType: req.body.metaobjectType ?? req.params?.type ?? "",
    metaobjectHandle: req.body.metaobjectHandle ?? req.params?.handle ?? "",
    databaseUrl: req.body.databaseUrl,
    jwtSecret: req.body.jwtSecret,
    customerId: req.body.customerId,
    productId: req.body.productId,
    customerAccessToken: req.body.customerAccessToken,
    email: req.body.email,
    password: req.body.password
  };
}