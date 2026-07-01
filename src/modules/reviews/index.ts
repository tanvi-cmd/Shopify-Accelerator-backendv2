import ReviewsService from "./service";

export default {
  name: "Reviews",

  async execute(context: any) {
    return ReviewsService.explore(context);
  }
};