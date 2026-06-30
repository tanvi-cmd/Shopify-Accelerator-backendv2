import CmsService from "./service";
import { RuntimeContext } from "../../shared/interfaces/runtime-context";

export default {
  name: "CMS",

  async execute(context: RuntimeContext) {
    const blogs: any = await CmsService.getBlogs(context);
    const pages: any = await CmsService.getPages(context);

    const firstBlogHandle =
      blogs?.data?.blogs?.nodes?.[0]?.handle;

    let blogArticles: any = null;

    if (firstBlogHandle) {
      blogArticles = await CmsService.getBlogArticles(
        context,
        firstBlogHandle
      );
    }

    return {
      success: true,
      module: "CMS",
      data: {
        pages,
        blogs,
        blogArticles
      },
      duration:
        (pages?.duration || 0) +
        (blogs?.duration || 0) +
        (blogArticles?.duration || 0)
    };
  }
};