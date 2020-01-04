import React, { useMemo } from "react";
import avatarSrc from "../../../assets/avatar/avatars.json";
import ReactHtmlParser from "react-html-parser";
import { css } from "glamor";
import clsx from "clsx";
import { PARTS, PART_STYLE_MAP } from "./consts";
import { FaceGradient, GlassesGradient, SunglassesGradient } from "./gradients";

import "../../../assets/avatar/avatars.css";

const Avatar = ({ className, avatarElements, avatarStyle }) => {
  const avatar = useMemo(
    () =>
      PARTS.map(part => ReactHtmlParser(avatarSrc[part][avatarElements[part]])),
    [avatarElements]
  );

  const avatarStyleObject = useMemo(() => {
    const style = {};
    for (let part of PARTS) {
      style[`& .${PART_STYLE_MAP[part]}`] = {
        fill: avatarStyle[part]
      };
    }
    return style;
  }, [avatarStyle]);

  return (
    <svg
      className={clsx("avatar", className)}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 110 150"
      {...css(avatarStyleObject)}
    >
      <FaceGradient />
      <GlassesGradient />
      <SunglassesGradient />
      {avatar}
    </svg>
  );
};

export default Avatar;
