import { SearchService } from "./search.service";

export const handler = async (event: any) => {

  try {

    const body =
      JSON.parse(event.body || "{}");

    const {
      store,
      storefrontToken,
      query
    } = body;

    const service =
      new SearchService();

    const result =
      await service.search(
        store,
        storefrontToken,
        query
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