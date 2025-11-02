import axiosClient from "./axiosClient";

interface Manufacturer {
  name: string;
  models: { name: string }[];
}

interface ManufacturersApiResponse {
  manufacturers: Manufacturer[];
}

export const manufacturersApi = {
  getAll: async (): Promise<string[]> => {
    const response = await axiosClient.get<ManufacturersApiResponse>(
      "/manufacturers"
    );
    const manufacturerNames = response.data.manufacturers.map((m) => m.name);
    return manufacturerNames;
  },
};
