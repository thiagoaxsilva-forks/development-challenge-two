import PatientsActionsTypes from "./patients.types";

const INITIAL_STATE = {
  allPatients: [],
  get: {
    loading: false,
    error: null,
  },
  post: {
    loading: false,
    error: null,
  },
  patch: {
    loading: false,
    error: null,
  },
  delete: {
    loading: false,
    error: null,
  },
};

const patientsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case PatientsActionsTypes.GET_ALL_PATIENTS_START:
      return {
        ...state,
        get: {
          loading: true,
          error: null,
        },
      };
    case PatientsActionsTypes.PATCH_A_PATIENT_START:
      return {
        ...state,
        patch: {
          loading: true,
          error: null,
        },
      };
    case PatientsActionsTypes.POST_A_PATIENT_START:
      return {
        ...state,
        post: {
          loading: true,
          error: null,
        },
      };
    case PatientsActionsTypes.DELETE_A_PATIENT_START:
      return {
        ...state,
        delete: {
          loading: true,
          error: null,
        },
      };
    case PatientsActionsTypes.GET_ALL_PATIENTS_SUCCESS:
      return {
        ...state,
        get: {
          loading: false,
          error: null,
        },
        allPatients: action.payload,
      };
    default:
      return state;
  }
};

export default patientsReducer;
