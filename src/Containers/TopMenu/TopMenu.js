import React, { useMemo } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLightbulb as offDarkModeIcon,
  faQuestionCircle as closeInfoIcon
} from "@fortawesome/free-solid-svg-icons";
import {
  faLightbulb as onDarkModeIcon,
  faQuestionCircle as openInfoIcon
} from "@fortawesome/free-regular-svg-icons";
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
import { Trans } from "@lingui/macro";
import Logo from "../../Components/Logo";

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
  },
  iconButton: {
    width: 44
  },
  logo: {
    fontSize: "1.2rem",
    [theme.breakpoints.up("sm")]: {
      fontSize: "1.5rem"
    }
  }
}));

export const InfoButton = ({ isInfo, onOpenInfo }) => {
  const classes = useStyles();

  return (
    <Tooltip title={<Trans>Project info</Trans>}>
      <IconButton
        aria-label="more info"
        onClick={onOpenInfo}
        variant="extended"
        className={classes.iconButton}
      >
        {isInfo ? (
          <FontAwesomeIcon icon={closeInfoIcon} className={classes.icon} />
        ) : (
          <FontAwesomeIcon icon={openInfoIcon} className={classes.icon} />
        )}
      </IconButton>
    </Tooltip>
  );
};

export const LightModeButton = ({ isDarkMode, onToggleDarkMode }) => {
  const classes = useStyles();

  return (
    <Tooltip
      title={isDarkMode ? <Trans>Light mode</Trans> : <Trans>Dark mode</Trans>}
    >
      <IconButton
        aria-label="light mode"
        onClick={() => onToggleDarkMode(!isDarkMode)}
        variant="extended"
        className={classes.iconButton}
      >
        {isDarkMode ? (
          <FontAwesomeIcon icon={offDarkModeIcon} className={classes.icon} />
        ) : (
          <FontAwesomeIcon icon={onDarkModeIcon} className={classes.icon} />
        )}
      </IconButton>
    </Tooltip>
  );
};

export const LanguageSelect = ({ lang, onChageLanguage }) => {
  const classes = useStyles();

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
      data-testid="lang-select"
    >
      {langsOptionsArray}
    </Select>
  );
};

const TopMenu = ({
  onToggleDarkMode,
  isDarkMode,
  lang,
  onChageLanguage,
  isInfo,
  onOpenInfo
}) => {
  const classes = useStyles();

  return (
    <AppBar color="primary" className={classes.root}>
      <Container maxWidth="lg">
        <Toolbar className={classes.toolbar}>
          <Box className={classes.logoContainer}>
            <Typography variant="h6" className={classes.logo}>
              <Logo />
            </Typography>
          </Box>
          <Box className={classes.menuButtons}>
            <LanguageSelect {...{ lang, onChageLanguage }} />
            <LightModeButton {...{ onToggleDarkMode, isDarkMode }} />
            <InfoButton {...{ onOpenInfo, isInfo }} />
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

TopMenu.propTypes = {
  onToggleDarkMode: PropTypes.func.isRequired,
  isDarkMode: PropTypes.bool.isRequired,
  lang: PropTypes.string.isRequired,
  onChageLanguage: PropTypes.func.isRequired,
  isInfo: PropTypes.bool.isRequired,
  onOpenInfo: PropTypes.func.isRequired
};

export default TopMenu;
