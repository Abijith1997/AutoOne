import {
  createSlice,
  createAsyncThunk,
  type PayloadAction,
} from "@reduxjs/toolkit";
import { carsApi } from "../api/carsApi";
import type { CarProps, CarsQueryParams, CarsResponse } from "../types";

// Async thunk to fetch cars
export const fetchCars = createAsyncThunk(
  "cars/fetchCars",
  async (params?: CarsQueryParams) => {
    const response = await carsApi.getAll(params);
    return response; // CarsResponse
  }
);

interface CarsState {
  cars: CarProps[];
  totalPageCount: number;
  totalCarsCount: number;
  loading: boolean;
  error: string | null;
  filters: CarsQueryParams;
}

const initialState: CarsState = {
  cars: [],
  totalPageCount: 0,
  totalCarsCount: 0,
  loading: false,
  error: null,
  filters: {
    manufacturer: "",
    color: "",
    sort: "asc",
    page: 1,
  },
};

export const carsSlice = createSlice({
  name: "cars",
  initialState,
  reducers: {
    setFilters(state, action: PayloadAction<CarsQueryParams>) {
      state.filters = { ...state.filters, ...action.payload };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCars.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchCars.fulfilled,
        (state, action: PayloadAction<CarsResponse>) => {
          state.loading = false;
          state.cars = action.payload.cars;
          state.totalPageCount = action.payload.totalPageCount;
          state.totalCarsCount = action.payload.totalCarsCount;
        }
      )
      .addCase(fetchCars.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch cars";
      });
  },
});

export const { setFilters } = carsSlice.actions;
export default carsSlice.reducer;
