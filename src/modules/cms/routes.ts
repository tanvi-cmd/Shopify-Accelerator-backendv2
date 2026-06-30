import { Router } from "express";
import CmsController from "./controller";

const router = Router();

router.post("/pages/:handle", CmsController.getPage);
router.post(
    "/pages",
    CmsController.getPages
);
router.post("/blogs", CmsController.getBlogs);
router.post("/blogs/:handle", CmsController.getBlog);
router.post("/blogs/:handle/articles", CmsController.getBlogArticles);

export default router;