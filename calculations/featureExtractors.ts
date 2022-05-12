// FEATURE EXTRACTION FUNCTIONS FOR TRAINING STEP

import { Combination, InputData } from "../state/testers_slice";

// hold time- Down–up time: in the ith training sample, the time
// interval between the press of key j and the release; the
// same key is called DUi,j.
export const calculateDU = (inputData: InputData) => {
  const DU = [];
  for (let i = 0; i < inputData.data.length; i += 2) {
    const pressIn = inputData.data[i];
    const pressOut = inputData.data[i + 1];
    DU.push(pressOut.timeStamp - pressIn.timeStamp);
  }
  return DU;
};

// Up–down time: in the ith training sample, the time
// interval between the release of key j and the press; the
// next key is called UDi,j.
export const calculateUD = (inputData: InputData) => {
  const UD = [];
  for (let i = 1; i < inputData.data.length; i += 2) {
    const pressOut = inputData.data[i];
    const pressIn = inputData.data[i + 1];
    if (pressIn?.timeStamp && pressOut?.timeStamp) {
      UD.push(pressIn.timeStamp - pressOut.timeStamp);
    }
  }
  return UD;
};

// Down–down time: in the ith training sample, the time
// interval between the press of key j and the press; the
// next key is called DDi,j.
export const calculateDD = (inputData: InputData) => {
  const DD = [];
  for (let i = 0; i < inputData.data.length; i += 2) {
    const pressIn = inputData.data[i];
    const pressIn2 = inputData.data[i + 2];
    if (pressIn?.timeStamp && pressIn2?.timeStamp) {
      DD.push(pressIn2.timeStamp - pressIn.timeStamp);
    }
  }
  return DD;
};

// Up–up time: in the ith training sample, the interval
// between the release of key j and the release; the next
// key is called UUi,j.
export const calculateUU = (inputData: InputData) => {
  const UU = [];
  for (let i = 1; i < inputData.data.length; i += 2) {
    const pressOut = inputData.data[i];
    const pressOut2 = inputData.data[i + 2];
    if (pressOut?.timeStamp && pressOut2?.timeStamp) {
      UU.push(pressOut2.timeStamp - pressOut.timeStamp);
    }
  }
  return UU;
};

// {
//     id: 1,
//     title: "UU",
//   },
//   {
//     id: 2,
//     title: "DD",
//   },
//   {
//     id: 3,
//     title: "UD",
//   },
//   {
//     id: 4,
//     title: "DU",
//   },

export const extractFeatures = (combination: Combination) => {
  // kiekvienam zingsniui atskirai
  const features = combination.features;
  const steps = combination.numberOfTrainingSteps;

  // feati = {DUi, UDi, DDi, Pi, Si}={Xi,1, Xi,2, ... , Xi,5k–2}
  // extractedFeatures= [feat1, feat2, ..., feat training steps num]
  const extractedFeatures: Array<Array<number>> = [];

  for (let i = 0; i < steps; i++) {
    let feati: any = [];
    if (features.includes(1)) {
      console.log("calculateDU");
      feati = [...feati, ...calculateUU(combination.trainingData[i])];
    }
    if (features.includes(2)) {
      console.log("calculateDD");
      feati = [...feati, ...calculateDD(combination.trainingData[i])];
    }
    if (features.includes(3)) {
      console.log("calculateUD");
      feati = [...feati, ...calculateUD(combination.trainingData[i])];
    }
    if (features.includes(4)) {
      console.log("calculateDU");
      feati = [...feati, ...calculateDU(combination.trainingData[i])];
    }
    // if (features.includes(5)) {
    //TODO
    // console.log("pressure");
    // feati = [...feati, ...calculateDU(combination.trainingData[i])];
    // }
    extractedFeatures.push(feati);
  }
  const mergedFeatures: Array<number> = Array.prototype.concat.apply(
    [],
    extractedFeatures
  );
  // console.log("!!!", extractedFeatures);
  return extractedFeatures;
};

export const extractFeaturesTesting = (
  inputData: InputData,
  features: number[]
) => {
  // feati = {DUi, UDi, DDi, Pi, Si}={Xi,1, Xi,2, ... , Xi,5k–2}
  let feati: Array<number> = [];
  if (features.includes(1)) {
    feati = [...feati, ...calculateUU(inputData)];
  }
  if (features.includes(2)) {
    feati = [...feati, ...calculateDD(inputData)];
  }
  if (features.includes(3)) {
    feati = [...feati, ...calculateUD(inputData)];
  }
  if (features.includes(4)) {
    feati = [...feati, ...calculateDU(inputData)];
  }
  // if (features.includes(5)) {
  //TODO
  // feati = [...feati, ...calculateDU(inputData)];
  // }
  return feati;
};
