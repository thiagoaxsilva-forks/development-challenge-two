import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import patientsReducer from "./patients/patients.reducer";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["patients"],
};

const rootReducer = combineReducers({
  patients: patientsReducer,
});

export default persistReducer(persistConfig, rootReducer);
