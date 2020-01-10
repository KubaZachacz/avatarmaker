import React, { useCallback, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setLanguage, toggleDarkMode } from "./store/slices/settingsSlice";
import { makeStyles } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import { Paper, Toolbar, Button } from "@material-ui/core";
import { I18nProvider } from "@lingui/react";
import { langCatalogs } from "./locales";
import { DEFAULT_THEME, PALETTE_TYPES } from "./consts";
import { useEditableTheme } from "./hooks";
import TopMenu from "./Containers/TopMenu";
import AvatarEditor from "./Containers/AvatarEditor";
import CookieBanner from "./Containers/CookieBanner";
import InfoModal from "./Containers/InfoModal";
import "./App.css";

const useStyles = makeStyles(theme => ({
  Paper: {
    minHeight: "100vh",
    overflow: "hidden"
  }
}));

function App() {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [isInfoModal, setIsInfoModal] = useState(false);

  const { isDarkMode, lang } = useSelector(state => state.settings);
  const initialTheme = {
    ...DEFAULT_THEME,
    palette: {
      ...DEFAULT_THEME.palette,
      type: isDarkMode ? PALETTE_TYPES.dark : PALETTE_TYPES.light
    }
  };
  const { theme, overrideThemePalette } = useEditableTheme(initialTheme);

  const onToggleDarkMode = useCallback(
    isDarkMode => {
      overrideThemePalette({
        type: isDarkMode ? PALETTE_TYPES.dark : PALETTE_TYPES.light
      });
      dispatch(toggleDarkMode());
    },
    [dispatch, overrideThemePalette]
  );

  const onChageLanguage = useCallback(
    lang => {
      dispatch(setLanguage(lang));
    },
    [dispatch]
  );

  return (
    <I18nProvider language={lang} catalogs={langCatalogs}>
      <ThemeProvider theme={theme}>
        <Paper className={classes.Paper} square={true}>
          <TopMenu
            {...{
              onToggleDarkMode,
              onChageLanguage,
              isDarkMode,
              lang,
              isInfo: isInfoModal
            }}
            onOpenInfo={() => setIsInfoModal(true)}
          />
          <Toolbar />
          <AvatarEditor />
        </Paper>
        <InfoModal
          isOpen={isInfoModal}
          handleClose={() => setIsInfoModal(false)}
        />
        <CookieBanner />
      </ThemeProvider>
    </I18nProvider>
  );
}

export default App;
