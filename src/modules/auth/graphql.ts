export const CUSTOMER_PASSWORD_LOGIN_MUTATION = `
mutation CustomerPasswordLogin(
  $email: String!,
  $password: String!
) {
  customerAccessTokenCreate(
    input: {
      email: $email,
      password: $password
    }
  ) {
    customerAccessToken {
      accessToken
      expiresAt
    }

    customerUserErrors {
      code
      field
      message
    }
  }
}
`;

export const CUSTOMER_TOKEN_DELETE_MUTATION = `
mutation CustomerTokenDelete(
  $customerAccessToken: String!
) {
  customerAccessTokenDelete(
    customerAccessToken: $customerAccessToken
  ) {
    deletedAccessToken
    deletedCustomerAccessTokenId

    userErrors {
      field
      message
    }
  }
}
`;

export const CUSTOMER_ME_QUERY = `
query CustomerMe(
  $customerAccessToken: String!
) {
  customer(
    customerAccessToken: $customerAccessToken
  ) {
    id
    firstName
    lastName
    displayName
    email
    phone
  }
}
`;

export const ADMIN_CUSTOMER_BY_EMAIL_QUERY = `
query AdminCustomerByEmail(
  $query: String!
) {
  customers(
    first: 1,
    query: $query
  ) {
    nodes {
      id
      firstName
      lastName
      displayName
      email
      phone
      createdAt
      updatedAt
    }
  }
}
`;