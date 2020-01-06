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

const StyledFab = ({ children, color, className, onClick }) => {
  const classes = useStyles();

  return (
    <Fab
      size="small"
      variant="extended"
      className={clsx(classes.root, className)}
      {...{ color, onClick }}
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
  color: "primary"
};

export default StyledFab;
