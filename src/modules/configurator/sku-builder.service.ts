import {
  ConfiguratorConfig,
  ConfiguratorSkuResult
} from "./types";

export class SkuBuilderService {
  build(
    config: ConfiguratorConfig
  ): ConfiguratorSkuResult {
    const parts: string[] = [];

    parts.push(
      config.productType
        ? String(config.productType).toUpperCase()
        : "CUSTOM"
    );

    if (config.material) {
      parts.push(
        String(config.material).toUpperCase()
      );
    }

    if (config.color) {
      parts.push(
        String(config.color).toUpperCase()
      );
    }

    if (config.width && config.height) {
      parts.push(
        `${config.width}X${config.height}`
      );
    }

    for (const option of config.options || []) {
      if (option.skuPart) {
        parts.push(
          String(option.skuPart).toUpperCase()
        );
      }
    }

    return {
      sku: parts.join("-"),
      parts
    };
  }
}