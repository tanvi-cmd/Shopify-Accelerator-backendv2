import axios from "axios";

import ShopifyService from "../../services/shopify.service";
import { RuntimeContext } from "../../shared/interfaces/runtime-context";

import {
  CUSTOMER_PASSWORD_LOGIN_MUTATION,
  CUSTOMER_TOKEN_DELETE_MUTATION,
  CUSTOMER_ME_QUERY,
  ADMIN_CUSTOMER_BY_EMAIL_QUERY
} from "./graphql";

type LoginType = "password" | "otp" | "google";

interface OtpRecord {
  code: string;
  email: string;
  expiresAt: number;
}

const otpStore = new Map<string, OtpRecord>();

class AuthService {
  private getLoginType(context: any): LoginType {
    return (
      context.loginType ||
      context.loginMode ||
      "password"
    ).toLowerCase();
  }

  private getEmail(context: any): string {
    return (
      context.email ||
      context.customerEmail ||
      ""
    ).trim();
  }

  private getOtpKey(email: string) {
    return email.toLowerCase();
  }

  private generateOtp() {
    return Math.floor(
      100000 + Math.random() * 900000
    ).toString();
  }

  private async findCustomerByEmail(
    context: RuntimeContext,
    email: string
  ) {
    const result: any =
      await ShopifyService.execute({
        api: "admin",
        context,
        query: ADMIN_CUSTOMER_BY_EMAIL_QUERY,
        variables: {
          query: `email:${email}`
        }
      });

    return result;
  }

  async login(context: RuntimeContext) {
    const loginType =
      this.getLoginType(context);

    if (loginType === "password") {
      return this.loginWithPassword(context);
    }

    if (loginType === "otp") {
      return this.verifyOtp(context);
    }

    if (loginType === "google") {
      return this.loginWithGoogle(context);
    }

    return {
      success: false,
      status: 400,
      duration: 0,
      error: "Invalid loginType. Allowed values: password, otp, google."
    };
  }

  async loginWithPassword(context: RuntimeContext) {
    const started = Date.now();

    const email =
      this.getEmail(context);

    const password =
      (context as any).password;

    if (!email) {
      return {
        success: false,
        status: 400,
        duration: Date.now() - started,
        error: "email is required."
      };
    }

    if (!password) {
      return {
        success: false,
        status: 400,
        duration: Date.now() - started,
        error: "password is required."
      };
    }

    const result: any =
      await ShopifyService.execute({
        api: "storefront",
        context,
        query: CUSTOMER_PASSWORD_LOGIN_MUTATION,
        variables: {
          email,
          password
        }
      });

    const payload =
      result.data?.customerAccessTokenCreate;

    const errors =
      payload?.customerUserErrors || [];

    if (errors.length > 0) {
      return {
        success: false,
        status: 401,
        duration: Date.now() - started,
        loginType: "password",
        errors
      };
    }

    return {
      success: true,
      status: 200,
      duration: Date.now() - started,
      loginType: "password",
      data: {
        customerAccessToken:
          payload?.customerAccessToken?.accessToken,
        expiresAt:
          payload?.customerAccessToken?.expiresAt
      }
    };
  }

  async sendOtp(context: RuntimeContext) {
    const started = Date.now();

    const email =
      this.getEmail(context);

    if (!email) {
      return {
        success: false,
        status: 400,
        duration: Date.now() - started,
        error: "email is required."
      };
    }

    const code =
      this.generateOtp();

    otpStore.set(
      this.getOtpKey(email),
      {
        code,
        email,
        expiresAt:
          Date.now() + 10 * 60 * 1000
      }
    );

    return {
      success: true,
      status: 200,
      duration: Date.now() - started,
      loginType: "otp",
      data: {
        email,
        otpSent: true,

        /**
         * For local development only.
         * Later frontend/email service can hide this.
         */
        devOtp: code
      }
    };
  }

