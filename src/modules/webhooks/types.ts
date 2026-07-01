export type WebhookTopic =
  | "orders/create"
  | "orders/update"
  | "orders/paid"
  | "orders/cancelled"
  | "orders/fulfilled"
  | "customers/create"
  | "customers/update"
  | "products/create"
  | "products/update"
  | "metaobjects/create"
  | "metaobjects/update"
  | "generic";

export interface WebhookEvent {
  id: string;
  topic: WebhookTopic | string;
  shop: string | null;
  payload: any;
  hmacValid: boolean | null;
  receivedAt: string;
}

export interface WebhookHandleOptions {
  topic: WebhookTopic | string;
  payload: any;
  headers?: Record<string, any>;
  webhookSecret?: string;
}