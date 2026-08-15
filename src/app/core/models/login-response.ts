import { UserInfo } from "./user-info";

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  expiresAt: number;
  user: UserInfo;
}