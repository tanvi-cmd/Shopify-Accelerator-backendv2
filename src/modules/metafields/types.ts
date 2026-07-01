export interface MetafieldRequest {

  ownerType:
    | "PRODUCT"
    | "COLLECTION"
    | "CUSTOMER"
    | "ORDER";

  ownerId: string;

  namespace?: string;

  key?: string;

}