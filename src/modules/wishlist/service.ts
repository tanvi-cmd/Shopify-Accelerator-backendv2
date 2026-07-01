import { RuntimeContext } from "../../shared/interfaces/runtime-context";
import { getPrismaClient } from "../../lib/prisma";

class WishlistService {
  async getWishlist(context: RuntimeContext) {
    if (!context.customerId) {
      return {
        success: false,
        status: 400,
        duration: 0,
        error: "customerId is required."
      };
    }

    const started = Date.now();

    const prisma = getPrismaClient(
      context.databaseUrl
    );

    const items =
      await prisma.wishlist.findMany({
        where: {
          customerId: context.customerId
        },
        orderBy: {
          createdAt: "desc"
        }
      });

    return {
      success: true,
      status: 200,
      duration: Date.now() - started,
      data: {
        customerId: context.customerId,
        items
      }
    };
  }

  async addWishlistItem(context: RuntimeContext) {
    if (!context.customerId) {
      return {
        success: false,
        status: 400,
        duration: 0,
        error: "customerId is required."
      };
    }

    if (!context.productId) {
      return {
        success: false,
        status: 400,
        duration: 0,
        error: "productId is required."
      };
    }

    const started = Date.now();

    const prisma = getPrismaClient(
      context.databaseUrl
    );

    const item =
      await prisma.wishlist.upsert({
        where: {
          customerId_productId: {
            customerId: context.customerId,
            productId: context.productId
          }
        },
        update: {},
        create: {
          customerId: context.customerId,
          productId: context.productId
        }
      });

    return {
      success: true,
      status: 200,
      duration: Date.now() - started,
      data: item
    };
  }

  async removeWishlistItem(context: RuntimeContext) {
    if (!context.customerId) {
      return {
        success: false,
        status: 400,
        duration: 0,
        error: "customerId is required."
      };
    }

    if (!context.productId) {
      return {
        success: false,
        status: 400,
        duration: 0,
        error: "productId is required."
      };
    }

    const started = Date.now();

    const prisma = getPrismaClient(
      context.databaseUrl
    );

    await prisma.wishlist.delete({
      where: {
        customerId_productId: {
          customerId: context.customerId,
          productId: context.productId
        }
      }
    });

    return {
      success: true,
      status: 200,
      duration: Date.now() - started,
      data: {
        deleted: true,
        customerId: context.customerId,
        productId: context.productId
      }
    };
  }

  async getAllWishlists(context: RuntimeContext) {
    const started = Date.now();

    const prisma = getPrismaClient(
      context.databaseUrl
    );

    const items = await prisma.wishlist.findMany({
      orderBy: {
        createdAt: "desc"
      }
    });

    const grouped = items.reduce((acc: any, item: any) => {
      if (!acc[item.customerId]) {
        acc[item.customerId] = [];
      }

      acc[item.customerId].push(item);

      return acc;
    }, {});

    return {
      success: true,
      status: 200,
      duration: Date.now() - started,
      data: {
        totalCustomers: Object.keys(grouped).length,
        totalWishlistItems: items.length,
        customers: Object.keys(grouped).map(customerId => ({
          customerId,
          items: grouped[customerId]
        }))
      }
    };
  }
}

export default new WishlistService();