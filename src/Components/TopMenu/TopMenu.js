import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import { DarkModeIcon, LightModeIcon } from "../../assets/icons";
import { langCatalogs } from "../../locales";
import { LANG_FLAG_CODES } from "../../consts";
import { FlagIcon } from "react-flag-kit";

import {
  Toolbar,
  AppBar,
  Box,
  IconButton,
  Container,
  Tooltip,
  Select,
  MenuItem
} from "@material-ui/core";
import { Trans } from "@lingui/react";

const languagesList = Object.keys(langCatalogs);

const useStyles = makeStyles(theme => ({
  root: {
    position: "fixed",
    top: 0,
    left: 0
  },
  toolbar: {
    display: "flex",
    alignItems: "center"
  },
  logoContainer: {
    flex: 1
  },
  menuButtons: {
    display: "flex",
    alignItems: "center",
    justifySelf: "flex-end"
  },
  icon: {
    color: theme.palette.primary.contrastText,
    fontSize: "20px"
  },
  customSelect: {
    fill: "white"
  },
  flag: {
    verticalAlign: "middle"
  }
}));

const TopMenu = ({ onToggleDarkMode, isDarkMode, lang, onChageLanguage }) => {
  const classes = useStyles();

  const lightModeIcon = (
    <Tooltip title={isDarkMode ? "light mode" : "dark mode"}>
      <IconButton
        aria-label="light mode"
        onClick={() => onToggleDarkMode(!isDarkMode)}
      >
        {isDarkMode ? (
          <LightModeIcon className={classes.icon} />
        ) : (
          <DarkModeIcon className={classes.icon} />
        )}
      </IconButton>
    </Tooltip>
  );

  const LanguageSelect = () => {
    const langsOptionsArray = languagesList.map(lang => (
      <MenuItem key={`lang-option-${lang}`} value={lang}>
        <FlagIcon code={LANG_FLAG_CODES[lang]} className={classes.flag} />
      </MenuItem>
    ));

    return (
      <Select
        value={lang}
        onChange={event => onChageLanguage(event.target.value)}
        size="small"
        disableUnderline={true}
        classes={{ icon: classes.customSelect }}
      >
        {langsOptionsArray}
      </Select>
    );
  };

  return (
    <AppBar color="primary" className={classes.root}>
      <Container maxWidth="lg">
        <Toolbar className={classes.toolbar}>
          <Box className={classes.logoContainer}>
            <Typography variant="h6">Avatar Maker</Typography>
          </Box>
          <Box className={classes.menuButtons}>
            <LanguageSelect />
            {lightModeIcon}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default TopMenu;
