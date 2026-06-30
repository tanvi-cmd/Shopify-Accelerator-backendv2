import { RuntimeContext } from "./runtime-context";

export interface ModuleResult {
  success: boolean;
  module: string;
  data: any;
  error?: any;
  duration: number;
}

export interface AcceleratorModule {
  readonly name: string;

  execute(
    context: RuntimeContext
  ): Promise<ModuleResult>;
}