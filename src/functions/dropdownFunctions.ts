import type { Dispatch, SetStateAction } from "react";

export interface UpdateSizeProps {
  setIconSize: Dispatch<SetStateAction<number>>;
}

export const updateSize = ({ setIconSize }: UpdateSizeProps) => {
  if (window.innerWidth < 640) {
    setIconSize(5); // smaller for mobile
  } else if (window.innerWidth < 1024) {
    setIconSize(12); // tablets
  } else {
    setIconSize(15); // desktop
  }
};
