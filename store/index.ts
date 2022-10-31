import { configureStore } from "@reduxjs/toolkit";
import { createWrapper, HYDRATE, MakeStore } from "next-redux-wrapper";
import { TypedUseSelectorHook, useSelector as useReduxSelector } from "react-redux";
import { combineReducers } from "redux";
import auth from "./auth";
import common from "./common";
import user from "./user";

const rootReducer = combineReducers({
  common: common.reducer,
  user: user.reducer,
  auth: auth.reducer,
});

//store type
export type RootState = ReturnType<typeof rootReducer>;

let initialRootState: RootState;

const reducer = (state: any, action: any) => {
  if (action.type === HYDRATE) {
    if (state === initialRootState) {
      return {
        ...state,
        ...action.payload,
      };
    }
    return state;
  }
  return rootReducer(state, action);
};

//type이 지원되는 커스텀 useSelector
export const useSelector: TypedUseSelectorHook<RootState> = useReduxSelector;

const initStore: MakeStore<any> = () => {
  const store = configureStore({
    reducer,
    devTools: true,
  });
  initialRootState = store.getState();
  return store;
};

export const wrapper = createWrapper(initStore);
