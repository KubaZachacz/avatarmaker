import React, { useState, useEffect, useCallback } from "react";
import { createMuiTheme, makeStyles } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import { Paper, Toolbar } from "@material-ui/core";
import { DEFAULT_SETUP, DEFAULT_THEME, PALETTE_TYPES } from "./consts";
import { useEditableTheme } from "./hooks";
import TopMenu from "./Components/TopMenu";
import "./App.css";

const useStyles = makeStyles(theme => ({
  Paper: {
    minHeight: "100vh",
    overflow: "hidden"
  }
}));

function App() {
  const classes = useStyles();

  const [appSetup, setAppSetup] = useState(DEFAULT_SETUP);
  const { theme, overrideThemePalette } = useEditableTheme(DEFAULT_THEME);
  const { isDarkMode } = appSetup;

  const onToggleDarkMode = useCallback(
    isDarkMode => {
      const toggledDarkMode = !isDarkMode;
      overrideThemePalette({
        type: toggledDarkMode ? PALETTE_TYPES.dark : PALETTE_TYPES.light
      });
      setAppSetup({
        ...appSetup,
        isDarkMode: toggledDarkMode
      });
    },
    [appSetup, overrideThemePalette]
  );

  return (
    <ThemeProvider theme={theme}>
      <Paper className={classes.Paper} square={true}>
        <TopMenu {...{ onToggleDarkMode, isDarkMode }} />
        <Toolbar />
        Content goes here
      </Paper>
    </ThemeProvider>
  );
}

export default App;
