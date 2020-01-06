import { createSlice } from "@reduxjs/toolkit";
import { loadState, STORAGE_NAMES } from "../../utilis/localStorage";
import { LANGUAGES } from "../../consts";

const persistedState = loadState(STORAGE_NAMES.state); // try to load state from local storage

const settingsSlice = createSlice({
  name: "settings",
  initialState: {
    lang: LANGUAGES.en,
    isDarkMode: false,
    ...persistedState
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
