import { ExplorerService }
  from "./explorer.service";

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
      new ExplorerService();

    const result =
      await service.connect(
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