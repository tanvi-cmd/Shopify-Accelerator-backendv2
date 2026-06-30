const CUSTOMER_QUERY = `

query Customer(

    $customerAccessToken: String!

){

    customer(

        customerAccessToken: $customerAccessToken

    ){

        id

        firstName

        lastName

        email

        phone

        displayName

        acceptsMarketing

        numberOfOrders

    }

}

`;

export default CUSTOMER_QUERY;