export const DISCOUNT_NODE_FIELDS = `
id

codeDiscount {
  __typename

  ... on DiscountCodeBasic {
    title
    status
    startsAt
    endsAt
    usageLimit
    appliesOncePerCustomer
    asyncUsageCount

    codes(first: 20) {
      nodes {
        id
        code
      }
    }

    customerGets {
      value {
        __typename

        ... on DiscountPercentage {
          percentage
        }

        ... on DiscountAmount {
          amount {
            amount
            currencyCode
          }
          appliesOnEachItem
        }
      }
    }

    minimumRequirement {
      __typename
    }

    combinesWith {
      orderDiscounts
      productDiscounts
      shippingDiscounts
    }
  }
}
`;

export const LIST_DISCOUNTS_QUERY = `
query ListDiscounts(
  $first: Int!,
  $query: String
) {
  discountNodes(
    first: $first,
    query: $query,
    reverse: true
  ) {
    nodes {
      ${DISCOUNT_NODE_FIELDS}
    }

    pageInfo {
      hasNextPage
      endCursor
    }
  }
}
`;

export const DISCOUNT_BY_ID_QUERY = `
query DiscountById($id: ID!) {
  discountNode(id: $id) {
    ${DISCOUNT_NODE_FIELDS}
  }
}
`;

export const CREATE_BASIC_DISCOUNT_MUTATION = `
mutation CreateBasicDiscount(
  $basicCodeDiscount: DiscountCodeBasicInput!
) {
  discountCodeBasicCreate(
    basicCodeDiscount: $basicCodeDiscount
  ) {
    codeDiscountNode {
      ${DISCOUNT_NODE_FIELDS}
    }

    userErrors {
      field
      code
      message
    }
  }
}
`;

export const UPDATE_BASIC_DISCOUNT_MUTATION = `
mutation UpdateBasicDiscount(
  $id: ID!,
  $basicCodeDiscount: DiscountCodeBasicInput!
) {
  discountCodeBasicUpdate(
    id: $id,
    basicCodeDiscount: $basicCodeDiscount
  ) {
    codeDiscountNode {
      ${DISCOUNT_NODE_FIELDS}
    }

    userErrors {
      field
      code
      message
    }
  }
}
`;

export const DELETE_DISCOUNT_MUTATION = `
mutation DeleteDiscount($id: ID!) {
  discountCodeDelete(id: $id) {
    deletedCodeDiscountId

    userErrors {
      field
      code
      message
    }
  }
}
`;

export const APPLY_DISCOUNT_TO_CART_MUTATION = `
mutation ApplyDiscountToCart(
  $cartId: ID!,
  $discountCodes: [String!]!
) {
  cartDiscountCodesUpdate(
    cartId: $cartId,
    discountCodes: $discountCodes
  ) {
    cart {
      id
      checkoutUrl
      totalQuantity

      discountCodes {
        code
        applicable
      }

      cost {
        subtotalAmount {
          amount
          currencyCode
        }

        totalAmount {
          amount
          currencyCode
        }
      }
    }

    userErrors {
      field
      message
    }
  }
}
`;