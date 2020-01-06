import { createSlice } from "@reduxjs/toolkit";
import { loadState } from "../../utilis/localStorage";
import { LANGUAGES } from "../../consts";

const persistedState = loadState(); // try to load state from local storage

const settingsSlice = createSlice({
  name: "settings",
  initialState: {
    lang: LANGUAGES.en,
    isDarkMode: false,
    ...(persistedState && persistedState.settings)
  },
  reducers: {
    setLanguage(state, action) {
      state.lang = action.payload;
    },
    toggleDarkMode(state, action) {
      state.isDarkMode = !state.isDarkMode;
    }
  }
});

export const { setLanguage, toggleDarkMode } = settingsSlice.actions;

export default settingsSlice.reducer;
