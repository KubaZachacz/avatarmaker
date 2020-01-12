import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";
import { Trans } from "@lingui/macro";
import CookieConsent from "react-cookie-consent";

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(2)
  }
}));

const CookieBanner = props => {
  const classes = useStyles();

  return (
    <CookieConsent
      ButtonComponent={({ onClick }) => {
        return (
          <Button
            {...{ onClick }}
            color="primary"
            variant="contained"
            className={classes.button}
          >
            <Trans>OK, I understand</Trans>
          </Button>
        );
      }}
    >
      <Trans>
        This website uses cookies for analytics and to enhance the user
        experience.
      </Trans>
    </CookieConsent>
  );
};

export default CookieBanner;
