import ShopifyService from "../../services/shopify.service";
import { RuntimeContext } from "../../shared/interfaces/runtime-context";
import {
  PAGE_QUERY,
  PAGES_QUERY,
  BLOGS_QUERY,
  BLOG_QUERY,
  BLOG_ARTICLES_QUERY
} from "./graphql";

class CmsService {
  async getPage(context: RuntimeContext, handle: string) {
    return ShopifyService.execute({
      api: "storefront",
      context,
      query: PAGE_QUERY,
      variables: { handle }
    });
  }

  async getPages(
    context: RuntimeContext
) {

    return ShopifyService.execute({

        api: "admin",

        context,

        query: PAGES_QUERY,

        variables: {

            first: 250

        }

    });

}

  async getBlogs(context: RuntimeContext) {
    return ShopifyService.execute({
      api: "storefront",
      context,
      query: BLOGS_QUERY,
      variables: {
        first: context.pageSize || 10
      }
    });
  }

  async getBlog(context: RuntimeContext, handle: string) {
    return ShopifyService.execute({
      api: "storefront",
      context,
      query: BLOG_QUERY,
      variables: { handle }
    });
  }

  async getBlogArticles(context: RuntimeContext, handle: string) {
    return ShopifyService.execute({
      api: "storefront",
      context,
      query: BLOG_ARTICLES_QUERY,
      variables: {
        handle,
        first: context.pageSize || 10
      }
    });
  }
}

export default new CmsService();