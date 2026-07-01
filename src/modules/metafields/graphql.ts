export const PRODUCT_METAFIELDS_QUERY = `
query ProductMetafields($first: Int!, $metafieldsFirst: Int!) {
  products(first: $first) {
    nodes {
      id
      title
      handle
      metafields(first: $metafieldsFirst) {
        nodes {
          id
          namespace
          key
          value
          type
          description
        }
      }
    }
  }
}
`;

export const COLLECTION_METAFIELDS_QUERY = `
query CollectionMetafields($first: Int!, $metafieldsFirst: Int!) {
  collections(first: $first) {
    nodes {
      id
      title
      handle
      metafields(first: $metafieldsFirst) {
        nodes {
          id
          namespace
          key
          value
          type
          description
        }
      }
    }
  }
}
`;

export const CUSTOMER_METAFIELDS_QUERY = `
query CustomerMetafields($first: Int!, $metafieldsFirst: Int!) {
  customers(first: $first) {
    nodes {
      id
      displayName
      email
      metafields(first: $metafieldsFirst) {
        nodes {
          id
          namespace
          key
          value
          type
          description
        }
      }
    }
  }
}
`;

export const ORDER_METAFIELDS_QUERY = `
query OrderMetafields($first: Int!, $metafieldsFirst: Int!) {
  orders(first: $first, sortKey: CREATED_AT, reverse: true) {
    nodes {
      id
      name
      email
      metafields(first: $metafieldsFirst) {
        nodes {
          id
          namespace
          key
          value
          type
          description
        }
      }
    }
  }
}
`;

export const PAGE_METAFIELDS_QUERY = `
query PageMetafields($first: Int!, $metafieldsFirst: Int!) {
  pages(first: $first) {
    nodes {
      id
      title
      handle
      metafields(first: $metafieldsFirst) {
        nodes {
          id
          namespace
          key
          value
          type
          description
        }
      }
    }
  }
}
`;

export const BLOG_METAFIELDS_QUERY = `
query BlogMetafields($first: Int!, $metafieldsFirst: Int!) {
  blogs(first: $first) {
    nodes {
      id
      title
      handle
      metafields(first: $metafieldsFirst) {
        nodes {
          id
          namespace
          key
          value
          type
          description
        }
      }
    }
  }
}
`;

export const ARTICLE_METAFIELDS_QUERY = `
query ArticleMetafields($first: Int!, $metafieldsFirst: Int!) {
  articles(first: $first) {
    nodes {
      id
      title
      handle
      metafields(first: $metafieldsFirst) {
        nodes {
          id
          namespace
          key
          value
          type
          description
        }
      }
    }
  }
}
`;

export const VARIANT_METAFIELDS_QUERY = `
query VariantMetafields($first: Int!, $metafieldsFirst: Int!) {
  productVariants(first: $first) {
    nodes {
      id
      title
      sku
      metafields(first: $metafieldsFirst) {
        nodes {
          id
          namespace
          key
          value
          type
          description
        }
      }
    }
  }
}
`;

export const SHOP_METAFIELDS_QUERY = `
query ShopMetafields($metafieldsFirst: Int!) {
  shop {
    id
    name
    metafields(first: $metafieldsFirst) {
      nodes {
        id
        namespace
        key
        value
        type
        description
      }
    }
  }
}
`;

export const NODE_METAFIELDS_QUERY = `
query NodeMetafields($id: ID!, $first: Int!) {
  node(id: $id) {
    id

    ... on Product {
      title
      handle
      metafields(first: $first) {
        nodes {
          id
          namespace
          key
          value
          type
          description
        }
      }
    }

    ... on Collection {
      title
      handle
      metafields(first: $first) {
        nodes {
          id
          namespace
          key
          value
          type
          description
        }
      }
    }

    ... on Customer {
      displayName
      email
      metafields(first: $first) {
        nodes {
          id
          namespace
          key
          value
          type
          description
        }
      }
    }

    ... on Order {
      name
      metafields(first: $first) {
        nodes {
          id
          namespace
          key
          value
          type
          description
        }
      }
    }

    ... on Page {
      title
      handle
      metafields(first: $first) {
        nodes {
          id
          namespace
          key
          value
          type
          description
        }
      }
    }

    ... on Blog {
      title
      handle
      metafields(first: $first) {
        nodes {
          id
          namespace
          key
          value
          type
          description
        }
      }
    }

    ... on Article {
      title
      handle
      metafields(first: $first) {
        nodes {
          id
          namespace
          key
          value
          type
          description
        }
      }
    }

    ... on ProductVariant {
      title
      sku
      metafields(first: $first) {
        nodes {
          id
          namespace
          key
          value
          type
          description
        }
      }
    }

    ... on Shop {
      name
      metafields(first: $first) {
        nodes {
          id
          namespace
          key
          value
          type
          description
        }
      }
    }
  }
}
`;