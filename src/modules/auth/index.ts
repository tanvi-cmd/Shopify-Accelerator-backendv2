import AuthService from "./service";

export default {
  name: "Authentication",

  async execute(context: any) {
    return AuthService.login(context);
  }
};