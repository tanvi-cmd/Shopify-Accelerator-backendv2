export const PAGE_QUERY = `
query Page($handle: String!) {
  page(handle: $handle) {
    id
    title
    handle
    body
    bodySummary
    seo {
      title
      description
    }
  }
}
`;

export const PAGES_QUERY = `
query Pages($first: Int!) {
  pages(first: $first) {
    nodes {
      id
      title
      handle
      body
      bodySummary
      createdAt
      updatedAt
      isPublished

      

      metafields(first: 100) {
        nodes {
          namespace
          key
          value
          type
        }
      }
    }
  }
}
`;

export const BLOGS_QUERY = `
query Blogs($first: Int!) {
  blogs(first: $first) {
    nodes {
      id
      title
      handle
    }
  }
}
`;

export const BLOG_QUERY = `
query Blog($handle: String!) {
  blog(handle: $handle) {
    id
    title
    handle
  }
}
`;

export const BLOG_ARTICLES_QUERY = `
query BlogArticles($handle: String!, $first: Int!) {
  blog(handle: $handle) {
    id
    title
    handle
    articles(first: $first) {
      nodes {
        id
        title
        handle
        excerpt
        publishedAt
      }
    }
  }
}
`;