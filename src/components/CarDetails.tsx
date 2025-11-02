import { Link } from "react-router-dom";
import type { CarProps } from "../types";

export interface CarDetailsProps {
  car: CarProps;
}

export const CarDetails = ({ car }: CarDetailsProps) => {
  return (
    <div
      key={car.stockNumber}
      className="border p-2 sm:p-3 border-border-gray shadow  flex gap-5 items-center text-xs sm:text-md"
    >
      <img
        src={car.pictureUrl}
        alt={`${car.manufacturerName} ${car.modelName}`}
        className="sm:w-30 sm:h-20 h-15 w-25  object-cover mb-2 rounded"
      />
      <div className="details flex flex-col gap-1">
        <h4 className="font-bold sm:text-xl text-text-dark">
          {car.manufacturerName} {car.modelName}
        </h4>
        <div className="extra-details">
          <span className="stock">
            Stock # {car.stockNumber} - {car.mileage.number.toLocaleString()}{" "}
            {car.mileage.unit.toUpperCase()} - {car.fuelType} - {car.color}
          </span>
        </div>

        <Link to={`/${car.stockNumber}`} className="text-primary">
          View details
        </Link>
      </div>
    </div>
  );
};
