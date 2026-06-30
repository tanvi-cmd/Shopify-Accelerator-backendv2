import { ModuleRegistry } from "../../config/module-registry";
import { RuntimeContext } from "../../shared/interfaces/runtime-context";

class ExplorerService {

  async connect(
    context: RuntimeContext
  ) {

    const results: Record<string, any> = {};

    for (const moduleName of context.selectedModules) {

      const module = ModuleRegistry[
        moduleName as keyof typeof ModuleRegistry
      ];

      if (!module) {
        continue;
      }

      results[moduleName] =
        await module.execute(context);

    }

    return results;

  }

}

export default new ExplorerService();