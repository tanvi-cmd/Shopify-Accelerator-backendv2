export const CUSTOMER_PROFILE_QUERY = `
query CustomerProfile($customerAccessToken: String!) {
  customer(customerAccessToken: $customerAccessToken) {
    id
    firstName
    lastName
    displayName
    email
    phone
    acceptsMarketing

    defaultAddress {
      id
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
  }
}
`;

export const CUSTOMER_ORDERS_QUERY = `
query CustomerOrders(
  $customerAccessToken: String!,
  $first: Int!
) {
  customer(customerAccessToken: $customerAccessToken) {
    orders(first: $first) {
      nodes {
        id
        name
        processedAt
        financialStatus
        fulfillmentStatus

        totalPrice {
          amount
          currencyCode
        }
      }
    }
  }
}
`;

export const CUSTOMER_ADDRESSES_QUERY = `
query CustomerAddresses(
  $customerAccessToken: String!,
  $first: Int!
) {
  customer(customerAccessToken: $customerAccessToken) {
    addresses(first: $first) {
      nodes {
        id
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
    }
  }
}
`;

export const CUSTOMER_ADDRESS_CREATE_MUTATION = `
mutation CustomerAddressCreate(
  $customerAccessToken: String!,
  $address: MailingAddressInput!
) {
  customerAddressCreate(
    customerAccessToken: $customerAccessToken
    address: $address
  ) {
    customerAddress {
      id
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

    customerUserErrors {
      field
      message
    }
  }
}
`;

export const CUSTOMER_ADDRESS_UPDATE_MUTATION = `
mutation CustomerAddressUpdate(
  $customerAccessToken: String!,
  $id: ID!,
  $address: MailingAddressInput!
) {
  customerAddressUpdate(
    customerAccessToken: $customerAccessToken
    id: $id
    address: $address
  ) {
    customerAddress {
      id
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

    customerUserErrors {
      field
      message
    }
  }
}
`;

export const CUSTOMER_ADDRESS_DELETE_MUTATION = `
mutation CustomerAddressDelete(
  $customerAccessToken: String!,
  $id: ID!
) {
  customerAddressDelete(
    customerAccessToken: $customerAccessToken
    id: $id
  ) {
    deletedCustomerAddressId

    customerUserErrors {
      field
      message
    }
  }
}
`;