  async verifyOtp(context: RuntimeContext) {
    const started = Date.now();

    const email =
      this.getEmail(context);

    const otp =
      (context as any).otp;

    if (!email) {
      return {
        success: false,
        status: 400,
        duration: Date.now() - started,
        error: "email is required."
      };
    }

    if (!otp) {
      return {
        success: false,
        status: 400,
        duration: Date.now() - started,
        error: "otp is required."
      };
    }

    const key =
      this.getOtpKey(email);

    const record =
      otpStore.get(key);

    if (!record) {
      return {
        success: false,
        status: 401,
        duration: Date.now() - started,
        error: "OTP not found or expired. Please request a new OTP."
      };
    }

    if (record.expiresAt < Date.now()) {
      otpStore.delete(key);

      return {
        success: false,
        status: 401,
        duration: Date.now() - started,
        error: "OTP expired. Please request a new OTP."
      };
    }

    if (record.code !== otp) {
      return {
        success: false,
        status: 401,
        duration: Date.now() - started,
        error: "Invalid OTP."
      };
    }

    otpStore.delete(key);

    const customer =
      await this.findCustomerByEmail(
        context,
        email
      );

    return {
      success: true,
      status: 200,
      duration: Date.now() - started,
      loginType: "otp",
      data: {
        email,
        verified: true,
        customer:
          customer.data?.customers?.nodes?.[0] || null,
        customerAccessToken: null
      }
    };
  }

  async loginWithGoogle(context: RuntimeContext) {
    const started = Date.now();

    const googleIdToken =
      (context as any).googleIdToken;

    const googleClientId =
      (context as any).googleClientId;

    if (!googleIdToken) {
      return {
        success: false,
        status: 400,
        duration: Date.now() - started,
        error: "googleIdToken is required."
      };
    }

    const googleResponse =
      await axios.get(
        "https://oauth2.googleapis.com/tokeninfo",
        {
          params: {
            id_token: googleIdToken
          },
          timeout: 15000
        }
      );

    const googleUser =
      googleResponse.data;

    const email =
      googleUser.email;

    const emailVerified =
      googleUser.email_verified === true ||
      googleUser.email_verified === "true";

    if (!email || !emailVerified) {
      return {
        success: false,
        status: 401,
        duration: Date.now() - started,
        error: "Google email is not verified."
      };
    }

    if (
      googleClientId &&
      googleUser.aud !== googleClientId
    ) {
      return {
        success: false,
        status: 401,
        duration: Date.now() - started,
        error: "Google token audience mismatch."
      };
    }

    const customer =
      await this.findCustomerByEmail(
        context,
        email
      );

    return {
      success: true,
      status: 200,
      duration: Date.now() - started,
      loginType: "google",
      data: {
        email,
        googleUser: {
          sub: googleUser.sub,
          email: googleUser.email,
          name: googleUser.name,
          picture: googleUser.picture
        },
        customer:
          customer.data?.customers?.nodes?.[0] || null,
        customerAccessToken: null
      }
    };
  }

  async logout(context: RuntimeContext) {
    const started = Date.now();

    const customerAccessToken =
      (context as any).customerAccessToken;

    if (!customerAccessToken) {
      return {
        success: true,
        status: 200,
        duration: Date.now() - started,
        data: {
          loggedOut: true,
          message: "No customerAccessToken provided."
        }
      };
    }

    const result =
      await ShopifyService.execute({
        api: "storefront",
        context,
        query: CUSTOMER_TOKEN_DELETE_MUTATION,
        variables: {
          customerAccessToken
        }
      });

    return {
      ...result,
      duration: Date.now() - started
    };
  }

  async me(context: RuntimeContext) {
    const started = Date.now();

    const customerAccessToken =
      (context as any).customerAccessToken;

    if (!customerAccessToken) {
      return {
        success: false,
        status: 400,
        duration: Date.now() - started,
        error: "customerAccessToken is required."
      };
    }

    return ShopifyService.execute({
      api: "storefront",
      context,
      query: CUSTOMER_ME_QUERY,
      variables: {
        customerAccessToken
      }
    });
  }
}

export default new AuthService();