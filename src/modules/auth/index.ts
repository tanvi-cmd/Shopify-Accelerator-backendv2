import AuthService from "./service";

export default {
  name: "Authentication",

  async execute(context: any) {
    if (
      !context.email &&
      !context.customerEmail
    ) {
      return {
        success: false,
        status: 200,
        module: "Authentication",
        message: "Customer email not provided."
      };
    }

    return AuthService.login(context);
  }
};