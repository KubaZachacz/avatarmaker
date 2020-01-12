import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Typography,
  Modal,
  Paper,
  Divider,
  Container
} from "@material-ui/core";
import { Avatar } from "../../Components/Avatar";
import Logo from "../../Components/Logo";
import { Trans } from "@lingui/macro";
import { MY_AVATAR } from "../../consts";

const useStyles = makeStyles(theme => ({
  paper: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%,-50%)",
    width: "70%",
    height: "70vh",
    padding: theme.spacing(3),
    overflow: "auto"
  },
  title: {
    marginBottom: theme.spacing(2)
  },
  paragaph: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    textAlign: "center",
    "& a": {
      color: "inherit",
      wordBreak: "break-all",
      [theme.breakpoints.down("sm")]: {
        fontSize: "14px"
      }
    }
  },
  avatar: {
    height: 240,
    display: "block",
    margin: "0 auto"
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
        <Container maxWidth="lg">
          <Typography align="center" variant="h4" className={classes.title}>
            <Logo />
          </Typography>
          <Divider />
          <Typography className={classes.paragaph}>
            <Trans>
              Avatar Maker is a self made, showcase project, which is going to
              be a part of something way much bigger soon.
              <br />
              &#10024; Stay tuned! &#10024;
              <br />
              But for now feel free to generate and save your avatars and have
              fun! &#128516;
            </Trans>
          </Typography>
          <Typography className={classes.paragaph}>
            <Trans>Project's repository with detailed description:</Trans>
            <br />
            &#128073;
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://github.com/KubaZachacz/avatarmaker"
            >
              https://github.com/KubaZachacz/avatarmaker
            </a>
          </Typography>
          <Typography className={classes.paragaph}>
            <Trans>Contanct:</Trans>
            <br />
            &#128073;
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="mailo:zachacz.jakub@gmail.com"
            >
              zachacz.jakub@gmail.com{" "}
            </a>
          </Typography>
          <Avatar
            avatarElements={MY_AVATAR.elements}
            avatarStyle={MY_AVATAR.styles}
            className={classes.avatar}
          />
        </Container>
      </Paper>
    </Modal>
  );
};

export default InfoModal;
