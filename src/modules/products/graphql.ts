const PRODUCTS_QUERY = `
query Products($first: Int!) {
  products(first: $first) {
    nodes {
      id
      title
      handle
      vendor
      productType

      featuredImage {
        url
      }

      priceRange {
        minVariantPrice {
          amount
          currencyCode
        }
      }
    }
  }
}
`;

export default PRODUCTS_QUERY;