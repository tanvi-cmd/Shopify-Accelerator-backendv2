import { CollectionService }
  from "./collection.service";

export const handler = async (
  event: any
) => {

  const body =
    JSON.parse(event.body || "{}");

  const service =
    new CollectionService();

  const result =
    await service.getCollections(
      body.store,
      body.storefrontToken
    );

  return {
    statusCode: 200,
    body: JSON.stringify(result)
  };
};