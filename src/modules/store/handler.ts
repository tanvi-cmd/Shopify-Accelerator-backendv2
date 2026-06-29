import { StoreService }
  from "./store.service";

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
      new StoreService();

    const result =
      await service.getStore(
        store,
        storefrontToken
      );

    return {
      statusCode: 200,
      body: JSON.stringify(result)
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