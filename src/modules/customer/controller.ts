import { Request, Response } from "express";

import CustomerService from "./service";

import { createRuntimeContext } from "../../lib/runtime-context";

class CustomerController {

  async getProfile(
    req: Request,
    res: Response
  ) {

    const context =
      createRuntimeContext(req);

    const result =
      await CustomerService.getProfile(
        context
      );

    return res
      .status(result.status || 200)
      .json(result);

  }

  async getOrders(
    req: Request,
    res: Response
  ) {

    const context =
      createRuntimeContext(req);

    const result =
      await CustomerService.getOrders(
        context
      );

    return res
      .status(result.status || 200)
      .json(result);

  }

  async getAddresses(
    req: Request,
    res: Response
  ) {

    const context =
      createRuntimeContext(req);

    const result =
      await CustomerService.getAddresses(
        context
      );

    return res
      .status(result.status || 200)
      .json(result);

  }

  async createAddress(
  req: Request,
  res: Response
) {

  const context =
    createRuntimeContext(req);

  context.address =
    req.body.address;

  const result =
    await CustomerService.createAddress(
      context
    );

  return res
    .status(result.status || 200)
    .json(result);

}

async updateAddress(
  req: Request,
  res: Response
) {

  const context =
    createRuntimeContext(req);

  context.addressId =
    req.body.addressId;

  context.address =
    req.body.address;

  const result =
    await CustomerService.updateAddress(
      context
    );

  return res
    .status(result.status || 200)
    .json(result);

}

async deleteAddress(
  req: Request,
  res: Response
) {

  const context =
    createRuntimeContext(req);

  context.addressId =
    req.params.id;

  const result =
    await CustomerService.deleteAddress(
      context
    );

  return res
    .status(result.status || 200)
    .json(result);

}

}

export default new CustomerController();