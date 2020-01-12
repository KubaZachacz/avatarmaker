import random from "lodash/random";
import {
  PARTS,
  DEFAULT_COLORS,
  ELEMENTS_BY_GENDER,
  PAIRED_PARTS,
  EXCLUDED_PARTS
} from "./consts";
import sample from "lodash/sample";

export const randomAvatarBySource = source => {
  const elements = {};
  const style = {};
  for (let part of PARTS) {
    const value = sample(source[part]);
    elements[part] = value;
    if (Object.keys(PAIRED_PARTS).includes(part))
      elements[PAIRED_PARTS[part]] = value;
    const styleArr = DEFAULT_COLORS[part] || DEFAULT_COLORS.general;
    const styleId = random(0, styleArr.length - 1);
    style[part] = styleArr[styleId];
  }

  return {
    elements: elements,
    style: style
  };
};

export const randomAvatarByGender = (gender = "neutral") => {
  return randomAvatarBySource(ELEMENTS_BY_GENDER[gender]);
};
