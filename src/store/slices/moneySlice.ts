import { createSlice } from "@reduxjs/toolkit";
import { IRootState } from "store/store";

export const moneySlice = createSlice({
  name: "money",
  initialState: 100,
  reducers: {
    increment: (state) => state + 1,
    decrement: (state) => state - 1,
  },
});

export const mapMoneyState = (state: IRootState) => {
  return { money: state.money };
};

export const mapMoneyActions = moneySlice.actions;
