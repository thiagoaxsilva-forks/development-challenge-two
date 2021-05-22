import { all, call } from "redux-saga/effects";
import { patientSagas } from "./patients/patients.sagas";

export default function* rootSaga() {
  yield all([call(patientSagas)]);
}
