import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  // owner_uid: null,
  // email: null,
  // avatar: null,
};

export const userDataSlice = createSlice({
  name: "userData",
  initialState,
  reducers: {
    setUserData: (state, action) => {
      // state.owner_uid = action.payload.owner_uid;
      // state.email = action.payload.email;
      // state.avatar = action.payload.avatar;
    },
    logoutUserData: (state) => {
      // state.owner_uid = null;
      // state.email = null;
      // state.userDataAvatar = null;
    },
  },
});

export const { setUserData, logoutUserData } = userDataSlice.actions;
export default userDataSlice.reducer;
