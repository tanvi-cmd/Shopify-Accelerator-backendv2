import { Request, Response } from "express";

import WebhookService from "./service";
import { createRuntimeContext } from "../../lib/runtime-context";

class WebhookController {
  private async handle(
    req: Request,
    res: Response,
    topic: string
  ) {
    const result =
      await WebhookService.handle({
        topic,
        payload: req.body,
        headers: req.headers,
        webhookSecret:
          req.body?.webhookSecret ||
          process.env.SHOPIFY_WEBHOOK_SECRET
      });

    return res
      .status(result.status || 200)
      .json(result);
  }

  async ordersCreate(
    req: Request,
    res: Response
  ) {
    return this.handle(
      req,
      res,
      "orders/create"
    );
  }

  async ordersUpdate(
    req: Request,
    res: Response
  ) {
    return this.handle(
      req,
      res,
      "orders/update"
    );
  }

  async ordersPaid(
    req: Request,
    res: Response
  ) {
    return this.handle(
      req,
      res,
      "orders/paid"
    );
  }

  async ordersCancelled(
    req: Request,
    res: Response
  ) {
    return this.handle(
      req,
      res,
      "orders/cancelled"
    );
  }

  async ordersFulfilled(
    req: Request,
    res: Response
  ) {
    return this.handle(
      req,
      res,
      "orders/fulfilled"
    );
  }

  async customersCreate(
    req: Request,
    res: Response
  ) {
    return this.handle(
      req,
      res,
      "customers/create"
    );
  }

  async customersUpdate(
    req: Request,
    res: Response
  ) {
    return this.handle(
      req,
      res,
      "customers/update"
    );
  }

  async productsCreate(
    req: Request,
    res: Response
  ) {
    return this.handle(
      req,
      res,
      "products/create"
    );
  }

  async productsUpdate(
    req: Request,
    res: Response
  ) {
    return this.handle(
      req,
      res,
      "products/update"
    );
  }

  async metaobjectsCreate(
    req: Request,
    res: Response
  ) {
    return this.handle(
      req,
      res,
      "metaobjects/create"
    );
  }

  async metaobjectsUpdate(
    req: Request,
    res: Response
  ) {
    return this.handle(
      req,
      res,
      "metaobjects/update"
    );
  }

  async generic(
    req: Request,
    res: Response
  ) {
    const topic =
      req.headers["x-shopify-topic"] ||
      req.body?.topic ||
      "generic";

    return this.handle(
      req,
      res,
      String(topic)
    );
  }

  async events(
    req: Request,
    res: Response
  ) {
    const result =
      await WebhookService.listEvents();

    return res
      .status(result.status || 200)
      .json(result);
  }

  async explorer(
    req: Request,
    res: Response
  ) {
    const context =
      createRuntimeContext(req);

    const result =
      await WebhookService.explore(context);

    return res
      .status(result.status || 200)
      .json(result);
  }
}

export default new WebhookController();