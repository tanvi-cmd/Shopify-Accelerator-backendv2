const CREATE_CART = `
mutation CartCreate {
  cartCreate {
    cart {
      id
      checkoutUrl
      totalQuantity
    }
    userErrors {
      field
      message
    }
  }
}
`;

export default CREATE_CART;