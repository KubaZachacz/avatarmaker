import random from "lodash/random";
import {
  PARTS,
  PARTS_LENGTHS,
  DEFAULT_COLORS
} from "../../components/Avatar/source/consts";
import sample from "lodash/sample";

export const randomAvatar = () => {
  const elements = {};
  const style = {};
  for (let part of PARTS) {
    // ** random part ** //
    const value = random(0, PARTS_LENGTHS[part] - 1);
    elements[part] = value;
    if (part === "hair_top") elements["hair_back"] = value;
    // ** random color ** //
    const styleArr = DEFAULT_COLORS[part] || DEFAULT_COLORS.general;
    const styleId = random(0, styleArr.length - 1);
    style[part] = styleArr[styleId];
  }

  return {
    elements: elements,
    style: style
  };
};

export const randomSrcAvatar = source => {
  const elements = {};
  const style = {};
  for (let part of PARTS) {
    const value = sample(source[part]);
    elements[part] = value;
    if (part === "hair_top") elements["hair_back"] = value;
    const styleArr = DEFAULT_COLORS[part] || DEFAULT_COLORS.general;
    const styleId = random(0, styleArr.length - 1);
    style[part] = styleArr[styleId];
  }

  return {
    elements: elements,
    style: style
  };
};
