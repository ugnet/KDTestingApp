import { createSlice } from "@reduxjs/toolkit";

export type ClassifierType = "statistical" | "neural_network";

export interface Classfier {
  id: number;
  title: string;
  type: ClassifierType;
  short: string;
  calculation?: () => void;
}

export interface Classfiers extends Array<Classfier> {}

const initialState: Classfiers = [
  {
    id: 1,
    title:
      "Computation efficient statistical classifier (Cheng-Jung Tasia, Ting-Yi Chang and others) ",
    short: "Computation efficient statistical (1)",
    type: "statistical",
  },
  // {
  //   id: 2,
  //   title:
  //     "Hits factor, deviation ratio and feature fusion (Sudhir Dhage, Pranav Kundra and others) ",
  //   short: "Hits factor, deviation ratio and feature fusion (2)",
  //   type: "statistical",
  // },
  {
    id: 3,
    title: "The Med-Min-Dif classifier. (N. M. Al-Obaidi and M. M. Al-Jarrah) ",
    short: "The Med-Min-Dif classifier.  (3)",
    type: "statistical",
  },
  {
    id: 4, //https://www.emerald.com/insight/content/doi/10.1108/IJPCC-01-2016-0005/full/html?casa_token=3RuM6H5cnjsAAAAA:S_RffkvwtrEL8VwRveSFCvDgIroEKsJ7VJ1MsC85DvWg_nU8q9u-yo2IElYCctIbYos4xuLqOjtSxxmYsEO0amYQppOu8ikyh99mNbhnSPMR3u_2
    title:
      "Gausian estimation similarity score. (P. S. Teh, N. Zhang, A. B. J. Teoh, Ke Chen) ",
    short: "Gausian estimation similarity score.  (4)",
    type: "statistical",
  },
];

const classifiersSlice = createSlice({
  name: "classifiers",
  initialState,
  reducers: {},
});

export const {} = classifiersSlice.actions;
export default classifiersSlice.reducer;
