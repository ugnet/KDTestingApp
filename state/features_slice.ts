import { createSlice } from "@reduxjs/toolkit";

export type ClassifierType = "statistical" | "neural_network";

export interface Feature {
  id: number;
  title: string;
  short: string;
}

export interface Features extends Array<Feature> {}

const initialState: Features = [
  {
    id: 1,
    title: "Up–up time (UU)",
    short: "UU",
  },
  {
    id: 2,
    title: "Down–down time (DD)",
    short: "DD",
  },
  {
    id: 3,
    title: "Up–down time (UD)",
    short: "UD",
  },
  {
    id: 4,
    title: "Down–up time (DU)",
    short: "DU",
  },
  {
    id: 5,
    title: "Press pressure (on iOS that support 3d touch)",
    short: "P",
  },
];

const featuresSlice = createSlice({
  name: "featuresSlice",
  initialState,
  reducers: {},
});

export const {} = featuresSlice.actions;
export default featuresSlice.reducer;
