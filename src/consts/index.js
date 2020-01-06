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
