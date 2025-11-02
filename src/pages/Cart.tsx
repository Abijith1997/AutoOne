import { IconTrash } from "@tabler/icons-react";
import type { CarProps } from "../types";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../store";
import { removeFromCart } from "../slice/cartSlice";
import { CarDetails } from "../components/CarDetails";

export const Cart = () => {
  const cart = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();

  const handleRemove = (car: CarProps) => {
    dispatch(removeFromCart(car.stockNumber));
  };

  if (cart.length === 0)
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] text-center px-4">
        <h2 className="text-3xl font-bold mb-4">Your cart is empty</h2>
        <p className="text-gray-600">
          You haven’t saved any cars yet. Browse and add your favourite cars to
          see them here.
        </p>
      </div>
    );

  return (
    <div className="sm:p-4 p-2 flex-1">
      <h2 className="text-2xl font-bold mb-4">
        My Cart ({cart.length} {cart.length === 1 ? "car" : "cars"})
      </h2>

      <div className="flex flex-col gap-3 sm:gap-6">
        {cart.map((car) => (
          <div
            key={car.stockNumber}
            className="flex flex-col md:flex-row items-start md:items-center p-2 sm:p-4 gap-2 sm:gap-4 w-full"
          >
            {/* Car Details takes full width */}
            <div className="w-full md:flex-1">
              <CarDetails car={car} />
            </div>

            {/* Remove Button */}
            <button
              onClick={() => handleRemove(car)}
              className="mt-2 md:mt-0 px-3 py-2 bg-red-800 text-white rounded flex items-center gap-2 hover:bg-red-900 transition"
            >
              <IconTrash />
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
