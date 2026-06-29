
export const SEARCH_PRODUCTS = `query($query:String!){products(first:20,query:$query){edges{node{id title handle}}}}`;
