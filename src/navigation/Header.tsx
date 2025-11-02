import { IconBasket } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import type { RootState } from "../store";

export const Header = () => {
  const [iconSize, setIconSize] = useState<number>(13);
  const cart = useSelector((state: RootState) => state.cart.items);

  useEffect(() => {
    const updateSize = () => {
      if (window.innerWidth < 640) {
        setIconSize(13); // mobile
      } else if (window.innerWidth < 1024) {
        setIconSize(16); // tablet
      } else {
        setIconSize(20); // desktop
      }
    };

    updateSize(); // initial size
    window.addEventListener("resize", updateSize);

    return () => window.removeEventListener("resize", updateSize);
  }, []);
  return (
    <div className="w-full border-b border-border-gray p-24 flex items-center justify-between">
      <div className="logo">
        <Link to="/">
          <img
            src="https://auto1-homepage.prod.mp.auto1.cloud/2.36.0-53/images/logo.svg"
            alt="auto-one-logo"
            className="sm:w-40 w-20 cursor-pointer"
          />
        </Link>
      </div>
      <div className="links flex gap-2 sm:gap-6 text-text-dark [&>a]:hover:text-primary sm:text-lg text-xs items-center justify-between">
        <Link to="/404" id="purchase">
          Purchase
        </Link>
        <Link to="/404" id="myOrders">
          My Orders
        </Link>
        <Link to="/404" id="sell">
          Sell
        </Link>
        <Link to="/cart" id="cart" className="relative">
          <IconBasket size={iconSize} />
          {cart.length > 0 && (
            <div className="absolute -top-2 -right-2 w-5 h-5 rounded-full text-border-gray bg-text-dark text-xs flex items-center justify-center">
              {cart.length}
            </div>
          )}
        </Link>
      </div>
    </div>
  );
};
