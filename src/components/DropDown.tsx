import { IconTriangleInvertedFilled } from "@tabler/icons-react";
import { useEffect, useRef, useState } from "react";
import type { DropDownProps } from "../types";
import { updateSize } from "../functions/dropdownFunctions";

export const DropDown = ({
  children,
  className,
  setValue,
  values,
}: DropDownProps) => {
  const [opened, setOpened] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const [iconSize, setIconSize] = useState<number>(15);

  const handleSelect = (value: string) => {
    setValue(value);
    setOpened(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpened(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (opened && menuRef.current) {
      const rect = menuRef.current.getBoundingClientRect();
      const overflowRight = rect.right > window.innerWidth;
      const overflowLeft = rect.left < 0;

      if (overflowRight) {
        menuRef.current.style.left = "auto";
        menuRef.current.style.right = "0";
      } else if (overflowLeft) {
        menuRef.current.style.left = "0";
        menuRef.current.style.right = "auto";
      } else {
        menuRef.current.style.left = "0";
        menuRef.current.style.right = "auto";
      }
    }
  }, [opened]);

  useEffect(() => {
    const handleResize = () => updateSize({ setIconSize });

    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return (
    <div className="relative sm:text-sm text-[10px]" ref={dropdownRef}>
      <div
        className={`border border-border-gray py-1 sm:px-2 rounded-sm ${className} flex justify-between items-center px-1`}
        onClick={() => setOpened((prev) => !prev)}
      >
        {children}
        <IconTriangleInvertedFilled color="#ededed" size={iconSize} />
      </div>

      {opened && (
        <div
          className="absolute mt-1 border border-border-gray rounded-sm bg-white shadow-lg z-10 min-w-[150px] max-w-[calc(100vw-1rem)] dropdown"
          style={{ width: "max-content", minWidth: "100%" }}
          ref={menuRef}
        >
          {values.map((value) => (
            <div
              key={value}
              onMouseDown={(e) => {
                e.stopPropagation();
                handleSelect(value);
              }}
              className="px-4 py-1 hover:bg-primary hover:text-white border-b border-border-gray text-black cursor-pointer whitespace-nowrap"
            >
              {value.charAt(0).toUpperCase() + value.slice(1)}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
