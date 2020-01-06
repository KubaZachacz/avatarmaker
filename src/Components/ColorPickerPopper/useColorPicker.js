import React, { useState } from "react";

export const useColorPicker = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [openedPart, setOpenedPart] = useState(false);

  const openColorPicker = (e, part) => {
    setAnchorEl(e.currentTarget);
    setOpenedPart(part);
  };

  return { ...{ anchorEl, openedPart, setOpenedPart, openColorPicker } };
};
