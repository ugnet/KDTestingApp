import { configureStore } from "@reduxjs/toolkit";

import testersReducer from "./testers_slice";

export const store = configureStore({ reducer: { testers: testersReducer } });

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
