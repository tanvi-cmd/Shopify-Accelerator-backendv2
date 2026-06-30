const CUSTOMER_LOGIN = `

mutation CustomerLogin(

    $email: String!,

    $password: String!

){

    customerAccessTokenCreate(

        input:{

            email:$email,

            password:$password

        }

    ){

        customerAccessToken{

            accessToken

            expiresAt

        }

        customerUserErrors{

            code

            field

            message

        }

    }

}

`;

export default CUSTOMER_LOGIN;