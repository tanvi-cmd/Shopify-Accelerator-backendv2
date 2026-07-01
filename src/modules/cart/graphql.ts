export const CREATE_CART = `
mutation CartCreate {
  cartCreate {
    cart {
      id
      checkoutUrl
      totalQuantity
      cost {
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

export const GET_CART = `
query GetCart($cartId: ID!) {
  cart(id: $cartId) {
    id
    checkoutUrl
    totalQuantity

    lines(first: 100) {
      nodes {
        id
        quantity

        merchandise {
          ... on ProductVariant {
            id
            title
            sku

            product {
              id
              title
              handle
            }
          }
        }
      }
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
}
`;

export const ADD_CART_LINES = `
mutation CartLinesAdd(
  $cartId: ID!,
  $lines: [CartLineInput!]!
) {
  cartLinesAdd(
    cartId: $cartId,
    lines: $lines
  ) {
    cart {
      id
      totalQuantity
    }

    userErrors {
      field
      message
    }
  }
}
`;

export const UPDATE_CART_LINES = `
mutation CartLinesUpdate(
  $cartId: ID!,
  $lines: [CartLineUpdateInput!]!
) {
  cartLinesUpdate(
    cartId: $cartId,
    lines: $lines
  ) {
    cart {
      id
      totalQuantity
    }

    userErrors {
      field
      message
    }
  }
}
`;

export const REMOVE_CART_LINES = `
mutation CartLinesRemove(
  $cartId: ID!,
  $lineIds: [ID!]!
) {
  cartLinesRemove(
    cartId: $cartId,
    lineIds: $lineIds
  ) {
    cart {
      id
      totalQuantity
    }

    userErrors {
      field
      message
    }
  }
}
`;