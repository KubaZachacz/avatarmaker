import React from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import ToggleButton from "@material-ui/lab/ToggleButton";
import { Trans } from "@lingui/macro";
import { toggleGenderFilter } from "../../../../store/slices/avatarSlice";
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
    minWidth: 40,
    height: 40,
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
    minWidth: 40,
    height: 40,
    "&:hover": {
      filter: "brightness(1.1)"
    }
  }
}));

const StyledToggleButton = ({
  children,
  value,
  selected,
  onChange,
  className
}) => {
  const classes = useStyles();

  return (
    <ToggleButton
      {...{ value, selected, onChange, className }}
      classes={{
        root: classes.ToogleButton,
        selected: classes.ToogleSelected
      }}
    >
      {children}
    </ToggleButton>
  );
};

StyledToggleButton.propTypes = {
  children: PropTypes.element,
  value: PropTypes.string,
  selected: PropTypes.bool,
  className: PropTypes.string,
  onChange: PropTypes.func
};

const GenderFilter = ({ maleFilter, femaleFilter }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const genderText = () => {
    if (!maleFilter && !femaleFilter) return <Trans>neutral</Trans>;
    else if (!maleFilter && femaleFilter) return <Trans>male</Trans>;
    else if (maleFilter && !femaleFilter) return <Trans>female</Trans>;
  };

  return (
    <div className={classes.GenderFilter}>
      <Typography className={classes.Text}>
        <Trans>Gender: </Trans> {genderText()}
      </Typography>
      <StyledToggleButton
        value="male"
        selected={maleFilter}
        onChange={() => dispatch(toggleGenderFilter("male"))}
      >
        <FontAwesomeIcon icon={faMars} size="lg" />
      </StyledToggleButton>
      <StyledToggleButton
        value="female"
        selected={femaleFilter}
        onChange={() => dispatch(toggleGenderFilter("female"))}
      >
        <FontAwesomeIcon icon={faVenus} size="lg" />
      </StyledToggleButton>
    </div>
  );
};

export default GenderFilter;
