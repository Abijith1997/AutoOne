import { useEffect, useState } from "react";
import type { CarProps } from "../types";
import { useNavigate, useParams } from "react-router-dom";
import { carsApi } from "../api/carsApi";
import { CarSkeleton } from "../components/CarSkeleton";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../slice/cartSlice";
import type { RootState } from "../store";

export const Car = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams<{ id: string }>();
  const [car, setCar] = useState<CarProps | null>(null);
  const cart = useSelector((state: RootState) => state.cart.items);
  const [loading, setLoading] = useState<boolean>(true);
  const [isInCart, setIsInCart] = useState(false);

  useEffect(() => {
    const fetchCar = async () => {
      if (!id) return;
      setLoading(true);
      try {
        const data = await carsApi.getById(id);
        setCar(data);
      } catch (error) {
        console.error("Failed to fetch car details:", error);
        navigate("/404", { replace: true });
      } finally {
        setLoading(false);
      }
    };

    fetchCar();
  }, [id, navigate]);

  useEffect(() => {
    if (!car) return;
    setIsInCart(cart.some((item) => item.stockNumber === car.stockNumber));
  }, [car, cart]);

  const handleSave = () => {
    if (!car) return;
    dispatch(addToCart(car));
  };

  if (loading) return <CarSkeleton />;

  if (!car) return <p>Car not found.</p>;

  return (
    <div className="flex flex-col w-full justify-start items-center px-4 md:px-8">
      <div className="w-full">
        <img
          src={car.pictureUrl}
          alt={`${car.manufacturerName} ${car.modelName}`}
          className="mb-4 w-full h-[40vh] md:h-[50vh] object-cover rounded"
        />
      </div>

      {/* Info */}
      <div className="w-full max-w-[1500px] flex flex-col lg:flex-row gap-6">
        <div className="flex flex-col gap-4 lg:basis-3/5">
          <h1 className="font-bold text-2xl md:text-3xl text-text-dark">
            {car.manufacturerName} {car.modelName}
          </h1>

          <span className="stock text-lg">
            Stock # {car.stockNumber} - {car.mileage.number.toLocaleString()}{" "}
            {car.mileage.unit.toUpperCase()} - {car.fuelType} - {car.color}
          </span>

          <div className="description text-gray-700">
            This car is currently available and can be delivered as soon as
            tomorrow morning. Please be aware that delivery times shown on this
            page are not definitive and may change due to bad weather
            conditions.
          </div>
        </div>

        <div className="flex flex-col lg:basis-2/5 border border-border-gray p-4 rounded bg-white">
          <span className="save text-gray-800 mb-2">
            {isInCart
              ? "This car is already in your collection. Click below to remove it."
              : "If you like this car, click the button and save it in your collection of favourite items."}
          </span>
          <button
            className={`mt-auto px-4 py-2 rounded transition ${
              isInCart
                ? "bg-red-800 hover:bg-red-900 text-white"
                : "bg-primary text-white hover:bg-primary-dark"
            }`}
            onClick={handleSave}
          >
            {isInCart ? "Remove" : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
};
