import { RuntimeContext } from "../../shared/interfaces/runtime-context";
import { getPrismaClient } from "../../lib/prisma";

class ReviewsService {
  private getInput(context: RuntimeContext) {
    return (
      (context as any).review ||
      (context as any).reviewData ||
      (context as any)
    );
  }

  private normalizeRating(rating: any) {
    if (
      rating === undefined ||
      rating === null ||
      rating === ""
    ) {
      return {
        valid: false,
        value: null,
        error: "rating is required."
      };
    }

    const value = Number(rating);

    if (!Number.isInteger(value)) {
      return {
        valid: false,
        value: null,
        error: "rating must be an integer."
      };
    }

    if (value < 1 || value > 5) {
      return {
        valid: false,
        value: null,
        error: "rating must be between 1 and 5."
      };
    }

    return {
      valid: true,
      value,
      error: null
    };
  }

  async getReviews(context: RuntimeContext) {
    const started = Date.now();

    const prisma = getPrismaClient(
      context.databaseUrl
    );

    const input = this.getInput(context);

    const where: any = {};

    if (input.productId) {
      where.productId = input.productId;
    }

    if (input.customerId) {
      where.customerId = input.customerId;
    }

    if (input.status) {
      where.status = input.status;
    }

    const reviews =
      await prisma.review.findMany({
        where,
        orderBy: {
          createdAt: "desc"
        },
        take: context.pageSize || 20
      });

    return {
      success: true,
      status: 200,
      duration: Date.now() - started,
      data: {
        total: reviews.length,
        reviews
      }
    };
  }

  async getSummary(context: RuntimeContext) {
    const started = Date.now();

    const prisma = getPrismaClient(
      context.databaseUrl
    );

    const input = this.getInput(context);

    const productId =
      input.productId;

    if (!productId) {
      return {
        success: false,
        status: 400,
        duration: Date.now() - started,
        error: "productId is required."
      };
    }

    const summary =
      await prisma.review.aggregate({
        where: {
          productId,
          status: "approved"
        },
        _avg: {
          rating: true
        },
        _count: {
          _all: true
        }
      });

    return {
      success: true,
      status: 200,
      duration: Date.now() - started,
      data: {
        productId,
        totalReviews: summary._count._all,
        averageRating: summary._avg.rating || 0
      }
    };
  }

  async addReview(context: RuntimeContext) {
    const started = Date.now();

    const prisma = getPrismaClient(
      context.databaseUrl
    );

    const input = this.getInput(context);

    const productId =
      input.productId;

    if (!productId) {
      return {
        success: false,
        status: 400,
        duration: Date.now() - started,
        error: "productId is required."
      };
    }

    const ratingResult =
      this.normalizeRating(input.rating);

    if (!ratingResult.valid) {
      return {
        success: false,
        status: 400,
        duration: Date.now() - started,
        error: ratingResult.error
      };
    }

    const review =
      await prisma.review.create({
        data: {
          productId,
          customerId:
            input.customerId || null,
          customerEmail:
            input.customerEmail ||
            input.email ||
            null,
          customerName:
            input.customerName || null,
          rating:
            ratingResult.value as number,
          title:
            input.title || null,
          body:
            input.body || null,
          status:
            input.status || "approved",
          source:
            input.source || "accelerator"
        }
      });

    return {
      success: true,
      status: 200,
      duration: Date.now() - started,
      data: review
    };
  }

  async updateReview(context: RuntimeContext) {
    const started = Date.now();

    const prisma = getPrismaClient(
      context.databaseUrl
    );

    const input = this.getInput(context);

    const reviewId =
      input.reviewId ||
      (context as any).reviewId;

    if (!reviewId) {
      return {
        success: false,
        status: 400,
        duration: Date.now() - started,
        error: "reviewId is required."
      };
    }

    const data: any = {};

    if (input.rating !== undefined) {
      const ratingResult =
        this.normalizeRating(input.rating);

      if (!ratingResult.valid) {
        return {
          success: false,
          status: 400,
          duration: Date.now() - started,
          error: ratingResult.error
        };
      }

      data.rating =
        ratingResult.value;
    }

    if (input.title !== undefined) {
      data.title = input.title;
    }

    if (input.body !== undefined) {
      data.body = input.body;
    }

    if (input.status !== undefined) {
      data.status = input.status;
    }

    const review =
      await prisma.review.update({
        where: {
          id: reviewId
        },
        data
      });

    return {
      success: true,
      status: 200,
      duration: Date.now() - started,
      data: review
    };
  }

  async deleteReview(context: RuntimeContext) {
    const started = Date.now();

    const prisma = getPrismaClient(
      context.databaseUrl
    );

    const input = this.getInput(context);

    const reviewId =
      input.reviewId ||
      (context as any).reviewId;

    if (!reviewId) {
      return {
        success: false,
        status: 400,
        duration: Date.now() - started,
        error: "reviewId is required."
      };
    }

    await prisma.review.delete({
      where: {
        id: reviewId
      }
    });

    return {
      success: true,
      status: 200,
      duration: Date.now() - started,
      data: {
        deleted: true,
        reviewId
      }
    };
  }

  async explore(context: RuntimeContext) {
    const started = Date.now();

    const prisma = getPrismaClient(
      context.databaseUrl
    );

    const recentReviews =
      await prisma.review.findMany({
        orderBy: {
          createdAt: "desc"
        },
        take: context.pageSize || 10
      });

    const total =
      await prisma.review.count();

    const approved =
      await prisma.review.count({
        where: {
          status: "approved"
        }
      });

    const pending =
      await prisma.review.count({
        where: {
          status: "pending"
        }
      });

    const productSummary =
      await prisma.review.groupBy({
        by: ["productId"],
        _count: {
          _all: true
        },
        _avg: {
          rating: true
        }
      });

    return {
      success: true,
      status: 200,
      module: "Reviews",
      duration: Date.now() - started,
      data: {
        total,
        approved,
        pending,
        productSummary,
        recentReviews
      }
    };
  }
}

export default new ReviewsService();