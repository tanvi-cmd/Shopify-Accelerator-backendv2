import * as crypto from "crypto";

import { RuntimeContext } from "../../shared/interfaces/runtime-context";

import {
  WebhookEvent,
  WebhookHandleOptions
} from "./types";

class WebhookService {
  private events: WebhookEvent[] = [];

  private maxEvents = 100;

  private endpoints = [
    "/webhooks/shopify/orders/create",
    "/webhooks/shopify/orders/update",
    "/webhooks/shopify/orders/paid",
    "/webhooks/shopify/orders/cancelled",
    "/webhooks/shopify/orders/fulfilled",

    "/webhooks/shopify/customers/create",
    "/webhooks/shopify/customers/update",

    "/webhooks/shopify/products/create",
    "/webhooks/shopify/products/update",

    "/webhooks/shopify/metaobjects/create",
    "/webhooks/shopify/metaobjects/update",

    "/webhooks/shopify/generic"
  ];

  private createEventId() {
    return `wh_${Date.now()}_${Math.random()
      .toString(36)
      .substring(2, 10)}`;
  }

  private getHeader(
    headers: Record<string, any> | undefined,
    name: string
  ) {
    if (!headers) return undefined;

    return (
      headers[name] ||
      headers[name.toLowerCase()]
    );
  }

  private getShop(
    payload: any,
    headers?: Record<string, any>
  ) {
    return (
      this.getHeader(
        headers,
        "x-shopify-shop-domain"
      ) ||
      payload?.shop_domain ||
      payload?.shop ||
      payload?.store ||
      null
    );
  }

  private verifyHmac(
    payload: any,
    headers?: Record<string, any>,
    webhookSecret?: string
  ): boolean | null {
    const secret =
      webhookSecret ||
      process.env.SHOPIFY_WEBHOOK_SECRET;

    const hmacHeader =
      this.getHeader(
        headers,
        "x-shopify-hmac-sha256"
      );

    if (!secret || !hmacHeader) {
      return null;
    }

    const body =
      typeof payload === "string"
        ? payload
        : JSON.stringify(payload);

    const digest =
      crypto
        .createHmac("sha256", secret)
        .update(body, "utf8")
        .digest("base64");

    const digestBuffer =
      Buffer.from(digest);

    const hmacBuffer =
      Buffer.from(String(hmacHeader));

    if (
      digestBuffer.length !==
      hmacBuffer.length
    ) {
      return false;
    }

    return crypto.timingSafeEqual(
      digestBuffer,
      hmacBuffer
    );
  }

  async handle(
    options: WebhookHandleOptions
  ) {
    const started = Date.now();

    const hmacValid =
      this.verifyHmac(
        options.payload,
        options.headers,
        options.webhookSecret
      );

    const event: WebhookEvent = {
      id: this.createEventId(),
      topic: options.topic,
      shop: this.getShop(
        options.payload,
        options.headers
      ),
      payload: options.payload,
      hmacValid,
      receivedAt: new Date().toISOString()
    };

    this.events.unshift(event);

    if (this.events.length > this.maxEvents) {
      this.events =
        this.events.slice(0, this.maxEvents);
    }

    return {
      success: true,
      status: 200,
      duration: Date.now() - started,
      data: {
        received: true,
        eventId: event.id,
        topic: event.topic,
        shop: event.shop,
        hmacValid: event.hmacValid,
        totalEvents: this.events.length
      }
    };
  }

  async listEvents() {
    return {
      success: true,
      status: 200,
      duration: 0,
      data: {
        total: this.events.length,
        events: this.events
      }
    };
  }

  async explore(
    context: RuntimeContext
  ) {
    return {
      success: true,
      status: 200,
      module: "Webhooks",
      duration: 0,
      data: {
        enabled: true,
        endpoints: this.endpoints,
        recentEvents: this.events.slice(
          0,
          context.pageSize || 10
        )
      }
    };
  }
}

export default new WebhookService();