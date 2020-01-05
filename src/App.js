import React, { useState, useEffect, useCallback } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import { Paper, Toolbar } from "@material-ui/core";
import { I18nProvider } from "@lingui/react";
// import { Trans } from "@lingui/macro";
import { langCatalogs } from "./locales";

import { DEFAULT_SETUP, DEFAULT_THEME, PALETTE_TYPES } from "./consts";
import { useEditableTheme } from "./hooks";
import TopMenu from "./containers/TopMenu";
import AvatarEditor from "./containers/AvatarEditor";
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
  const { isDarkMode, lang } = appSetup;

  const onToggleDarkMode = useCallback(
    isDarkMode => {
      overrideThemePalette({
        type: isDarkMode ? PALETTE_TYPES.dark : PALETTE_TYPES.light
      });
      setAppSetup({
        ...appSetup,
        isDarkMode: isDarkMode
      });
    },
    [appSetup, overrideThemePalette]
  );

  const onChageLanguage = useCallback(
    lang => {
      setAppSetup({
        ...appSetup,
        lang: lang
      });
    },
    [appSetup]
  );

  return (
    <I18nProvider language={lang} catalogs={langCatalogs}>
      <ThemeProvider theme={theme}>
        <Paper className={classes.Paper} square={true}>
          <TopMenu
            {...{ onToggleDarkMode, onChageLanguage, isDarkMode, lang }}
          />
          <Toolbar />
          <AvatarEditor />
        </Paper>
      </ThemeProvider>
    </I18nProvider>
  );
}

export default App;
