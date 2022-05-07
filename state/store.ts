import { configureStore } from "@reduxjs/toolkit";

import testersReducer from "./testers_slice";
import classifiersReducer from "./classifiers_slice";

export const store = configureStore({
  reducer: { testers: testersReducer, classifiers: classifiersReducer },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
