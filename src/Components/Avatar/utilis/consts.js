import { groupByGenders } from "../utilis/groupByGenders";
import avatarSrc from "../source/avatar-source.json";
import avatarConfig from "../source/avatar-config.json";
import { t } from "@lingui/macro";

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

export const PAIRED_PARTS = {
  hair_top: "hair_back",
  beards_top: "beards_bottom"
};

export const EXCLUDED_PARTS = Object.values(PAIRED_PARTS);

export const EDITOR_PARTS_TEXTS = {
  hair_top: t`hair`,
  ears: t`ears`,
  glasses: t`glasses`,
  eye_brows: t`eye brows`,
  eyes: t`eyes`,
  noses: t`nose`,
  mouths: t`mouth`,
  beards: t`beard`,
  beards_top: t`beard`,
  faces: t`face`,
  necks: t`neck`,
  clothes: t`clothes`
};

export const EDITOR_PARTS_ORDER = [
  "hair_top",
  "ears",
  "glasses",
  "eye_brows",
  "eyes",
  "noses",
  "mouths",
  "beards_top",
  "faces",
  "necks",
  "clothes"
];

export const HEAD_PARTS = [
  "#hair_back",
  "#hair_top",
  "#faces",
  "#ears",
  "#mouths",
  "#beards_top",
  "#beards_bottom",
  "#eyes",
  "#noses",
  "#eye_brows",
  "#glasses"
];

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
