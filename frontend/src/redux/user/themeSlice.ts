import { createSlice } from "@reduxjs/toolkit";

interface ThemeState {
  theme: "light" | "dark";
}


const initialState:ThemeState = {
  theme: "light",
};

export const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    setTheme: (state, action) => {
      state.theme = action.payload;
    },
  },
});

export const {
  
} = themeSlice.actions;
export default themeSlice.reducer;