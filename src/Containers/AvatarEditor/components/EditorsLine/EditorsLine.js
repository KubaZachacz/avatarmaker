import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Fab } from "@material-ui/core";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
import ColorLens from "@material-ui/icons/ColorLens";
import clsx from "clsx";
import { Trans } from "@lingui/macro";

const useStyles = makeStyles(theme => ({
  editorsLine: {
    margin: "0 auto",
    display: "flex",
    alignItems: "center"
  },
  text: {
    width: 200,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between"
  },
  fab: {
    width: "34px !important",
    margin: "4px"
  },
  name: {
    fontWeight: 500
  },
  numbers: {
    marginRight: theme.spacing(6),
    fontStyle: "italic"
  }
}));

const StyledFab = ({ children, color, className, onClick }) => {
  const classes = useStyles();

  return (
    <Fab
      size="small"
      variant="extended"
      className={clsx(classes.fab, className)}
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

const EditorsLine = ({
  part,
  text,
  partLP,
  partTotal,
  changePart,
  openPicker
}) => {
  const classes = useStyles();

  return (
    <div className={classes.editorsLine}>
      <div className={classes.text}>
        <Typography className={classes.name}>
          <Trans id={text} />
        </Typography>
        <Typography className={classes.numbers}>
          {`${partLP}/${partTotal}`}
        </Typography>
      </div>

      <StyledFab onClick={() => changePart(part, -1)}>
        <ChevronLeft />
      </StyledFab>
      <StyledFab onClick={() => changePart(part, 1)}>
        <ChevronRight />
      </StyledFab>
      {!!openPicker && (
        <StyledFab color="secondary" onClick={e => openPicker(e, part)}>
          <ColorLens />
        </StyledFab>
      )}
    </div>
  );
};

EditorsLine.propTypes = {
  part: PropTypes.string.isRequired,
  text: PropTypes.object.isRequired,
  partLP: PropTypes.number.isRequired,
  partTotal: PropTypes.number.isRequired,
  changePart: PropTypes.func.isRequired,
  openPicker: PropTypes.func
};

export default EditorsLine;
