import { Request, Response } from "express";

import CartService from "./service";

import { createRuntimeContext } from "../../lib/runtime-context";

class CartController {

  async createCart(
    req: Request,
    res: Response
  ) {

    const context =
      createRuntimeContext(req);

    const result =
      await CartService.createCart(
        context
      );

    return res
      .status(result.status || 200)
      .json(result);

  }

  async getCart(
    req: Request,
    res: Response
  ) {

    const context =
      createRuntimeContext(req);

    context.cartId =
      req.body.cartId;

    const result =
      await CartService.getCart(
        context
      );

    return res
      .status(result.status || 200)
      .json(result);

  }

  async addLines(
    req: Request,
    res: Response
  ) {

    const context =
      createRuntimeContext(req);

    context.cartId =
      req.body.cartId;

    context.lines =
      req.body.lines;

    const result =
      await CartService.addLines(
        context
      );

    return res
      .status(result.status || 200)
      .json(result);

  }

  async updateLines(
    req: Request,
    res: Response
  ) {

    const context =
      createRuntimeContext(req);

    context.cartId =
      req.body.cartId;

    context.lines =
      req.body.lines;

    const result =
      await CartService.updateLines(
        context
      );

    return res
      .status(result.status || 200)
      .json(result);

  }

  async removeLines(
    req: Request,
    res: Response
  ) {

    const context =
      createRuntimeContext(req);

    context.cartId =
      req.body.cartId;

    context.lineIds =
      req.body.lineIds;

    const result =
      await CartService.removeLines(
        context
      );

    return res
      .status(result.status || 200)
      .json(result);

  }

}

export default new CartController();