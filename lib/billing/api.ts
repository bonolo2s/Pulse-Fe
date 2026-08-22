import apiClient from "../shared/client"
import { isAxiosError } from "axios"
import { InitializeTransactionResult, Subscription, Invoice, PaymentMethod } from "./types"
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
  try {
    const response = await apiClient.get<ApiResponse<Invoice[]>>(`/billing/get-invoices/${userId}`)
    return response.data
  } catch (err) {
    if (isAxiosError(err) && err.response?.data) {
      return err.response.data as ApiResponse<Invoice[]>
    }
    throw err
  }
}

export const cancelSubscription = async (userId: string): Promise<ApiResponse<void>> => {
  try {
    const response = await apiClient.put<ApiResponse<void>>(`/billing/cancel-subscription/${userId}`)
    return response.data
  } catch (err) {
    if (isAxiosError(err) && err.response?.data) {
      return err.response.data as ApiResponse<void>
    }
    throw err
  }
}

export const getPaymentMethods = async (userId: string): Promise<ApiResponse<PaymentMethod[]>> => {
  try {
    const response = await apiClient.get<ApiResponse<PaymentMethod[]>>(`/billing/get-payment-methods/${userId}`)
    return response.data
  } catch (err) {
    if (isAxiosError(err) && err.response?.data) {
      return err.response.data as ApiResponse<PaymentMethod[]>
    }
    throw err
  }
}

export const deletePaymentMethod = async (id: string): Promise<ApiResponse<void>> => {
  try {
    const response = await apiClient.delete<ApiResponse<void>>(`/billing/payment-methods/${id}`)
    return response.data
  } catch (err) {
    if (isAxiosError(err) && err.response?.data) {
      return err.response.data as ApiResponse<void>
    }
    throw err
  }
}

export const setDefaultPaymentMethod = async (id: string): Promise<ApiResponse<void>> => {
  try {
    const response = await apiClient.put<ApiResponse<void>>(`/billing/payment-methods/${id}/set-default`)
    return response.data
  } catch (err) {
    if (isAxiosError(err) && err.response?.data) {
      return err.response.data as ApiResponse<void>
    }
    throw err
  }
}