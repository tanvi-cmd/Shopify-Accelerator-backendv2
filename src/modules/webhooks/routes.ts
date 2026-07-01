import { Router } from "express";

import WebhookController from "./controller";

const router = Router();

router.post(
  "/shopify/orders/create",
  WebhookController.ordersCreate.bind(
    WebhookController
  )
);

router.post(
  "/shopify/orders/update",
  WebhookController.ordersUpdate.bind(
    WebhookController
  )
);

router.post(
  "/shopify/orders/paid",
  WebhookController.ordersPaid.bind(
    WebhookController
  )
);

router.post(
  "/shopify/orders/cancelled",
  WebhookController.ordersCancelled.bind(
    WebhookController
  )
);

router.post(
  "/shopify/orders/fulfilled",
  WebhookController.ordersFulfilled.bind(
    WebhookController
  )
);

router.post(
  "/shopify/customers/create",
  WebhookController.customersCreate.bind(
    WebhookController
  )
);

router.post(
  "/shopify/customers/update",
  WebhookController.customersUpdate.bind(
    WebhookController
  )
);

router.post(
  "/shopify/products/create",
  WebhookController.productsCreate.bind(
    WebhookController
  )
);

router.post(
  "/shopify/products/update",
  WebhookController.productsUpdate.bind(
    WebhookController
  )
);

router.post(
  "/shopify/metaobjects/create",
  WebhookController.metaobjectsCreate.bind(
    WebhookController
  )
);

router.post(
  "/shopify/metaobjects/update",
  WebhookController.metaobjectsUpdate.bind(
    WebhookController
  )
);

router.post(
  "/shopify/generic",
  WebhookController.generic.bind(
    WebhookController
  )
);

/**
 * Old routes kept for compatibility
 */
router.post(
  "/orders/create",
  WebhookController.ordersCreate.bind(
    WebhookController
  )
);

router.post(
  "/orders/update",
  WebhookController.ordersUpdate.bind(
    WebhookController
  )
);

router.post(
  "/customers/create",
  WebhookController.customersCreate.bind(
    WebhookController
  )
);

router.post(
  "/products/update",
  WebhookController.productsUpdate.bind(
    WebhookController
  )
);

router.post(
  "/generic",
  WebhookController.generic.bind(
    WebhookController
  )
);

router.post(
  "/explorer",
  WebhookController.explorer.bind(
    WebhookController
  )
);

router.get(
  "/events",
  WebhookController.events.bind(
    WebhookController
  )
);

export default router;