export type LoginType =
  | "password"
  | "otp"
  | "google";

export interface LoginRequest {
  store: string;
  storefrontToken: string;
  adminToken: string;
  apiVersion: string;

  loginType: LoginType;

  email?: string;
  customerEmail?: string;

  password?: string;
  otp?: string;

  googleIdToken?: string;
  googleClientId?: string;

  customerAccessToken?: string;
}