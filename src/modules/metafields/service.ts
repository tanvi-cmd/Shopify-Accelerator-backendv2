import ShopifyService from "../../services/shopify.service";
import { RuntimeContext } from "../../shared/interfaces/runtime-context";

import {
  PRODUCT_METAFIELDS_QUERY,
  COLLECTION_METAFIELDS_QUERY,
  CUSTOMER_METAFIELDS_QUERY,
  ORDER_METAFIELDS_QUERY,
  PAGE_METAFIELDS_QUERY,
  BLOG_METAFIELDS_QUERY,
  ARTICLE_METAFIELDS_QUERY,
  VARIANT_METAFIELDS_QUERY,
  SHOP_METAFIELDS_QUERY,
  NODE_METAFIELDS_QUERY
} from "./graphql";

type OwnerType =
  | "products"
  | "collections"
  | "customers"
  | "orders"
  | "pages"
  | "blogs"
  | "articles"
  | "variants"
  | "shop"
  | "all";

class MetafieldsService {
  async getMetafields(context: RuntimeContext) {
    const ownerType =
      (((context as any).ownerType ?? "all") as string)
       .toLowerCase() as OwnerType;

    const ownerId = (context as any).ownerId;
    const first = context.pageSize || 10;
    const metafieldsFirst = (context as any).metafieldsFirst || 20;

    if (ownerId) {
      return ShopifyService.execute({
        api: "admin",
        context,
        query: NODE_METAFIELDS_QUERY,
        variables: {
          id: ownerId,
          first: metafieldsFirst
        }
      });
    }

    const run = (query: string, variables: Record<string, any>) => {
      return ShopifyService.execute({
        api: "admin",
        context,
        query,
        variables
      });
    };

    if (ownerType === "products") {
      return run(PRODUCT_METAFIELDS_QUERY, {
        first,
        metafieldsFirst
      });
    }

    if (ownerType === "collections") {
      return run(COLLECTION_METAFIELDS_QUERY, {
        first,
        metafieldsFirst
      });
    }

    if (ownerType === "customers") {
      return run(CUSTOMER_METAFIELDS_QUERY, {
        first,
        metafieldsFirst
      });
    }

    if (ownerType === "orders") {
      return run(ORDER_METAFIELDS_QUERY, {
        first,
        metafieldsFirst
      });
    }

    if (ownerType === "pages") {
      return run(PAGE_METAFIELDS_QUERY, {
        first,
        metafieldsFirst
      });
    }

    if (ownerType === "blogs") {
      return run(BLOG_METAFIELDS_QUERY, {
        first,
        metafieldsFirst
      });
    }

    if (ownerType === "articles") {
      return run(ARTICLE_METAFIELDS_QUERY, {
        first,
        metafieldsFirst
      });
    }

    if (ownerType === "variants") {
      return run(VARIANT_METAFIELDS_QUERY, {
        first,
        metafieldsFirst
      });
    }

    if (ownerType === "shop") {
      return run(SHOP_METAFIELDS_QUERY, {
        metafieldsFirst
      });
    }

    const started = Date.now();

    const [
      products,
      collections,
      customers,
      orders,
      pages,
      blogs,
      articles,
      variants,
      shop
    ] = await Promise.all([
      run(PRODUCT_METAFIELDS_QUERY, {
        first,
        metafieldsFirst
      }),
      run(COLLECTION_METAFIELDS_QUERY, {
        first,
        metafieldsFirst
      }),
      run(CUSTOMER_METAFIELDS_QUERY, {
        first,
        metafieldsFirst
      }),
      run(ORDER_METAFIELDS_QUERY, {
        first,
        metafieldsFirst
      }),
      run(PAGE_METAFIELDS_QUERY, {
        first,
        metafieldsFirst
      }),
      run(BLOG_METAFIELDS_QUERY, {
        first,
        metafieldsFirst
      }),
      run(ARTICLE_METAFIELDS_QUERY, {
        first,
        metafieldsFirst
      }),
      run(VARIANT_METAFIELDS_QUERY, {
        first,
        metafieldsFirst
      }),
      run(SHOP_METAFIELDS_QUERY, {
        metafieldsFirst
      })
    ]);

    return {
      success: true,
      status: 200,
      duration: Date.now() - started,
      data: {
        products,
        collections,
        customers,
        orders,
        pages,
        blogs,
        articles,
        variants,
        shop
      }
    };
  }
}

export default new MetafieldsService();