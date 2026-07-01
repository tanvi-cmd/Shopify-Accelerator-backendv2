import {
  ConfiguratorConfig,
  ConfiguratorPriceResult,
  ConfiguratorSkuResult
} from "./types";

export class QuoteService {
  generate(
    config: ConfiguratorConfig,
    price: ConfiguratorPriceResult,
    sku: ConfiguratorSkuResult
  ) {
    const quoteNumber =
      `HX-Q-${Date.now()}`;

    return {
      quoteNumber,
      createdAt: new Date().toISOString(),
      customerId: config.customerId || null,
      productId: config.productId || null,
      variantId: config.variantId || null,
      configuration: config,
      sku,
      price
    };
  }
}