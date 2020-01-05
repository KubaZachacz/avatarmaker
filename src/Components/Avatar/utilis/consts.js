import { groupByGenders } from "../utilis/groupByGenders";
import avatarSrc from "../source/avatar-source.json";
import avatarConfig from "../source/avatar-config.json";

export const PARTS = Object.keys(avatarSrc);

export const GENDERS = ["male", "female"];

export const PARTS_LENGTHS = {};
for (let part of PARTS) {
  PARTS_LENGTHS[part] = Object.keys(avatarSrc[part]).length;
}

export const ELEMENTS_BY_GENDER = groupByGenders(avatarConfig, GENDERS);

export const PART_STYLE_MAP = {
  hair_top: "hair-style",
  faces: "skin-style",
  clothes: "clothes-style"
  // mouths: "female_mouth_style"
};

export const DEFAULT_COLORS = {
  faces: ["#f0beb4", "#f0d0b4", "#b5917c", "#6e554b"],
  hair_top: [
    "#FFF572",
    "#FF9321",
    "#aa8866",
    "#debe99",
    "#9a3300",
    "#4f1a00",
    "#2d2d2d",
    "#d9d9d9"
  ],
  clothes: [
    "#D0021B",
    "#F5A623",
    "#F8E71C",
    "#8B572A",
    "#7ED321",
    "#417505",
    "#9013FE",
    "#4A90E2",
    "#000000",
    "#4A4A4A",
    "#9B9B9B"
  ],
  general: [
    "#D0021B",
    "#F5A623",
    "#F8E71C",
    "#8B572A",
    "#7ED321",
    "#417505",
    "#BD10E0",
    "#9013FE",
    "#4A90E2",
    "#50E3C2",
    "#B8E986",
    "#000000",
    "#4A4A4A",
    "#9B9B9B"
  ]
};
