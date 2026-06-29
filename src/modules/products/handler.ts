import { ProductService }
  from "./product.service";

export const handler = async (
  event: any
) => {

  try {

    const body =
      JSON.parse(event.body || "{}");

    const {
      store,
      storefrontToken
    } = body;

    const service =
      new ProductService();

    const products =
      await service.getProducts(
        store,
        storefrontToken
      );

    return {
      statusCode: 200,
      body: JSON.stringify(products)
    };

  } catch (error: any) {

    return {
      statusCode: 500,
      body: JSON.stringify({
        error: error.message
      })
    };

  }

};