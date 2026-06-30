const SEARCH_QUERY = `

query Search(

    $query: String!,

    $first: Int!

){

    search(

        query: $query,

        first: $first,

        types: PRODUCT

    ){

        nodes{

            ... on Product{

                id

                title

                handle

                vendor

                description

                featuredImage{

                    url

                }

                priceRange{

                    minVariantPrice{

                        amount

                        currencyCode

                    }

                }

            }

        }

    }

}

`;

export default SEARCH_QUERY;