import MetaobjectService from "./service";

export default {
  name: "Metaobjects",

  async execute(context: any) {
    return MetaobjectService.getMetaobjects(context);
  }
};