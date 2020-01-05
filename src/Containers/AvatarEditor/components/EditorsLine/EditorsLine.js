import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Fab } from "@material-ui/core";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
import ColorLens from "@material-ui/icons/ColorLens";
import clsx from "clsx";

const useStyles = makeStyles(theme => ({
  editorsLine: {
    margin: "0 auto",
    display: "flex",
    alignItems: "center"
  },
  text: {
    width: 200
  },
  fab: {
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

const EditorsLine = ({ part, partLP, partTotal, changePart, openPicker }) => {
  const classes = useStyles();
  console.log(part, openPicker);
  return (
    <div className={classes.editorsLine}>
      <Typography
        className={classes.text}
      >{`${part} ${partLP}/${partTotal}`}</Typography>

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
  partLP: PropTypes.number.isRequired,
  partTotal: PropTypes.number.isRequired,
  changePart: PropTypes.func.isRequired,
  openPicker: PropTypes.func
};

export default EditorsLine;
