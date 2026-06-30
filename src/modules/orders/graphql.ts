const ORDERS_QUERY = `
query Orders($first: Int!) {
  orders(first: $first, sortKey: CREATED_AT, reverse: true) {
    nodes {
      id
      name
      email
      createdAt
      updatedAt
      displayFinancialStatus
      displayFulfillmentStatus

      totalPriceSet {
        shopMoney {
          amount
          currencyCode
        }
      }

      customer {
        id
        firstName
        lastName
        email
      }
    }
  }
}
`;

export default ORDERS_QUERY;