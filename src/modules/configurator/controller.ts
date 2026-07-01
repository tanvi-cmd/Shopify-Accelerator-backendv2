import { Request, Response } from "express";

import ConfiguratorService from "./service";
import { createRuntimeContext } from "../../lib/runtime-context";

class ConfiguratorController {
  async validate(
    req: Request,
    res: Response
  ) {
    const context =
      createRuntimeContext(req);

    const result =
      await ConfiguratorService.validate(context);

    return res
      .status(result.status || 200)
      .json(result);
  }

  async price(
    req: Request,
    res: Response
  ) {
    const context =
      createRuntimeContext(req);

    const result =
      await ConfiguratorService.price(context);

    return res
      .status(result.status || 200)
      .json(result);
  }

  async sku(
    req: Request,
    res: Response
  ) {
    const context =
      createRuntimeContext(req);

    const result =
      await ConfiguratorService.sku(context);

    return res
      .status(result.status || 200)
      .json(result);
  }

  async cartLines(
    req: Request,
    res: Response
  ) {
    const context =
      createRuntimeContext(req);

    const result =
      await ConfiguratorService.cartLines(context);

    return res
      .status(result.status || 200)
      .json(result);
  }

  async addToCart(
    req: Request,
    res: Response
  ) {
    const context =
      createRuntimeContext(req);

    const result =
      await ConfiguratorService.addToCart(context);

    return res
      .status(result.status || 200)
      .json(result);
  }

  async quote(
    req: Request,
    res: Response
  ) {
    const context =
      createRuntimeContext(req);

    const result =
      await ConfiguratorService.quote(context);

    return res
      .status(result.status || 200)
      .json(result);
  }

  async session(
    req: Request,
    res: Response
  ) {
    const context =
      createRuntimeContext(req);

    const result =
      await ConfiguratorService.session(context);

    return res
      .status(result.status || 200)
      .json(result);
  }
}

export default new ConfiguratorController();