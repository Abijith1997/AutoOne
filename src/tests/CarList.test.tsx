import { render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { vi } from "vitest";
import { CarList } from "../components/carList";
import { carsApi } from "../api/carsApi";

const mockCars = [
  {
    stockNumber: 1,
    manufacturerName: "Audi",
    modelName: "A4",
    color: "Black",
    mileage: { number: 50000, unit: "km" },
    fuelType: "Petrol",
    pictureUrl: "https://via.placeholder.com/150",
  },
  {
    stockNumber: 2,
    manufacturerName: "BMW",
    modelName: "X5",
    color: "White",
    mileage: { number: 60000, unit: "km" },
    fuelType: "Diesel",
    pictureUrl: "https://via.placeholder.com/150",
  },
];

vi.spyOn(carsApi, "getAll").mockResolvedValue({
  cars: mockCars,
  totalCarsCount: 2,
  totalPageCount: 1, // make sure matches CarsResponse type
});

test("renders list of cars after fetch", async () => {
  render(
    <BrowserRouter>
      <CarList sort="" color="" manufacturer="" />
    </BrowserRouter>
  );

  // Wait for async fetch to complete
  await waitFor(() => {
    expect(screen.getByText(/Audi A4/i)).toBeInTheDocument();
    expect(screen.getByText(/BMW X5/i)).toBeInTheDocument();
  });
});
