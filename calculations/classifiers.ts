// 1. "Two novel biometric features in keystroke dynamics authentication systems for touch screen devices" [72]

import { Combination, InputData } from "../state/testers_slice";
import { extractFeatures, extractFeaturesTesting } from "./featureExtractors";

// for building classifier
const getMean = (mergedFeatures: Array<number>) => {
  const sum = mergedFeatures.reduce((a, b) => a + b, 0);

  const mean = sum / mergedFeatures.length;
  return mean;
};

const getMeanAbsoluteDeviation = (mean: number, values: Array<number>) => {
  const sum = values.reduce((a, b) => a + Math.abs(b - mean), 0);

  const meanAbsoluteDeviation = sum / values.length;
  return meanAbsoluteDeviation;
};

// for authentication
const getAverageDistance = (
  mean: number,
  absoluteDeviation: number,
  valuesToAuthenticate: Array<number>
) => {
  const sum = valuesToAuthenticate.reduce(
    (a, b) => a + Math.abs(b - mean) / absoluteDeviation,
    0
  );

  const averageDistance = sum / valuesToAuthenticate.length;
  return averageDistance;
};

// AUTHENTICATE: true = legitimate, false=impostor
export const authenticate1 = (
  combination: Combination,
  inputData: InputData,
  threshold: number
) => {
  const features = extractFeatures(combination);
  const mean = getMean(features);
  const meanAbsoluteDeviation = getMeanAbsoluteDeviation(mean, features);

  const averageDistance = getAverageDistance(
    mean,
    meanAbsoluteDeviation,
    extractFeaturesTesting(inputData, combination.features)
  );

  console.log("DISTANCE: ", averageDistance);

  return averageDistance <= threshold;
};
