import { LoginRequest, RegisterRequest, AuthToken, User } from "./types";
import { ApiResponse } from "../shared/types";

const mockUser: AuthToken = {
  token: "demo-token",
  expiresAt: new Date(Date.now() + 1000 * 60 * 60).toISOString(),
  refreshToken: "demo-refresh-token",
  user: {
    id: "demo-user-1",
    email: "demo@pulse.io",
    displayName: "Demo User",
    tier: "Free",
  },
};

export const login = async (data: LoginRequest): Promise<ApiResponse<AuthToken>> => {
  return {
    error: false,
    message: "Success",
    result: mockUser,
  };
};

export const register = async (data: RegisterRequest): Promise<ApiResponse<User>> => {
  return {
    error: true,
    message: "Register is not available in demo mode. Contact me for a live walkthrough.",
    result: null as unknown as User,
  };
};