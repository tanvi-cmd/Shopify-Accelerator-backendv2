const SEARCH_QUERY = `
query Search($query: String!, $first: Int!) {

  search(
    query: $query,
    first: $first,
    types: [PRODUCT]
  ) {

    nodes {

      ... on Product {

        id
        title
        handle

        featuredImage {
          url
        }

      }

    }

  }

}
`;

export default SEARCH_QUERY;