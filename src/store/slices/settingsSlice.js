import { createSlice } from "@reduxjs/toolkit";
import { loadState, saveState, STORAGE_NAMES } from "../../utilis/localStorage";

const persistedState = loadState(STORAGE_NAMES.settings); // try to load state from local storage

const settingsSlice = createSlice({
  name: "settings",
  initialState: {
    lang: "pl",
    ...persistedState
  },
  reducers: {
    setLanguageState(state, action) {
      state.lang = action.payload;
    }
  }
});

export const { setLanguageState } = settingsSlice.actions;

export default settingsSlice.reducer;

export const setLanguage = payload => (dispatch, getState) => {
  dispatch(setLanguageState(payload));
  const { settings } = getState();
  saveState(settings, STORAGE_NAMES.settings);
};
