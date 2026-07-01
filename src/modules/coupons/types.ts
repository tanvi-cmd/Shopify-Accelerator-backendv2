export type CouponType =
  | "percentage"
  | "fixed";

export interface ShopifyCouponInput {
  code: string;
  title?: string;
  type: CouponType;
  value: number;

  startsAt?: string;
  endsAt?: string | null;

  usageLimit?: number;
  appliesOncePerCustomer?: boolean;

  minimumSubtotal?: number;

  combinesWith?: {
    orderDiscounts?: boolean;
    productDiscounts?: boolean;
    shippingDiscounts?: boolean;
  };
}