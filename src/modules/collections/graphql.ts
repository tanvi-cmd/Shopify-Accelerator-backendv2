const COLLECTIONS_QUERY = `
query Collections($first: Int!) {
  collections(first: $first) {
    nodes {
      id
      title
      handle

      image {
        url
      }
    }
  }
}
`;

export default COLLECTIONS_QUERY;