import PatientsActionsTypes from "./patients.types";

export const getAllPatientsStart = () => ({
  type: PatientsActionsTypes.GET_ALL_PATIENTS_START,
});

export const getAllPatientsSuccess = (allPatients) => ({
  type: PatientsActionsTypes.GET_ALL_PATIENTS_SUCCESS,
  payload: allPatients,
});

export const getAllPatientsFailure = (error) => ({
  type: PatientsActionsTypes.GET_ALL_PATIENTS_FAILURE,
  payload: error,
});

export const getAPatientStart = (id) => ({
  type: PatientsActionsTypes.GET_A_PATIENT_START,
  payload: id,
});

export const getAPatientSuccess = (patient) => ({
  type: PatientsActionsTypes.GET_A_PATIENT_SUCCESS,
  payload: patient,
});

export const getAPatientFailure = (error) => ({
  type: PatientsActionsTypes.GET_A_PATIENT_FAILURE,
  payload: error,
});

export const postAPatientStart = (patient) => ({
  type: PatientsActionsTypes.POST_A_PATIENT_START,
  payload: patient,
});

export const postAPatientSuccess = (patient) => ({
  type: PatientsActionsTypes.POST_A_PATIENT_SUCCESS,
  payload: patient,
});

export const postAPatientFailure = (error) => ({
  type: PatientsActionsTypes.POST_A_PATIENT_FAILURE,
  payload: error,
});

export const deleteAPatientStart = (id) => ({
  type: PatientsActionsTypes.DELETE_A_PATIENT_START,
  payload: id,
});

export const deleteAPatientSuccess = () => ({
  type: PatientsActionsTypes.DELETE_A_PATIENT_SUCCESS,
});

export const deleteAPatientFailure = (error) => ({
  type: PatientsActionsTypes.DELETE_A_PATIENT_FAILURE,
  error: error,
});

export const patchAPatientStart = (id, attribute, value) => ({
  type: PatientsActionsTypes.PATCH_A_PATIENT_START,
  payload: { id, attribute, value },
});

export const patchAPatientSuccess = () => ({
  type: PatientsActionsTypes.PATCH_A_PATIENT_SUCCESS,
});

export const patchAPatientFailure = (error) => ({
  type: PatientsActionsTypes.PATCH_A_PATIENT_FAILURE,
  payload: error,
});
