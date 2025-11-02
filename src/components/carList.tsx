import { useEffect, useState } from "react";
import { carsApi } from "../api/carsApi";
import type { CarsQueryParams, CarsResponse } from "../types";
import { CarDetails } from "./CarDetails";
import { Pagination } from "./Pagination";
import { CarDetailsSkeleton } from "./CarDetailsSkeleton";

export interface CarListProps {
  sort: string;
  color: string;
  manufacturer: string;
}

export const CarList = ({ sort, color, manufacturer }: CarListProps) => {
  const [cars, setCars] = useState<CarsResponse["cars"]>([]);
  const [total, setTotal] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1);

  const ITEMS_PER_PAGE = 10;
  const totalPages = Math.ceil(total / ITEMS_PER_PAGE);

  useEffect(() => {
    const fetchCars = async (pageNum: number) => {
      setLoading(true);
      try {
        const queryParams: CarsQueryParams = {
          page: pageNum,
          sort: sort,
          manufacturer: manufacturer,
          color: color,
        };
        const data = await carsApi.getAll(queryParams);
        setCars(data.cars);
        setTotal(data.totalCarsCount);
      } catch (error) {
        console.error("Failed to fetch cars:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCars(page);
  }, [page, sort, color, manufacturer]);

  return (
    <div className="sm:p-4 p-2 flex-1">
      <h2 className="text-md sm:text-2xl font-bold mb-2">Available Cars</h2>
      <h3 className="sm:text-lg text-gray-600 mb-4 text-xs">
        Showing {cars.length} of {total} cars
      </h3>
      <div className="flex flex-col gap-4">
        {loading
          ? Array.from({ length: 5 }).map((_, i) => (
              <CarDetailsSkeleton key={i} />
            ))
          : cars.map((car) => <CarDetails car={car} key={car.stockNumber} />)}
      </div>
      <Pagination totalPages={totalPages} setPage={setPage} page={page} />
    </div>
  );
};
