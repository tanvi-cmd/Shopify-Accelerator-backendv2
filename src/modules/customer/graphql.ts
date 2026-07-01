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
      address1
      address2
      city
      province
      country
      zip
    }
  }
}
`;

export const CUSTOMER_ORDERS_QUERY = `
query CustomerOrders(
    $customerAccessToken:String!,
    $first:Int!
){
  customer(customerAccessToken:$customerAccessToken){

    orders(first:$first){

      nodes{

        id
        name
        processedAt
        financialStatus
        fulfillmentStatus

        totalPrice{
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
    $customerAccessToken:String!,
    $first:Int!
){

  customer(customerAccessToken:$customerAccessToken){

    addresses(first:$first){

      nodes{

        id

        firstName
        lastName

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