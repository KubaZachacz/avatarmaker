import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Modal, Paper } from "@material-ui/core";
import { Trans } from "@lingui/macro";

const useStyles = makeStyles(theme => ({
  paper: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%,-50%)",
    width: "80%",
    minHeight: "80vh",
    padding: theme.spacing(3)
  }
}));

const InfoModal = ({ isOpen, handleClose }) => {
  const classes = useStyles();

  return (
    <Modal
      open={isOpen}
      onClose={handleClose}
      className={classes.root}
      disableAutoFocus
      disableEnforceFocus
      disableScrollLock
    >
      <Paper className={classes.paper}>
        <Typography align="center" variant="h5">
          <Trans>Project info</Trans>
        </Typography>
      </Paper>
    </Modal>
  );
};

export default InfoModal;
