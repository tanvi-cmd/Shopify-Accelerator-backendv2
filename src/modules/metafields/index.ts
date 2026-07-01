import MetafieldsService from "./service";

export default {
  name: "Metafields",

  async execute(context: any) {

    // Explorer always scans everything
    context.ownerType = "all";

    return MetafieldsService.getMetafields(context);
  }
};