import { ConfiguratorConfig } from "./types";

export class ConfiguratorSessionService {
  create(
    config: ConfiguratorConfig
  ) {
    return {
      sessionId: `cfg_${Date.now()}`,
      createdAt: new Date().toISOString(),
      configuration: config
    };
  }
}