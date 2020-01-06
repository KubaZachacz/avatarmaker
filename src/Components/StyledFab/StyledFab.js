import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import { Fab } from "@material-ui/core";
import clsx from "clsx";

const useStyles = makeStyles(theme => ({
  root: {
    width: "34px !important",
    margin: "4px"
  }
}));

const StyledFab = ({ children, size, color, className, onClick }) => {
  const classes = useStyles();

  return (
    <Fab
      variant="extended"
      className={clsx(classes.root, className)}
      {...{ size, color, onClick }}
    >
      {children}
    </Fab>
  );
};

StyledFab.propTypes = {
  children: PropTypes.element,
  color: PropTypes.string,
  className: PropTypes.string,
  onClick: PropTypes.func
};

StyledFab.defaultProps = {
  color: "primary",
  size: "small"
};

export default StyledFab;
