import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import { DarkModeIcon, LightModeIcon } from "../../assets/icons";

import {
  Toolbar,
  AppBar,
  Box,
  IconButton,
  Container,
  Tooltip
} from "@material-ui/core";

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
    color: "white",
    fontSize: "20px"
  }
}));

const TopMenu = ({ onToggleDarkMode, isDarkMode }) => {
  const classes = useStyles();

  const lightModeIcon = (
    <Tooltip title={isDarkMode ? "light mode" : "dark mode"}>
      <IconButton
        aria-label="light mode"
        onClick={() => onToggleDarkMode(isDarkMode)}
      >
        {isDarkMode ? (
          <LightModeIcon className={classes.icon} />
        ) : (
          <DarkModeIcon className={classes.icon} />
        )}
      </IconButton>
    </Tooltip>
  );

  return (
    <AppBar color="primary" className={classes.root}>
      <Container maxWidth="lg">
        <Toolbar className={classes.toolbar}>
          <Box className={classes.logoContainer}>
            <Typography variant="h6">Avatar Maker</Typography>
          </Box>
          <Box className={classes.menuButtons}>{lightModeIcon}</Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default TopMenu;
