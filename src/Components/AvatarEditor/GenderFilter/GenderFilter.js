import React from "react";
import { useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import ToggleButton from "@material-ui/lab/ToggleButton";
import { Trans } from "@lingui/macro";
import { toggleGenderFilter } from "../../../store/slices/avatarSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVenus, faMars } from "@fortawesome/free-solid-svg-icons";

const useStyles = makeStyles(theme => ({
  Text: {
    width: 200
  },
  GenderFilter: {
    display: "flex",
    alignItems: "center",
    margin: "8px 0"
  },
  ToogleButton: {
    color: theme.palette.primary.contrastText,
    backgroundColor: theme.palette.primary.main,
    border: "none",
    minWidth: 48,
    height: 48,
    marginLeft: "8px !important",
    transition: "all 250ms",
    boxShadow:
      "0px 3px 1px -2px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 1px 5px 0px rgba(0,0,0,0.12)",
    "&:hover": {
      backgroundColor: theme.palette.primary.light,
      boxShadow:
        "0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)"
    }
  },
  ToogleSelected: {
    color: `${theme.palette.primary.contrastText} !important`,
    backgroundColor: `${theme.palette.primary.dark} !important`,
    filter: "brightness(0.75)",
    minWidth: 48,
    height: 48,
    "&:hover": {
      filter: "brightness(1.1)"
    }
  }
}));

const GenderFilter = ({ maleFilter, femaleFilter }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const genderText = () => {
    if (!maleFilter && !femaleFilter) return "any";
    else if (!maleFilter && femaleFilter) return "male";
    else if (maleFilter && !femaleFilter) return "female";
  };

  return (
    <div className={classes.GenderFilter}>
      <Typography className={classes.Text}>
        <Trans>Gender filter: </Trans> {genderText()}
      </Typography>
      <ToggleButton
        value="male"
        selected={maleFilter}
        onChange={() => dispatch(toggleGenderFilter("male"))}
        classes={{
          root: classes.ToogleButton,
          selected: classes.ToogleSelected
        }}
      >
        <FontAwesomeIcon icon={faMars} size="lg" />
      </ToggleButton>
      <ToggleButton
        value="female"
        selected={femaleFilter}
        onChange={() => dispatch(toggleGenderFilter("female"))}
        classes={{
          root: classes.ToogleButton,
          selected: classes.ToogleSelected
        }}
      >
        <FontAwesomeIcon icon={faVenus} size="lg" />
      </ToggleButton>
    </div>
  );
};

export default GenderFilter;
