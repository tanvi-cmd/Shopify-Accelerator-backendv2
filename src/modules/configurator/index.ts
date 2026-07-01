import ConfiguratorService from "./service";

export default {
  name: "Configurator",

  async execute(context: any) {
    return ConfiguratorService.explore(context);
  }
};