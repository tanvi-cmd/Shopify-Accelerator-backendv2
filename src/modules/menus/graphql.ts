export const MENU_QUERY = `
query Menu($handle: String!) {
  menu(handle: $handle) {
    id
    handle
    title
    items {
      id
      title
      type
      url
      items {
        id
        title
        type
        url
      }
    }
  }
}
`;