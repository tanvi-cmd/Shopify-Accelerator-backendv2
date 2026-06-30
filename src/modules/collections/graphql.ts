const COLLECTIONS_QUERY = `

query Collections(

    $first: Int!

){

    collections(

        first: $first

    ){

        nodes{

            id

            title

            handle

            description

            image{

                url

            }

            productsCount{

                count

            }

        }

    }

}

`;

export default COLLECTIONS_QUERY;