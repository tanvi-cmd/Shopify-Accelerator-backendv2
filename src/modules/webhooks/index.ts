import WebhookService from "./service";

export default {
  name: "Webhooks",

  async execute(context: any) {
    return WebhookService.explore(context);
  }
};