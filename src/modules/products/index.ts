import ProductService from "./service";

export default {

  name: "Products",

  execute: ProductService.getProducts.bind(ProductService)

};