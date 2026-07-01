import ShopifyService from "../../services/shopify.service";
import { RuntimeContext } from "../../shared/interfaces/runtime-context";

import {
  LIST_DISCOUNTS_QUERY,
  DISCOUNT_BY_ID_QUERY,
  CREATE_BASIC_DISCOUNT_MUTATION,
  UPDATE_BASIC_DISCOUNT_MUTATION,
  DELETE_DISCOUNT_MUTATION,
  APPLY_DISCOUNT_TO_CART_MUTATION
} from "./graphql";

class CouponsService {
  private getInput(context: RuntimeContext) {
    return {
      ...(context as any),
      ...((context as any).coupon || {})
    };
  }

  private normalizeCode(code: any) {
    return String(code || "")
      .trim()
      .toUpperCase();
  }

  private normalizeDiscountId(id: string) {
    if (!id) return "";

    if (id.startsWith("gid://shopify/DiscountCodeNode/")) {
      return id;
    }

    return `gid://shopify/DiscountCodeNode/${id}`;
  }

  private getUserErrors(result: any, key: string) {
    return result?.data?.[key]?.userErrors || [];
  }

  private validateInput(input: any) {
    const errors: string[] = [];

    if (!input.code) {
      errors.push("code is required.");
    }

    if (
      !input.type ||
      !["percentage", "fixed"].includes(input.type)
    ) {
      errors.push("type must be percentage or fixed.");
    }

    const value = Number(input.value);

    if (!value || value <= 0) {
      errors.push("value must be greater than 0.");
    }

    if (
      input.type === "percentage" &&
      value > 100
    ) {
      errors.push("percentage value cannot be greater than 100.");
    }

    return errors;
  }

  private buildBasicCodeDiscount(input: any) {
    const code = this.normalizeCode(input.code);
    const value = Number(input.value);

    const basicCodeDiscount: any = {
      title: input.title || code,
      code,
      startsAt:
        input.startsAt ||
        new Date().toISOString(),

      customerSelection: {
        all: true
      },

      customerGets: {
        value:
          input.type === "percentage"
            ? {
                percentage: Number(
                  (value / 100).toFixed(4)
                )
              }
            : {
                discountAmount: {
                  amount: String(value),
                  appliesOnEachItem: false
                }
              },

        items: {
          all: true
        }
      },

      appliesOncePerCustomer:
        input.appliesOncePerCustomer ?? false,

      combinesWith: {
        orderDiscounts:
          input.combinesWith?.orderDiscounts ?? false,
        productDiscounts:
          input.combinesWith?.productDiscounts ?? false,
        shippingDiscounts:
          input.combinesWith?.shippingDiscounts ?? false
      }
    };

    if (input.endsAt !== undefined) {
      basicCodeDiscount.endsAt =
        input.endsAt || null;
    }

    if (input.usageLimit) {
      basicCodeDiscount.usageLimit =
        Number(input.usageLimit);
    }

    if (input.minimumSubtotal) {
      basicCodeDiscount.minimumRequirement = {
        subtotal: {
          greaterThanOrEqualToSubtotal:
            String(input.minimumSubtotal)
        }
      };
    }

    return basicCodeDiscount;
  }

  async listCoupons(context: RuntimeContext) {
    const input = this.getInput(context);

    return ShopifyService.execute({
      api: "admin",
      context,
      query: LIST_DISCOUNTS_QUERY,
      variables: {
        first: context.pageSize || 20,
        query:
          input.query ||
          input.search ||
          "method:code"
      }
    });
  }

  async getCoupon(context: RuntimeContext) {
    const input = this.getInput(context);

    const id =
      input.discountId ||
      input.couponId ||
      input.id;

    if (!id) {
      return {
        success: false,
        status: 400,
        duration: 0,
        error: "discountId is required."
      };
    }

    return ShopifyService.execute({
      api: "admin",
      context,
      query: DISCOUNT_BY_ID_QUERY,
      variables: {
        id: this.normalizeDiscountId(id)
      }
    });
  }

  async createCoupon(context: RuntimeContext) {
    const started = Date.now();
    const input = this.getInput(context);

    const errors = this.validateInput(input);

    if (errors.length > 0) {
      return {
        success: false,
        status: 400,
        duration: Date.now() - started,
        errors
      };
    }

    const result: any =
      await ShopifyService.execute({
        api: "admin",
        context,
        query: CREATE_BASIC_DISCOUNT_MUTATION,
        variables: {
          basicCodeDiscount:
            this.buildBasicCodeDiscount(input)
        }
      });

    const userErrors =
      this.getUserErrors(
        result,
        "discountCodeBasicCreate"
      );

    if (userErrors.length > 0) {
      return {
        success: false,
        status: 400,
        duration: Date.now() - started,
        errors: userErrors,
        raw: result
      };
    }

    return {
      ...result,
      success: true,
      status: 200,
      duration: Date.now() - started
    };
  }

