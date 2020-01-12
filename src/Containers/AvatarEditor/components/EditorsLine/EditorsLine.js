import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Tooltip } from "@material-ui/core";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
import ColorLens from "@material-ui/icons/ColorLens";
import { Trans } from "@lingui/macro";
import Fab from "../../../../Components/StyledFab";

const useStyles = makeStyles(theme => ({
  editorsLine: {
    margin: "0 auto",
    display: "flex",
    alignItems: "center",
    minWidth: 300
  },
  text: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    width: 160,
    [theme.breakpoints.up("sm")]: {
      width: 240
    }
  },
  name: {
    fontWeight: 500
  },
  numbers: {
    fontStyle: "italic",
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      marginRight: theme.spacing(6)
    }
  }
}));

const EditorsLine = ({
  part,
  text,
  partLP,
  partTotal,
  genderTotal,
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
          {`${partLP}/${partTotal} ${
            genderTotal !== partTotal ? "(" + genderTotal + ")" : ""
          }`}
        </Typography>
      </div>

      <Fab onClick={() => changePart(part, -1)}>
        <ChevronLeft />
      </Fab>
      <Fab onClick={() => changePart(part, 1)}>
        <ChevronRight />
      </Fab>
      {!!openPicker && (
        <Fab color="secondary" onClick={e => openPicker(e, part)}>
          <ColorLens />
        </Fab>
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
