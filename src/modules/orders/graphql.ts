export const ORDER_FIELDS = `
id
name
email
phone
createdAt
updatedAt
cancelledAt
cancelReason
displayFinancialStatus
displayFulfillmentStatus

totalPriceSet {
  shopMoney {
    amount
    currencyCode
  }
}

subtotalPriceSet {
  shopMoney {
    amount
    currencyCode
  }
}

totalShippingPriceSet {
  shopMoney {
    amount
    currencyCode
  }
}

totalTaxSet {
  shopMoney {
    amount
    currencyCode
  }
}

customer {
  id
  firstName
  lastName
  displayName
  email
  phone
}

billingAddress {
  firstName
  lastName
  company
  address1
  address2
  city
  province
  country
  zip
  phone
}

shippingAddress {
  firstName
  lastName
  company
  address1
  address2
  city
  province
  country
  zip
  phone
}

lineItems(first: 50) {
  nodes {
    id
    name
    title
    quantity
    sku

    variant {
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
`;

export const ORDERS_QUERY = `
query Orders(
  $first: Int!,
  $query: String
) {
  orders(
    first: $first,
    sortKey: CREATED_AT,
    reverse: true,
    query: $query
  ) {
    nodes {
      ${ORDER_FIELDS}
    }

    pageInfo {
      hasNextPage
      endCursor
    }
  }
}
`;

export const ORDER_BY_ID_QUERY = `
query OrderById($id: ID!) {
  order(id: $id) {
    ${ORDER_FIELDS}
  }
}
`;