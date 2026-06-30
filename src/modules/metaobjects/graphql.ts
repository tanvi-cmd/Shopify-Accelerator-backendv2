export const METAOBJECT_DEFINITIONS_QUERY = `
query MetaobjectDefinitions($first: Int!) {
  metaobjectDefinitions(first: $first) {
    nodes {
      id
      name
      type
    }
  }
}
`;

export const METAOBJECTS_BY_TYPE_QUERY = `
query MetaobjectsByType($type: String!, $first: Int!) {
  metaobjects(type: $type, first: $first) {
    nodes {
      id
      type
      handle
      displayName
      updatedAt
      fields {
        key
        value
      }
    }
  }
}
`;

export const METAOBJECT_BY_HANDLE_QUERY = `
query MetaobjectByHandle($type: String!, $handle: String!) {
  metaobjectByHandle(type: $type, handle: $handle) {
    id
    type
    handle
    displayName
    updatedAt
    fields {
      key
      value
    }
  }
}
`;