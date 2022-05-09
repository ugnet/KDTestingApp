// FEATURE EXTRACTION FUNCTIONS FOR TRAINING STEP

import { InputData } from "../state/testers_slice";

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
};
