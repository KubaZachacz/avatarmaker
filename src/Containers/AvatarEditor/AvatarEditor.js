import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setAvatarStyle,
  setAvatarElements
} from "../../store/slices/avatarSlice";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Button, IconButton, Fab } from "@material-ui/core";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
import ColorLens from "@material-ui/icons/ColorLens";
import {
  Avatar,
  PARTS,
  GENDERS,
  PARTS_LENGTHS,
  PART_STYLE_MAP,
  DEFAULT_COLORS
} from "../../components/Avatar";
import { randomAvatar, randomSrcAvatar } from "./randomAvatar";
import ColorPickerPopper from "../../components/ColorPickerPopper";
import GenderFilter from "./GenderFilter";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDice } from "@fortawesome/free-solid-svg-icons";
import avatarConfig from "../../components/Avatar/source/avatar-config.json";

const filterByGender = () => {
  const genderOptions = ["all", ...GENDERS];
  const output = {};
  for (let gender of genderOptions) {
    output[gender] = {};
    for (let part of PARTS) {
      output[gender][part] = [];
    }
  }
  for (let part of PARTS) {
    if (part !== "hair_back") {
      const elements = Object.keys(avatarConfig[part]);
      for (let element of elements) {
        output["all"][part].push(element);
        for (let gender of GENDERS) {
          if (avatarConfig[part][element][gender]) {
            output[gender][part].push(element);
          }
        }
      }
    }
  }
  return output;
};

const REVERSED_PARTS = [...PARTS].reverse();
const avatarElementsByGender = filterByGender();

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around"
  },
  editLinesArray: {
    width: "100%"
  },
  EditLine: {
    margin: "0 auto",
    display: "flex",
    alignItems: "center"
  },
  Text: {
    width: 200
  },
  avatarWrapper: {
    width: "100%",
    position: "relative"
  },
  photoFrame: {
    position: "absolute",
    width: "100%",
    maxHeight: 490,
    top: 0,
    left: 0,
    opacity: 0.1
  },
  Avatar: {
    maxHeight: 490
  },
  Fab: {
    width: "34px !important",
    margin: "4px"
  },
  Random: {
    width: "100%",
    height: 48,
    margin: "8px 0"
  }
}));

const EditLine = ({
  part,
  partLP,
  partTotal,
  changePart,
  classes,
  openPicker
}) => (
  <div className={classes.EditLine}>
    <Typography
      className={classes.Text}
    >{`${part} ${partLP}/${partTotal}`}</Typography>

    <Fab
      size="small"
      variant="extended"
      color="primary"
      className={classes.Fab}
      onClick={() => changePart(part, -1)}
    >
      <ChevronLeft />
    </Fab>

    <Fab
      size="small"
      variant="extended"
      color="primary"
      className={classes.Fab}
      onClick={() => changePart(part, 1)}
    >
      <ChevronRight />
    </Fab>
    {!!openPicker && (
      <Fab
        size="small"
        variant="extended"
        color="secondary"
        className={classes.Fab}
        onClick={e => openPicker(e, part)}
      >
        <ColorLens />
      </Fab>
    )}
  </div>
);

const AvatarEditor = props => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const { elements: avatarElements, style: avatarStyle } = useSelector(
    state => state.avatar
  );

  const { male: maleFilter, female: femaleFilter } = useSelector(
    state => state.avatar.genderFilter
  );

  const [anchorEl, setAnchorEl] = useState(null);
  const [openedPart, setOpenedPart] = useState(false);

  const changePartHandler = (part, inc) => {
    const newAvatarElements = { ...avatarElements };
    let increment = newAvatarElements[part] + inc;
    if (avatarElements[part] + inc >= PARTS_LENGTHS[part]) increment = 0;
    if (avatarElements[part] + inc < 0) increment = PARTS_LENGTHS[part] - 1;
    newAvatarElements[part] = increment;
    if (part === "hair_top") newAvatarElements["hair_back"] = increment;
    dispatch(setAvatarElements(newAvatarElements));
  };

  const openColorPicker = (e, part) => {
    setAnchorEl(e.currentTarget);
    setOpenedPart(part);
  };

  const styleChangeHandler = (part, value) => {
    const newAvatarStyle = { ...avatarStyle };
    newAvatarStyle[part] = value;
    dispatch(setAvatarStyle(newAvatarStyle));
  };

  const randomHandler = () => {
    let source = avatarElementsByGender["all"];
    if (!maleFilter && femaleFilter) source = avatarElementsByGender["male"];
    else if (maleFilter && !femaleFilter)
      source = avatarElementsByGender["female"];
    const { elements, style } = randomSrcAvatar(source);
    dispatch(setAvatarElements(elements));
    dispatch(setAvatarStyle(style));
  };

  const editLinesArray = REVERSED_PARTS.map(
    part =>
      part !== "hair_back" && (
        <EditLine
          key={`config-${part}`}
          part={part}
          partLP={avatarElements[part] + 1}
          partTotal={PARTS_LENGTHS[part]}
          changePart={changePartHandler}
          classes={classes}
          openPicker={!!PART_STYLE_MAP[part] && openColorPicker}
        />
      )
  );

  return (
    <div className={classes.root}>
      <div className={classes.avatarWrapper}>
        {/* <img src={photoFrame} className={classes.photoFrame} /> */}
        <Avatar
          {...{ avatarElements, avatarStyle }}
          className={classes.Avatar}
        />
      </div>
      <div className={classes.editLinesArray}>
        <GenderFilter {...{ maleFilter, femaleFilter }} />
        {editLinesArray}
        <Button
          variant="contained"
          color="primary"
          className={classes.Random}
          onClick={randomHandler}
        >
          RANDOM <FontAwesomeIcon icon={faDice} size="lg" />
        </Button>
        <ColorPickerPopper
          {...{ anchorEl }}
          onClickAway={() => setOpenedPart(null)}
          isOpen={!!openedPart}
          color={avatarStyle[openedPart]}
          onChangeComplete={(color, event) =>
            styleChangeHandler(openedPart, color.hex)
          }
          presetColors={DEFAULT_COLORS[openedPart]}
        />
      </div>
    </div>
  );
};

export default AvatarEditor;
