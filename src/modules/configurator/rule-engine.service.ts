import { ConfiguratorConfig } from "./types";

export class RuleEngineService {
  execute(
    config: ConfiguratorConfig
  ): ConfiguratorConfig {
    const nextConfig = {
      ...config
    };

    if (!nextConfig.quantity) {
      nextConfig.quantity = 1;
    }

    if (!nextConfig.options) {
      nextConfig.options = [];
    }

    return nextConfig;
  }
}