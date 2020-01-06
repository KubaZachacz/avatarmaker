import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setAvatarStyle,
  setAvatarElements,
  toggleGenderFilter
} from "../../store/slices/avatarSlice";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Button, Divider } from "@material-ui/core";
import {
  Avatar,
  AVATAR_CONFIG,
  PARTS_LENGTHS,
  PART_STYLE_MAP,
  DEFAULT_COLORS,
  EDITOR_PARTS_ORDER,
  EDITOR_PARTS_TEXTS,
  ELEMENTS_BY_GENDER
} from "../../components/Avatar";
import { randomAvatarByGender as randomAvatar } from "../../components/Avatar/utilis/randomAvatar";
import ColorPickerPopper, {
  useColorPicker
} from "../../components/ColorPickerPopper";
import GenderFilterRow from "./components/GenderFilterRow";
import EditorsLine from "./components/EditorsLine";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDice } from "@fortawesome/free-solid-svg-icons";
import { Trans } from "@lingui/macro";
import { GENDER_FILTERS } from "../../consts";

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

  const {
    anchorEl,
    openedPart,
    setOpenedPart,
    openColorPicker
  } = useColorPicker();

  const {
    elements: avatarElements,
    style: avatarStyle,
    genderFilter
  } = useSelector(state => state.avatar);

  const saveNewPartElement = (part, index) => {
    const newAvatarElements = { ...avatarElements };
    newAvatarElements[part] = index;
    if (part === "hair_top") newAvatarElements["hair_back"] = index;

    dispatch(setAvatarElements(newAvatarElements));
  };

  const changePartHandler = (part, inc, index) => {
    let elementIndex = avatarElements[part] + inc;
    if (index || index === 0) elementIndex = index + inc;
    if (elementIndex >= PARTS_LENGTHS[part]) elementIndex = 0;
    if (elementIndex < 0) elementIndex = PARTS_LENGTHS[part] - 1;
    if (genderFilter !== GENDER_FILTERS.neutral) {
      if (AVATAR_CONFIG[part][elementIndex][genderFilter]) {
        saveNewPartElement(part, elementIndex);
      } else {
        changePartHandler(part, inc, elementIndex);
      }
    } else {
      saveNewPartElement(part, elementIndex);
    }
  };

  const styleChangeHandler = (part, value) => {
    const newAvatarStyle = { ...avatarStyle };
    newAvatarStyle[part] = value;
    dispatch(setAvatarStyle(newAvatarStyle));
  };

  const randomHandler = () => {
    const { elements, style } = randomAvatar(genderFilter);
    dispatch(setAvatarElements(elements));
    dispatch(setAvatarStyle(style));
  };

  const editLinesArray = EDITOR_PARTS_ORDER.map(part => {
    return (
      part !== "hair_back" && (
        <EditorsLine
          key={`config-${part}`}
          part={part}
          text={EDITOR_PARTS_TEXTS[part]}
          partLP={avatarElements[part] + 1}
          partTotal={PARTS_LENGTHS[part]}
          genderTotal={ELEMENTS_BY_GENDER[genderFilter][part].length}
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
        <GenderFilterRow
          {...{ genderFilter }}
          onChange={gender => dispatch(toggleGenderFilter(gender))}
        />
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
