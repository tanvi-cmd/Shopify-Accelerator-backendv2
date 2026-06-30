import StoreService from "../store/service";
import ProductService from "../products/service";
import CollectionService from "../collections/service";
import SearchService from "../search/service";

class ExplorerService {

  async connect(config: any) {

    const modules: string[] =
      config.selectedModules || [];

    const response: any = {};

    /*
    ---------------------------------------
    Store
    ---------------------------------------
    */

    if (modules.includes("Store")) {

      response.store =
        await StoreService.getStore(config);

    }

    /*
    ---------------------------------------
    Products
    ---------------------------------------
    */

    if (modules.includes("Products")) {

      response.products =
        await ProductService.getProducts(config);

    }

    /*
    ---------------------------------------
    Collections
    ---------------------------------------
    */

    if (modules.includes("Collections")) {

      response.collections =
        await CollectionService.getCollections(config);

    }

    /*
    ---------------------------------------
    Search
    ---------------------------------------
    */

    if (
      modules.includes("Search") &&
      config.searchQuery
    ) {

      response.search =
        await SearchService.search(config);

    }

    return {

      success: true,

      executedModules: modules,

      response

    };

  }

}

export default new ExplorerService();