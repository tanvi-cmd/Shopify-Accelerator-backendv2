
export const GET_PRODUCTS = `query { products(first:20){edges{node{id title handle}}}}`;
export const GET_PRODUCT_BY_HANDLE = `query($handle:String!){product(handle:$handle){id title handle description}}`;
