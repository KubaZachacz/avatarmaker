import { createSlice } from "@reduxjs/toolkit";
import { loadState } from "../../utilis/localStorage";
import { randomAvatar } from "../../Components/AvatarEditor";

const persistedState = loadState(); // try to load state from local storage

const { elements, style } = randomAvatar();

const avatarSlice = createSlice({
  name: "avatar",
  initialState: {
    ...{ elements, style },
    genderFilter: {
      male: false,
      female: false
    },
    ...(persistedState && persistedState.avatar)
  },
  reducers: {
    setAvatarElements(state, action) {
      state.elements = action.payload;
    },
    setAvatarStyle(state, action) {
      state.style = action.payload;
    },
    toggleGenderFilterState(state, action) {
      state.genderFilter[action.payload] = !state.genderFilter[action.payload];
    }
  }
});

export const {
  setAvatarElements,
  setAvatarStyle,
  toggleGenderFilterState
} = avatarSlice.actions;

export default avatarSlice.reducer;

export const toggleGenderFilter = payload => (dispatch, getState) => {
  const {
    genderFilter: { male, female }
  } = getState().avatar;
  let gender = payload;
  console.log(gender, male, female);
  dispatch(toggleGenderFilterState(gender));
  if (gender === "male" && female) {
    gender = "female";
    dispatch(toggleGenderFilterState(gender));
  }
  if (gender === "female" && male) {
    gender = "male";
    dispatch(toggleGenderFilterState(gender));
  }
  // const { settings } = getState();
  // saveState(settings, STORAGE_NAMES.settings);
};
