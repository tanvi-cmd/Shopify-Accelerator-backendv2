import CollectionService from "./service";

export default {

  name: "Collections",

  execute: CollectionService.getCollections.bind(CollectionService)

};