export const SHOP_QUERY = `
query {
  shop {
    name
    description
    primaryDomain {
      url
    }
  }
}
`;

export const PRODUCTS_QUERY = `
query {
  products(first: 20) {
    nodes {
      id
      title
      handle
    }
  }
}
`;

export const COLLECTIONS_QUERY = `
query {
  collections(first: 20) {
    nodes {
      id
      title
      handle
    }
  }
}
`;

export const PAGES_QUERY = `
query {
  pages(first: 20) {
    nodes {
      id
      title
      handle
    }
  }
}
`;

// export const SEARCH_QUERY = `
// query {
//   search(
//     query: "shirt",
//     first: 10,
//     types: PRODUCT
//   ) {
//     nodes {
//       ... on Product {
//         id
//         title
//         handle
//       }
//     }
//   }
// }
// `;

export const SEARCH_QUERY = `
query SearchProducts(
  $query: String!
) {
  search(
    query: $query,
    first: 20,
    types: PRODUCT
  ) {
    nodes {
      ... on Product {
        id
        title
        handle
      }
    }
  }
}
`;