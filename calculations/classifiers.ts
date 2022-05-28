// 1. "Two novel biometric features in keystroke dynamics authentication systems for touch screen devices" [72]

import { Combination, InputData } from "../state/testers_slice";
import { extractFeatures, extractFeaturesTesting } from "./featureExtractors";

// for building classifier
const getMeans = (extractedFeatures: Array<Array<number>>) => {
  const meansArray: Array<number> = [];

  for (let i = 0; i < extractedFeatures[0].length; i++) {
    let sameFeatureDiferentSteps = [];
    for (let j = 0; j < extractedFeatures.length; j++) {
      sameFeatureDiferentSteps.push(extractedFeatures[j][i]);
    }
    // calculate mean
    const sum = sameFeatureDiferentSteps.reduce((a, b) => a + b, 0);
    const mean = sum / extractedFeatures.length;
    meansArray.push(mean);
  }
  return meansArray;
};

const getMeanAbsoluteDeviations = (
  means: Array<number>,
  extractedFeatures: Array<Array<number>>
) => {
  const deviationsArray: Array<number> = [];

  for (let i = 0; i < extractedFeatures[0].length; i++) {
    let sameFeatureDiferentSteps = [];
    for (let j = 0; j < extractedFeatures.length; j++) {
      sameFeatureDiferentSteps.push(extractedFeatures[j][i]);
    }
    // calculate deviation
    const sum = sameFeatureDiferentSteps.reduce(
      (a, b) => a + Math.abs(b - means[i]),
      0
    );
    const meanAbsoluteDeviation = sum / extractedFeatures.length;
    deviationsArray.push(meanAbsoluteDeviation);
  }

  return deviationsArray;
};

// for authentication
const getAverageDistance = (
  means: Array<number>,
  absoluteDeviations: Array<number>,
  valuesToAuthenticate: Array<number>
) => {
  const sum = valuesToAuthenticate.reduce(
    (a, b, currentIndex) =>
      a + Math.abs(b - means[currentIndex]) / absoluteDeviations[currentIndex],
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
  const features = extractFeatures(combination); //array.length ik-2
  const means = getMeans(features);
  const meanAbsoluteDeviations = getMeanAbsoluteDeviations(means, features);

  const averageDistance = getAverageDistance(
    means,
    meanAbsoluteDeviations,
    extractFeaturesTesting(inputData, combination.features)
  );

  return averageDistance <= threshold;
};

// 2. Hits factor, deviation ratio and feature fusion (Sudhir Dhage, Pranav Kundra and others)

// For calculating mean - getMeans function is reused

const getStandartDeviations = (
  means: Array<number>,
  extractedFeatures: Array<Array<number>>
) => {
  const deviationsArray: Array<number> = [];

  for (let i = 0; i < extractedFeatures[0].length; i++) {
    let sameFeatureDiferentSteps = [];
    for (let j = 0; j < extractedFeatures.length; j++) {
      sameFeatureDiferentSteps.push(extractedFeatures[j][i]);
    }
    // calculate standart deviation
    const sum = sameFeatureDiferentSteps.reduce(
      (a, b) => a + Math.pow(b - means[i], 2),
      0
    );
    const meanAbsoluteDeviation = Math.sqrt(
      sum / (extractedFeatures.length - 1)
    );
    deviationsArray.push(meanAbsoluteDeviation);
  }

  return deviationsArray;
};

// Factor 1 - hits factor
const getRangeLimits = (
  means: Array<number>,
  standartDeviations: Array<number>,
  threshold: number
) => {
  const upperLimits = [];
  const lowerLimits = [];
  for (let i = 0; i < means.length; i++) {
    upperLimits.push(means[i] + threshold * standartDeviations[i]);
    lowerLimits.push(means[i] - threshold * standartDeviations[i]);
  }
  return { upperLimmits: upperLimits, lowerLimmits: lowerLimits };
};

//3. The Med-Min-Dif classifier. (N. M. Al-Obaidi and M. M. Al-Jarrah)

// upper and lower limits

// AUTHENTICATE: true = legitimate, false=impostor
export const authenticate3 = (
  combination: Combination,
  testingData: InputData
  // passMark: number
) => {
  console.log("3 authentikacija");
  let score = 0;
  const features = extractFeatures(combination); //array.length ik-2

  const testingFeatures = extractFeaturesTesting(
    testingData,
    combination.features
  );
  const lowerThresholds = getLowerThresholds(features);
  const upperThresholds = getUpperThresholds(features);

  for (let i = 0; i < testingFeatures.length; i++) {
    if (
      testingFeatures[i] < upperThresholds[i] &&
      testingFeatures[i] > lowerThresholds[i]
    ) {
      score += 1;
    }
  }

  const passMark = testingFeatures.length / 1.4; //PASS MARK
  console.log(passMark, score);
  return score >= passMark ? true : false;
};

const getLowerThresholds = (features: number[][]) => {
  const lowerThresholds = [];
  for (let i = 0; i < features[0].length; i++) {
    let sameFeatureDiferentSteps = [];
    for (let j = 0; j < features.length; j++) {
      sameFeatureDiferentSteps.push(features[j][i]);
    }
    lowerThresholds.push(Math.min(...sameFeatureDiferentSteps));
  }
  return lowerThresholds;
};

const getUpperThresholds = (
  features: number[][],
  constantFactor: number = 2
) => {
  const upperThresholds: Array<number> = [];

  for (let i = 0; i < features[0].length; i++) {
    let sameFeatureDiferentSteps = [];
    for (let j = 0; j < features.length; j++) {
      sameFeatureDiferentSteps.push(features[j][i]);
    }
    const median = getmedian(sameFeatureDiferentSteps);
    const UDM =
      (median - Math.min(...sameFeatureDiferentSteps)) * constantFactor;
    const upperThreshold = median + UDM;

    upperThresholds.push(upperThreshold);
  }
  return upperThresholds;
};

const getmedian = (values: Array<number>) => {
  if (values.length === 0) throw new Error("No inputs");

  values.sort(function (a, b) {
    return a - b;
  });

  var half = Math.floor(values.length / 2);

  if (values.length % 2) return values[half];

  return (values[half - 1] + values[half]) / 2.0;
};
