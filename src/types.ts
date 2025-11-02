export interface Mileage {
  number: number;
  unit: string;
}

export interface CarProps {
  stockNumber: number;
  manufacturerName: string;
  modelName: string;
  mileage: Mileage;
  fuelType: string;
  color: string;
  pictureUrl: string;
}

export interface CarsResponse {
  cars: CarProps[];
  totalPageCount: number;
  totalCarsCount: number;
}

export interface CarsQueryParams {
  manufacturer?: string;
  color?: string;
  sort?: string;
  page?: number;
}

export interface CarApiResponse {
  car: CarProps;
}

export interface DropDownProps {
  children: React.ReactNode;
  className?: string;
  setValue: (value: string) => void;
  values: string[];
}
