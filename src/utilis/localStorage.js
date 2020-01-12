export const STORAGE_NAMES = {
  state: "avatarMaker"
};

export const loadState = (place = STORAGE_NAMES.state) => {
  try {
    const serializedState = localStorage.getItem(place);
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

export const saveState = (state, place = STORAGE_NAMES.state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem(place, serializedState);
  } catch {
    // ignore write errors
  }
};

export const clearState = (place = STORAGE_NAMES.state) => {
  if (typeof Storage !== "undefined") {
    // console.log("remove", place, loadState(place));
    localStorage.removeItem("avatarMaker");
    document.location.reload();
  }
};
