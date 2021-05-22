import { createSelector } from "reselect";

const selectPatients = (state) => state.patients;

export const selectAllPatients = createSelector(
  [selectPatients],
  (patients) => patients.allPatients
);
