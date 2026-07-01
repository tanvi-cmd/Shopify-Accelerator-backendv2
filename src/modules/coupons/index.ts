import CouponsService from "./service";

export default {
  name: "Coupons",

  async execute(context: any) {
    return CouponsService.explore(context);
  }
};