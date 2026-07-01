import apiClient from "../shared/client";
import { LoginRequest, RegisterRequest, AuthToken, User } from "./types";
import { ApiResponse } from "../shared/types";

export const login = async (data: LoginRequest): Promise<ApiResponse<AuthToken>> => {
  const response = await apiClient.post<ApiResponse<AuthToken>>("/identity/login", data);
  return response.data;
};

export const register = async (data: RegisterRequest): Promise<ApiResponse<User>> => {
  const response = await apiClient.post<ApiResponse<User>>("/identity/register", data);
  return response.data;
};