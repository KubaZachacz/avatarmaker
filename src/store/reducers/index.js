import { combineReducers } from "redux";
import settingsReducer from "../slices/settingsSlice";
import avatarSlice from "../slices/avatarSlice";

export default combineReducers({
  settings: settingsReducer,
  avatar: avatarSlice
});
