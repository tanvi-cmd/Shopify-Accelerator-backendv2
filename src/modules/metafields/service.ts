import ShopifyService from "../../services/shopify.service";
import { RuntimeContext } from "../../shared/interfaces/runtime-context";

import {
  METAOBJECT_DEFINITIONS_QUERY,
  METAOBJECTS_BY_TYPE_QUERY,
  METAOBJECT_BY_HANDLE_QUERY
} from "./graphql";

class MetaobjectService {
  async getMetaobjects(context: RuntimeContext) {
    const metaobjectType = (context as any).metaobjectType;
    const metaobjectHandle = (context as any).metaobjectHandle;
    const first = context.pageSize || 10;

    if (metaobjectType && metaobjectHandle) {
      return ShopifyService.execute({
        api: "admin",
        context,
        query: METAOBJECT_BY_HANDLE_QUERY,
        variables: {
          type: metaobjectType,
          handle: metaobjectHandle
        }
      });
    }

    if (metaobjectType) {
      return ShopifyService.execute({
        api: "admin",
        context,
        query: METAOBJECTS_BY_TYPE_QUERY,
        variables: {
          type: metaobjectType,
          first
        }
      });
    }

    const definitionsResult = await ShopifyService.execute({
      api: "admin",
      context,
      query: METAOBJECT_DEFINITIONS_QUERY,
      variables: {
        first: 100
      }
    });

    const definitions =
      (definitionsResult.data as any)?.metaobjectDefinitions?.nodes || [];

    const results: Record<string, any> = {};

    for (const definition of definitions) {
      const result = await ShopifyService.execute({
        api: "admin",
        context,
        query: METAOBJECTS_BY_TYPE_QUERY,
        variables: {
          type: definition.type,
          first
        }
      });

      results[definition.type] = {
        definition,
        result
      };
    }

    return {
      success: true,
      status: 200,
      duration: definitionsResult.duration,
      data: {
        definitions,
        metaobjects: results
      }
    };
  }
}

export default new MetaobjectService();