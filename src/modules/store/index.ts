import StoreService from "./service";

export default {

  name: "Store",

  execute: StoreService.getStore.bind(StoreService)

};