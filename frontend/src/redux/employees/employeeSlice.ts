import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentEmployees:  []
};

export const EmployeeSlice = createSlice({
  name: "employee",
  initialState,
  reducers: {
    addEmployeeSuccess: (state, action) => {
      state.currentEmployees = action.payload;
    },
    updateEmployeeSuccess:(state,action) => {
      state.currentEmployees = action.payload;
    },
    deleteEmployeeSuccess: (state) => {
      state.currentEmployees = [];
    },
    signOutEmployeeSuccess: (state) => {
      state.currentEmployees = [];
    },
  },
});

export const {
  updateEmployeeSuccess,
  deleteEmployeeSuccess,
  signOutEmployeeSuccess,
  addEmployeeSuccess,
} = EmployeeSlice.actions;

export default EmployeeSlice.reducer;
