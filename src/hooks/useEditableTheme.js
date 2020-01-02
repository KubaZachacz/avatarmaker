import React, { useState, useEffect } from "react";
import { createMuiTheme } from "@material-ui/core/styles";

const useEditableTheme = (initialTheme = {}) => {
  const [themeState, setThemeState] = useState(initialTheme);

  const overrideThemePalette = overrideValue => {
    const newState = {
      palette: {
        ...themeState.palette,
        ...overrideValue
      }
    };
    setThemeState(newState);
  };

  const theme = createMuiTheme(themeState);
  return { ...{ theme, overrideThemePalette } };
};

export default useEditableTheme;
