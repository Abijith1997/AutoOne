import { useEffect, useState } from "react";
import { DropDown } from "./DropDown";
import { colorsApi } from "../api/colorsApi";
import { manufacturersApi } from "../api/manufacturersApi";

export interface FilterProps {
  manufacturer: string;
  setManufacturer: (value: string) => void;
  color: string;
  setColor: (value: string) => void;
  setSort: (value: string) => void;
}

export const Filters = ({
  manufacturer,
  setManufacturer,
  color,
  setColor,
  setSort,
}: FilterProps) => {
  const [colors, setColors] = useState<string[]>([]);
  const [manufacturers, setManufacturers] = useState<string[]>([]);
  const [sortDirection, setSortDirection] = useState<string>("");

  useEffect(() => {
    const fetchColors = async () => {
      try {
        const data = await colorsApi.getAll();
        setColors(data);
      } catch (error) {
        console.error("Failed to fetch colors:", error);
      }
    };

    fetchColors();
  }, []);

  useEffect(() => {
    const fetchManufacturers = async () => {
      try {
        const data = await manufacturersApi.getAll();
        setManufacturers(data);
      } catch (error) {
        console.error("Failed to fetch manufacturers:", error);
      }
    };
    fetchManufacturers();
  }, []);

  const capitalize = (text: string) =>
    text ? text.charAt(0).toUpperCase() + text.slice(1) : "";

  useEffect(() => {
    if (sortDirection === "Mileage - Ascending") {
      setSort("asc");
    } else if (sortDirection === "Mileage - Descending") {
      setSort("des");
    } else {
      setSort("");
    }
  }, [sortDirection, setSort]);

  return (
    <div className="border border-border-gray sm:p-4 flex sm:flex-col w-full sm:w-[300px] gap-4 flex-row px-1 py-2 sm:items-start items-center justify-center">
      <div className="sm:w-full">
        <h3 className="sm:text-sm text-[10px]">Color</h3>
        <DropDown setValue={setColor} values={colors ?? []}>
          {color ? capitalize(color) : "All car colors"}
        </DropDown>
      </div>

      <div className="sm:w-full">
        <h3 className="sm:text-sm text-[10px]">Manufacturer</h3>
        <DropDown setValue={setManufacturer} values={manufacturers}>
          {manufacturer ? capitalize(manufacturer) : "All manufacturers"}
        </DropDown>
      </div>
      <div className="sm:w-full flex-1">
        <h3 className="sm:text-sm text-[10px]">Sort by</h3>
        <DropDown
          setValue={setSortDirection}
          values={["None", "Mileage - Ascending", "Mileage - Descending"]}
        >
          {sortDirection ? capitalize(sortDirection) : "None"}
        </DropDown>
      </div>
    </div>
  );
};
