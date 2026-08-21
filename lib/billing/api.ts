import apiClient from "../shared/client"
import { isAxiosError } from "axios"
import { InitializeTransactionResult, Subscription, Invoice } from "./types"
import { ApiResponse } from "../shared/types"

export const initiateCheckout = async (): Promise<ApiResponse<InitializeTransactionResult>> => {
  try {
    const response = await apiClient.post<ApiResponse<InitializeTransactionResult>>(`/billing/checkout`)
    return response.data
  } catch (err) {
    if (isAxiosError(err) && err.response?.data) {
      return err.response.data as ApiResponse<InitializeTransactionResult>
    }
    throw err
  }
}

export const getSubscription = async (userId: string): Promise<ApiResponse<Subscription>> => {
  try {
    const response = await apiClient.get<ApiResponse<Subscription>>(`/billing/get-subscription/${userId}`)
    return response.data
  } catch (err) {
    if (isAxiosError(err) && err.response?.data) {
      return err.response.data as ApiResponse<Subscription>
    }
    throw err
  }
}

export const getBillingHistory = async (userId: string): Promise<ApiResponse<Invoice[]>> => {
  const response = await apiClient.get<ApiResponse<Invoice[]>>(`/billing/get-invoices/${userId}`)
  return response.data
}