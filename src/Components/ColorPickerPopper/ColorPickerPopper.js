import React from "react";
// import { makeStyles } from "@material-ui/core/styles";
import { Popper, Paper, ClickAwayListener } from "@material-ui/core";
import { SketchPicker, CompactPicker } from "react-color";

// const useStyles = makeStyles(theme => ({}));

const ColorPickerPopper = ({
  color,
  anchorEl,
  isOpen,
  presetColors,
  onChangeComplete,
  onClickAway
}) => {
  // const classes = useStyles();
  return (
    <Popper open={isOpen} {...{ anchorEl }} style={{ zIndex: 999 }}>
      <ClickAwayListener {...{ onClickAway }}>
        <Paper>
          <SketchPicker
            {...{ color, presetColors, onChangeComplete }}
            disableAlpha={true}
          />
        </Paper>
      </ClickAwayListener>
    </Popper>
  );
};

export default ColorPickerPopper;
