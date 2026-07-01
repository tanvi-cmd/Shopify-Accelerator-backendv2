import { RuntimeContext } from "../../shared/interfaces/runtime-context";

import CartService from "../cart/service";

import { RuleEngineService } from "./rule-engine.service";
import { ValidationService } from "./validation.service";
import { PricingEngineService } from "./pricing-engine.service";
import { SkuBuilderService } from "./sku-builder.service";
import { QuoteService } from "./quote.service";
import { ConfiguratorSessionService } from "./session.service";

import {
  ConfiguratorCartLine,
  ConfiguratorConfig
} from "./types";

class ConfiguratorService {
  private ruleEngine =
    new RuleEngineService();

  private validator =
    new ValidationService();

  private pricingEngine =
    new PricingEngineService();

  private skuBuilder =
    new SkuBuilderService();

  private quoteService =
    new QuoteService();

  private sessionService =
    new ConfiguratorSessionService();

  private getConfig(
    context: RuntimeContext
  ): ConfiguratorConfig {
    return (
      (context as any).configuration ||
      (context as any).configuratorConfig ||
      {}
    );
  }

  private getCartIdFromCreateResult(
    result: any
  ): string | null {
    return (
      result?.data?.cartCreate?.cart?.id ||
      null
    );
  }

  async validate(
    context: RuntimeContext
  ) {
    const started = Date.now();

    const config =
      this.ruleEngine.execute(
        this.getConfig(context)
      );

    const validation =
      this.validator.validate(config);

    return {
      success: validation.valid,
      status: 200,
      duration: Date.now() - started,
      data: validation
    };
  }

  async price(
    context: RuntimeContext
  ) {
    const started = Date.now();

    const config =
      this.ruleEngine.execute(
        this.getConfig(context)
      );

    const validation =
      this.validator.validate(config);

    if (!validation.valid) {
      return {
        success: false,
        status: 400,
        duration: Date.now() - started,
        data: validation
      };
    }

    const price =
      this.pricingEngine.calculate(config);

    return {
      success: true,
      status: 200,
      duration: Date.now() - started,
      data: price
    };
  }

  async sku(
    context: RuntimeContext
  ) {
    const started = Date.now();

    const config =
      this.ruleEngine.execute(
        this.getConfig(context)
      );

    const sku =
      this.skuBuilder.build(config);

    return {
      success: true,
      status: 200,
      duration: Date.now() - started,
      data: sku
    };
  }

  async cartLines(
    context: RuntimeContext
  ) {
    const started = Date.now();

    const config =
      this.ruleEngine.execute(
        this.getConfig(context)
      );

    if (!config.variantId) {
      return {
        success: false,
        status: 400,
        duration: Date.now() - started,
        error:
          "variantId is required to generate Shopify cart lines."
      };
    }

    const sku =
      this.skuBuilder.build(config);

    const price =
      this.pricingEngine.calculate(config);

    const line: ConfiguratorCartLine = {
      merchandiseId: config.variantId,
      quantity: config.quantity || 1,
      attributes: [
        {
          key: "_Configurator SKU",
          value: sku.sku
        },
        {
          key: "_Configurator Price",
          value: String(price.totalPrice)
        },
        {
          key: "_Configurator Payload",
          value: JSON.stringify(config)
        }
      ]
    };

    return {
      success: true,
      status: 200,
      duration: Date.now() - started,
      data: {
        lines: [line],
        sku,
        price
      }
    };
  }

  async addToCart(
    context: RuntimeContext
  ) {
    const started = Date.now();

    const cartLinesResult: any =
      await this.cartLines(context);

    if (!cartLinesResult.success) {
      return {
        ...cartLinesResult,
        duration: Date.now() - started
      };
    }

    let cartId =
      (context as any).cartId;

    let createdCart: any = null;

    if (!cartId) {
      createdCart =
        await CartService.createCart(context);

      cartId =
        this.getCartIdFromCreateResult(
          createdCart
        );

      if (!cartId) {
        return {
          success: false,
          status: 400,
          duration: Date.now() - started,
          error: "Unable to create Shopify cart.",
          data: {
            createdCart
          }
        };
      }
    }

    (context as any).cartId =
      cartId;

    (context as any).lines =
      cartLinesResult.data.lines;

    const addResult =
      await CartService.addLines(context);

    return {
      success: addResult.success,
      status: addResult.status || 200,
      duration: Date.now() - started,
      data: {
        cartId,
        createdCart,
        cartLines: cartLinesResult.data.lines,
        addResult
      }
    };
  }

  async quote(
    context: RuntimeContext
  ) {
    const started = Date.now();

    const config =
      this.ruleEngine.execute(
        this.getConfig(context)
      );

    const validation =
      this.validator.validate(config);

    if (!validation.valid) {
      return {
        success: false,
        status: 400,
        duration: Date.now() - started,
        data: validation
      };
    }

    const price =
      this.pricingEngine.calculate(config);

    const sku =
      this.skuBuilder.build(config);

    const quote =
      this.quoteService.generate(
        config,
        price,
        sku
      );

    return {
      success: true,
      status: 200,
      duration: Date.now() - started,
      data: quote
    };
  }

  async session(
    context: RuntimeContext
  ) {
    const started = Date.now();

    const config =
      this.ruleEngine.execute(
        this.getConfig(context)
      );

    const session =
      this.sessionService.create(config);

    return {
      success: true,
      status: 200,
      duration: Date.now() - started,
      data: session
    };
  }

  async explore(
    context: RuntimeContext
  ) {
    const started = Date.now();

    const validation =
      await this.validate(context);

    const price =
      await this.price(context);

    const sku =
      await this.sku(context);

    const quote =
      await this.quote(context);

    const cartLines =
      await this.cartLines(context);

    let cart: any = null;

    if (context.enableConfigurator === true) {
      cart =
        await this.addToCart(context);
    } else {
      cart = {
        success: false,
        status: 200,
        message:
          "Configurator is disabled. Set enableConfigurator=true to create cart item."
      };
    }

    return {
      success: true,
      status: 200,
      module: "Configurator",
      duration: Date.now() - started,
      data: {
        enabled:
          context.enableConfigurator === true,
        validation,
        price,
        sku,
        quote,
        cartLines,
        cart
      }
    };
  }
}

export default new ConfiguratorService();