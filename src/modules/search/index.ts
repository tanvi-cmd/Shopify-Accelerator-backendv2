import SearchService from "./service";

export default {

  name: "Search",

  execute: SearchService.search.bind(SearchService)

};