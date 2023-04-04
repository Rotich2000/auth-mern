import { createSlice } from '@reduxjs/toolkit';

const usernameSlice = createSlice({
  name: 'username',
  initialState: {
    username: "",
  },
  reducers: {
    setUsername: (state, action) => {
      state.username =  action.payload;
    },
    clearUsername: (state) => {
      state.username = '';
    },
  },
});

export const { setUsername, clearUsername } = usernameSlice.actions;

export default usernameSlice.reducer;