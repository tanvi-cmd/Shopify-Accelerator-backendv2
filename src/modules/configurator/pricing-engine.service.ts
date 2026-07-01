import {
  ConfiguratorConfig,
  ConfiguratorPriceResult
} from "./types";

export class PricingEngineService {
  calculate(
    config: ConfiguratorConfig
  ): ConfiguratorPriceResult {
    const quantity =
      config.quantity || 1;

    const basePrice =
      Number((config as any).basePrice || 100);

    const optionsPrice =
      (config.options || []).reduce(
        (sum, option) =>
          sum + Number(option.price || 0),
        0
      );

    const width =
      Number(config.width || 0);

    const height =
      Number(config.height || 0);

    const sizePrice =
      width > 0 && height > 0
        ? Number(((width * height) / 1000).toFixed(2))
        : 0;

    const totalPrice =
      Number(
        (
          (basePrice + optionsPrice + sizePrice) *
          quantity
        ).toFixed(2)
      );

    return {
      basePrice,
      optionsPrice,
      sizePrice,
      totalPrice,
      currencyCode:
        (config as any).currencyCode || "USD"
    };
  }
}