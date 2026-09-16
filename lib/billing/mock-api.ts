import { ApiResponse } from "../shared/types";
import { Subscription } from "./types";

export const getSubscription = async (userId: string): Promise<ApiResponse<Subscription>> => {
  return {
    error: false,
    message: "Success",
    result: {
      id: "demo-sub-1",
      userId,
      plan: "Free",
      endpointLimit: 3,
      monthlyPrice: 0,
      startedAt: new Date().toISOString(),
      expiresAt: null,
      isActive: true,
    },
  };
};