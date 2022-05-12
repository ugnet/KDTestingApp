import { Combination } from "../state/testers_slice";

export const calculateMetrics = (combination: Combination) => {
  if (!combination) return { FAR: 0, FRR: 0, ERR: 0 };
  // FAR
  const imposterTotalInputs = combination.tests.filter(
    (test) => test.testedAs === "impostor"
  ).length;
  const imposterInputsWhenAuthenticatedAsGenuine = combination.tests.filter(
    (test) => test.testedAs === "impostor" && test.authenticateAs === "genuine"
  ).length;
  const FAR =
    (imposterInputsWhenAuthenticatedAsGenuine / imposterTotalInputs) * 100;
  // FRR
  const genuineTotalInputs = combination.tests.filter(
    (test) => test.testedAs === "genuine"
  ).length;
  const genuineInputsWhenAuthenticatedAsImpostor = combination.tests.filter(
    (test) => test.testedAs === "genuine" && test.authenticateAs === "impostor"
  ).length;
  const FRR =
    (genuineInputsWhenAuthenticatedAsImpostor / genuineTotalInputs) * 100;
  // EER ???? ar gera implementacija???
  const errors = combination.tests.filter(
    (t) => t.authentication === "fail"
  ).length;
  const ERR = (errors / combination.tests.length) * 100;
  return { FAR: FAR, FRR: FRR, ERR: ERR };
};
