import {
  all,
  call,
  put,
  select,
  takeEvery,
  takeLatest,
} from "@redux-saga/core/effects";
import axios from "axios";
import {
  deleteAPatientFailure,
  deleteAPatientStart,
  deleteAPatientSuccess,
  getAllPatientsFailure,
  getAllPatientsStart,
  getAllPatientsSuccess,
  patchAPatientFailure,
  patchAPatientSuccess,
  postAPatientFailure,
  postAPatientSuccess,
} from "./patients.actions";
import PatientsActionsTypes from "./patients.types";

export function* getAllPatientsAsync() {
  try {
    const { data } = yield axios.get(
      `https://a0a5xwcyq7.execute-api.sa-east-1.amazonaws.com/prod/patients`,
      {
        headers: {
          Accept: "application/json",
        },
      }
    );
    yield put(getAllPatientsSuccess(data.patients));
  } catch (error) {
    yield put(getAllPatientsFailure(error));
  }
}

export function* postAPatientAsync({ payload }) {
  const patient = payload;
  delete patient.id;
  try {
    const { data } = yield axios.post(
      `https://a0a5xwcyq7.execute-api.sa-east-1.amazonaws.com/prod/patient`,
      patient,
      {
        headers: {
          Accept: "application/json",
        },
      }
    );

    yield put(postAPatientSuccess());
    yield put(getAllPatientsStart());
  } catch (error) {
    yield put(postAPatientFailure(error));
  }
}

export function* patchAPatientAsync({ payload: { id, attribute, value } }) {
  try {
    yield axios.patch(
      `https://a0a5xwcyq7.execute-api.sa-east-1.amazonaws.com/prod/patient`,
      {
        patientId: id,
        updateKey: attribute,
        updateValue: value,
      },
      {
        headers: {
          Accept: "application/json",
        },
      }
    );

    yield put(patchAPatientSuccess());
    yield put(getAllPatientsStart());
  } catch (error) {
    yield put(patchAPatientFailure(error));
  }
}

export function* deleteAPatientAsync({ payload }) {
  console.log(payload);
  try {
    yield axios.delete(
      `https://a0a5xwcyq7.execute-api.sa-east-1.amazonaws.com/prod/patient?patientId=${payload}`,
      {
        headers: {
          Accept: "application/json",
        },
      }
    );

    yield put(deleteAPatientSuccess());
    yield put(getAllPatientsStart());
  } catch (error) {
    console.log(error);
    yield put(deleteAPatientFailure(error));
  }
}

export function* asGetAllPatientsStart() {
  yield takeLatest(
    PatientsActionsTypes.GET_ALL_PATIENTS_START,
    getAllPatientsAsync
  );
}

export function* asPostAPatientStart() {
  yield takeLatest(
    PatientsActionsTypes.POST_A_PATIENT_START,
    postAPatientAsync
  );
}

export function* asPatchAPatientStart() {
  yield takeEvery(
    PatientsActionsTypes.PATCH_A_PATIENT_START,
    patchAPatientAsync
  );
}

export function* asDeleteAPatientStart() {
  yield takeLatest(
    PatientsActionsTypes.DELETE_A_PATIENT_START,
    deleteAPatientAsync
  );
}

export function* patientSagas() {
  yield all([
    call(asGetAllPatientsStart),
    call(asPostAPatientStart),
    call(asPatchAPatientStart),
    call(asDeleteAPatientStart),
  ]);
}
