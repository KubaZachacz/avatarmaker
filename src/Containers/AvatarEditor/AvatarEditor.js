import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setAvatarStyle,
  setAvatarElements
} from "../../store/slices/avatarSlice";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Button, Divider } from "@material-ui/core";
import {
  Avatar,
  PARTS,
  PARTS_LENGTHS,
  PART_STYLE_MAP,
  DEFAULT_COLORS,
  ELEMENTS_BY_GENDER
} from "../../components/Avatar";
import { randomAvatarByGender as randomAvatar } from "../../components/Avatar/utilis/randomAvatar";
import ColorPickerPopper from "../../components/ColorPickerPopper";
import GenderFilter from "./components/GenderFilter";
import EditorsLine from "./components/EditorsLine";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDice } from "@fortawesome/free-solid-svg-icons";
import avatarConfig from "../../components/Avatar/source/avatar-config.json";
import { Trans } from "@lingui/macro";

const REVERSED_PARTS = [...PARTS].reverse();

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
  Random: {
    width: "100%",
    height: 48,
    margin: "8px 0"
  },
  divider: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2)
  }
}));

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
    let gender = "all";
    if (!maleFilter && femaleFilter) gender = "male";
    else if (maleFilter && !femaleFilter) gender = "female";
    const { elements, style } = randomAvatar(gender);
    dispatch(setAvatarElements(elements));
    dispatch(setAvatarStyle(style));
  };

  const editLinesArray = REVERSED_PARTS.map(part => {
    console.log(
      "PART_STYLE_MAP",
      !!PART_STYLE_MAP[part] ? openColorPicker : "undefined"
    );

    return (
      part !== "hair_back" && (
        <EditorsLine
          key={`config-${part}`}
          part={part}
          partLP={avatarElements[part] + 1}
          partTotal={PARTS_LENGTHS[part]}
          changePart={changePartHandler}
          classes={classes}
          {...(!!PART_STYLE_MAP[part] && { openPicker: openColorPicker })}
        />
      )
    );
  });

  return (
    <div className={classes.root}>
      <div className={classes.avatarWrapper}>
        <Avatar
          {...{ avatarElements, avatarStyle }}
          className={classes.Avatar}
        />
      </div>
      <div className={classes.editLinesArray}>
        <Typography variant="h6">
          <Trans>Filters:</Trans>
        </Typography>
        <GenderFilter {...{ maleFilter, femaleFilter }} />
        <Divider className={classes.divider} />
        <Typography variant="h6">
          <Trans>Modifiers:</Trans>
        </Typography>
        {editLinesArray}
        <Divider className={classes.divider} />
        <Button
          variant="contained"
          color="primary"
          className={classes.Random}
          onClick={randomHandler}
        >
          <Trans>RANDOM</Trans>&nbsp;
          <FontAwesomeIcon icon={faDice} size="lg" />
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