  async updateCoupon(context: RuntimeContext) {
    const started = Date.now();
    const input = this.getInput(context);

    const id =
      input.discountId ||
      input.couponId ||
      input.id;

    if (!id) {
      return {
        success: false,
        status: 400,
        duration: Date.now() - started,
        error: "discountId is required."
      };
    }

    const errors = this.validateInput(input);

    if (errors.length > 0) {
      return {
        success: false,
        status: 400,
        duration: Date.now() - started,
        errors
      };
    }

    const result: any =
      await ShopifyService.execute({
        api: "admin",
        context,
        query: UPDATE_BASIC_DISCOUNT_MUTATION,
        variables: {
          id: this.normalizeDiscountId(id),
          basicCodeDiscount:
            this.buildBasicCodeDiscount(input)
        }
      });

    const userErrors =
      this.getUserErrors(
        result,
        "discountCodeBasicUpdate"
      );

    if (userErrors.length > 0) {
      return {
        success: false,
        status: 400,
        duration: Date.now() - started,
        errors: userErrors,
        raw: result
      };
    }

    return {
      ...result,
      success: true,
      status: 200,
      duration: Date.now() - started
    };
  }

  async deleteCoupon(context: RuntimeContext) {
    const started = Date.now();
    const input = this.getInput(context);

    const id =
      input.discountId ||
      input.couponId ||
      input.id;

    if (!id) {
      return {
        success: false,
        status: 400,
        duration: Date.now() - started,
        error: "discountId is required."
      };
    }

    const result: any =
      await ShopifyService.execute({
        api: "admin",
        context,
        query: DELETE_DISCOUNT_MUTATION,
        variables: {
          id: this.normalizeDiscountId(id)
        }
      });

    const userErrors =
      this.getUserErrors(
        result,
        "discountCodeDelete"
      );

    if (userErrors.length > 0) {
      return {
        success: false,
        status: 400,
        duration: Date.now() - started,
        errors: userErrors,
        raw: result
      };
    }

    return {
      ...result,
      success: true,
      status: 200,
      duration: Date.now() - started
    };
  }

  async validateCoupon(context: RuntimeContext) {
    const started = Date.now();
    const input = this.getInput(context);

    const code =
      this.normalizeCode(input.code);

    if (!code) {
      return {
        success: false,
        status: 400,
        duration: Date.now() - started,
        error: "code is required."
      };
    }

    const result: any =
      await ShopifyService.execute({
        api: "admin",
        context,
        query: LIST_DISCOUNTS_QUERY,
        variables: {
          first: 1,
          query: `code:${code}`
        }
      });

    const node =
      result?.data?.discountNodes?.nodes?.[0];

    return {
      success: !!node,
      status: node ? 200 : 404,
      duration: Date.now() - started,
      data: {
        valid: !!node,
        code,
        discount: node || null
      }
    };
  }

  async applyToCart(context: RuntimeContext) {
    const started = Date.now();
    const input = this.getInput(context);

    const cartId = input.cartId;
    const code = this.normalizeCode(input.code);

    if (!cartId) {
      return {
        success: false,
        status: 400,
        duration: Date.now() - started,
        error: "cartId is required."
      };
    }

    if (!code) {
      return {
        success: false,
        status: 400,
        duration: Date.now() - started,
        error: "code is required."
      };
    }

    return ShopifyService.execute({
      api: "storefront",
      context,
      query: APPLY_DISCOUNT_TO_CART_MUTATION,
      variables: {
        cartId,
        discountCodes: [code]
      }
    });
  }

  async explore(context: RuntimeContext) {
    const started = Date.now();

    const discounts =
      await ShopifyService.execute({
        api: "admin",
        context,
        query: LIST_DISCOUNTS_QUERY,
        variables: {
          first: context.pageSize || 10,
          query: "method:code"
        }
      });

    return {
      success: true,
      status: 200,
      module: "Coupons",
      duration: Date.now() - started,
      data: {
        provider: "Shopify Discounts",
        discounts
      }
    };
  }
}

export default new CouponsService();