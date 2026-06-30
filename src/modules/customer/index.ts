import CustomerService from "./service";

export default {
  name: "Customers",

  async execute(context: any) {
    return CustomerService.getProfile(context);
  }
};