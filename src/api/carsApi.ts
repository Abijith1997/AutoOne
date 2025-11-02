import type {
  CarApiResponse,
  CarProps,
  CarsQueryParams,
  CarsResponse,
} from "../types";
import axiosClient from "./axiosClient";

export const carsApi = {
  getAll: async (params?: CarsQueryParams): Promise<CarsResponse> => {
    const response = await axiosClient.get<CarsResponse>("/cars", { params });
    return response.data;
  },

  getById: async (id: string): Promise<CarProps> => {
    const response = await axiosClient.get<CarApiResponse>(`/cars/${id}`);
    return response.data.car;
  },
};
