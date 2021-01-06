import { configureStore } from "@reduxjs/toolkit";
import { moneySlice, mapMoneyActions } from "./slices/moneySlice";
import { fieldSlice, mapFieldActions } from "./slices/fieldSlice";
import { useDispatch } from "react-redux";

// let preloadedState:IState = {
//   money: 101,
//   trains: [],
//   field: []
// }

const store = configureStore({
  reducer: {
    money: moneySlice.reducer,
    field: fieldSlice.reducer,
  },
});

export interface IRootState extends ReturnType<typeof store.getState> {}

export const mapState = (state: IRootState) => state;
export const mapActions = {
  ...mapMoneyActions,
  ...mapFieldActions,
};

export type IStoreDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<IStoreDispatch>();

export default store;
