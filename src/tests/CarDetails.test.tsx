import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { MemoryRouter } from "react-router-dom";
import { CarDetails } from "../components/CarDetails";

const car = {
  stockNumber: 12345,
  manufacturerName: "Audi",
  modelName: "A4",
  color: "Red",
  mileage: { number: 20000, unit: "km" },
  fuelType: "Petrol",
  pictureUrl: "https://auto1-mock-server.vercel.app/images/car.svg",
};

describe("CarDetails Component", () => {
  it("renders car information correctly", () => {
    render(
      <MemoryRouter>
        <CarDetails car={car} />
      </MemoryRouter>
    );

    expect(screen.getByText(/Audi A4/i)).toBeInTheDocument();
    expect(
      screen.getByText(/Stock # 12345 - 20,000 KM - Petrol - Red/i)
    ).toBeInTheDocument();

    const img = screen.getByRole("img") as HTMLImageElement;
    expect(img.src).toContain(car.pictureUrl);

    const link = screen.getByRole("link");
    expect(link.getAttribute("href")).toBe(`/${car.stockNumber}`);
  });
});
