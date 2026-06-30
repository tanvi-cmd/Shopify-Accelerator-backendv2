const STORE_QUERY = `
query ShopInfo {
  shop {
    id
    name
    description
    primaryDomain {
      url
    }
    shipsToCountries
    paymentSettings {
      currencyCode
    }
    brand {
      slogan
    }
  }
}
`;

export default STORE_QUERY;