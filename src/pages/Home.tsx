import { useState } from "react";
import { CarList } from "../components/carList";
import { Filters } from "../components/filters";

export const Home = () => {
  const [color, setColor] = useState<string>("");
  const [manufacturer, setManufacturer] = useState<string>("");
  const [sort, setSort] = useState<string>("");
  return (
    <div className="w-full flex items-center sm:items-start sm:gap-6 sm:justify-between sm:flex-row flex-col">
      <Filters
        color={color}
        manufacturer={manufacturer}
        setManufacturer={setManufacturer}
        setColor={setColor}
        setSort={setSort}
      />
      <CarList color={color} sort={sort} manufacturer={manufacturer} />
    </div>
  );
};
