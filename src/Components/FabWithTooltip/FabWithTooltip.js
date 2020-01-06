import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import { Fab, Tooltip } from "@material-ui/core";
import clsx from "clsx";

const useStyles = makeStyles(theme => ({
  root: {
    width: "34px !important",
    margin: "4px"
  }
}));

const FabWithTooltip = ({
  children,
  title,
  size,
  color,
  className,
  onClick
}) => {
  const classes = useStyles();

  return (
    <Tooltip title={title}>
      <Fab
        variant="extended"
        className={clsx(classes.root, className)}
        {...{ size, color, onClick }}
      >
        {children}
      </Fab>
    </Tooltip>
  );
};

FabWithTooltip.propTypes = {
  children: PropTypes.element,
  title: PropTypes.object,
  color: PropTypes.string,
  className: PropTypes.string,
  onClick: PropTypes.func
};

FabWithTooltip.defaultProps = {
  color: "primary",
  size: "small"
};

export default FabWithTooltip;
