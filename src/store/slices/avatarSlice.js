import { createSlice } from "@reduxjs/toolkit";
import { loadState } from "../../utilis/localStorage";
import { randomAvatarByGender as randomAvatar } from "../../components/Avatar";
import { GENDER_FILTERS } from "../../consts";

const persistedState = loadState(); // try to load state from local storage

const { elements, style } = randomAvatar();

const avatarSlice = createSlice({
  name: "avatar",
  initialState: {
    ...{ elements, style },
    genderFilter: GENDER_FILTERS.neutral,
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
      state.genderFilter = action.payload;
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
  const { genderFilter } = getState().avatar;
  let newFilter = "neutral";

  if (payload === GENDER_FILTERS.male) {
    if (
      genderFilter === GENDER_FILTERS.neutral ||
      genderFilter === GENDER_FILTERS.male
    ) {
      newFilter = GENDER_FILTERS.female;
    }
  } else if (payload === GENDER_FILTERS.female) {
    if (
      genderFilter === GENDER_FILTERS.neutral ||
      genderFilter === GENDER_FILTERS.female
    ) {
      newFilter = GENDER_FILTERS.male;
    }
  }

  dispatch(toggleGenderFilterState(newFilter));
};
