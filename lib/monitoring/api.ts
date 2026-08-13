import apiClient from "../shared/client"
import { isAxiosError } from "axios"
import { Endpoint, AddEndpointRequest, UpdateEndpointRequest } from "./types"
import { ApiResponse } from "../shared/types"

export const getEndpoints = async (userId: string): Promise<ApiResponse<Endpoint[]>> => {
  const response = await apiClient.get<ApiResponse<Endpoint[]>>(`/monitoring/get-endpoints/${userId}`)
  return response.data
}

export const addEndpoint = async (payload: AddEndpointRequest): Promise<ApiResponse<Endpoint>> => {
  try {
    const response = await apiClient.post<ApiResponse<Endpoint>>(`/monitoring/add-endpoint`, payload)
    return response.data
  } catch (err) {
    if (isAxiosError(err) && err.response?.data) {
      return err.response.data as ApiResponse<Endpoint>
    }
    throw err
  }
}

export const toggleEndpoint = async (id: string): Promise<ApiResponse<null>> => {
  const response = await apiClient.patch<ApiResponse<null>>(`/monitoring/toggle-monitor/${id}`)
  return response.data
}

export const deleteEndpoint = async (id: string): Promise<ApiResponse<null>> => {
  const response = await apiClient.delete<ApiResponse<null>>(`/monitoring/remove-endpoint/${id}`)
  return response.data
}

export const updateEndpoint = async (id: string, payload: UpdateEndpointRequest): Promise<ApiResponse<Endpoint>> => {
  const response = await apiClient.put<ApiResponse<Endpoint>>(`/monitoring/edit-endpoint/${id}`, payload)
  return response.data
}