import { createSlice } from "@reduxjs/toolkit";
import { IField, IFieldRouteKey } from "store/interfaces";
import createField from "store/utils/createField";

const initialState: IField = createField({});
export const fieldSlice = createSlice({
  name: "field",
  initialState,
  reducers: {
    buildRoute: (state, { payload }) => {
      const route = state.routes[payload];
      const backwardRoute = state.routes[route.backward];
      // debugger;
      route.exists = true;
      backwardRoute.exists = true;
    },
  },
});

export const buildRoute = (route: IFieldRouteKey) => {
  return fieldSlice.actions.buildRoute(route);
};

export const mapFieldActions = fieldSlice.actions;
