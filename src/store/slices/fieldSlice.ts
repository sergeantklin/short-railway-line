import { createSlice } from "@reduxjs/toolkit";
import { IField } from "store/interfaces";
import createField from "store/utils/createField";

const initialState: IField = createField({});
export const fieldSlice = createSlice({
  name: "field",
  initialState,
  reducers: {
    buildRoute: (state) => {
      console.log(state.cells[0]);
    },
  },
});

export const mapFieldActions = fieldSlice.actions;
