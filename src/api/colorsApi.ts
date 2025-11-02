import axiosClient from "./axiosClient";

interface ColorsApiResponse {
  colors: string[];
}

export const colorsApi = {
  getAll: async (): Promise<string[]> => {
    const response = await axiosClient.get<ColorsApiResponse>("/colors");
    return response.data.colors;
  },
};
