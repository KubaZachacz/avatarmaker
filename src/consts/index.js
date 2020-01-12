import { t } from "@lingui/macro";
import { blue, indigo, red } from "@material-ui/core/colors";

export const PALETTE_TYPES = {
  light: "light",
  dark: "dark"
};

export const LANGUAGES = {
  en: "en",
  pl: "pl"
};

export const LANG_FLAG_CODES = {
  en: "GB",
  pl: "PL"
};

export const GENDER_FILTERS = {
  neutral: "neutral",
  male: "male",
  female: "female"
};

export const GENDER_FILTERS_TEXTS = {
  neutral: t`neutral`,
  male: t`male`,
  female: t`female`
};

export const DEFAULT_THEME = {
  palette: {
    primary: {
      main: indigo[700]
    },
    secondary: blue,
    type: PALETTE_TYPES.light
  }
};

export const DEFAULT_SETUP = {
  isDarkMode: false,
  lang: LANGUAGES.en
};

export const MY_AVATAR = {
  elements: {
    hair_back: 2,
    necks: 2,
    clothes: 1,
    ears: 2,
    faces: 3,
    beards_bottom: 0,
    mouths: 4,
    beards_top: 0,
    eyes: 5,
    noses: 1,
    eye_brows: 1,
    glasses: 2,
    hair_top: 2
  },
  styles: {
    hair_back: "#D0021B",
    necks: "#9013FE",
    clothes: "#4a90e2",
    ears: "#F5A623",
    faces: "#f0beb4",
    beards_bottom: "#50E3C2",
    mouths: "#9013FE",
    beards_top: "#7ED321",
    eyes: "#9B9B9B",
    noses: "#B8E986",
    eye_brows: "#000000",
    glasses: "#7ED321",
    hair_top: "#2d2d2d"
  }
};
