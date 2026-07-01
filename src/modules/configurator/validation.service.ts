import {
  ConfiguratorConfig,
  ConfiguratorValidationResult
} from "./types";

export class ValidationService {
  validate(
    config: ConfiguratorConfig
  ): ConfiguratorValidationResult {
    const errors: string[] = [];
    const warnings: string[] = [];

    if (!config) {
      errors.push("configuration is required.");
    }

    if (!config?.productType) {
      warnings.push("productType is not provided.");
    }

    if (
      config?.quantity !== undefined &&
      config.quantity <= 0
    ) {
      errors.push("quantity must be greater than 0.");
    }

    if (
      config?.width !== undefined &&
      config.width <= 0
    ) {
      errors.push("width must be greater than 0.");
    }

    if (
      config?.height !== undefined &&
      config.height <= 0
    ) {
      errors.push("height must be greater than 0.");
    }

    return {
      valid: errors.length === 0,
      errors,
      warnings
    };
  }
}