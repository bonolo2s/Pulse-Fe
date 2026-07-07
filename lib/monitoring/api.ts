import apiClient from "../shared/client"
import { Endpoint } from "./types"
import { ApiResponse } from "../shared/types"

export const getEndpoints = async (userId: string): Promise<ApiResponse<Endpoint[]>> => {
  const response = await apiClient.get<ApiResponse<Endpoint[]>>(`/monitoring/get-endpoints/${userId}`)
  return response.data
}