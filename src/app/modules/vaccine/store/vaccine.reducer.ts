import {VaccineFormModel} from '../vaccineFormModel';

import * as VaccineActions from './vaccine.actions';

export interface State {
  formError: boolean;
  formData: VaccineFormModel | null;
  loading: boolean;
}

const initialState: State = {
  formError: false,
  formData: null,
  loading: false,
};

export function vaccineReducer(
  state: State = initialState,
  action: VaccineActions.VaccineActions
): State {
  switch (action.type) {
    case VaccineActions.FETCH_VACCINE_FORM:
      return {
        ...state,
        loading: true,
        formError: false,
      };

    case VaccineActions.SET_VACCINE_FORM:
      if (!action.payload) {
        return state;
      }
      return {
        ...state,
        formData: action.payload,
        loading: false,
        formError: false,
      };
    case VaccineActions.FAIL_VACCINE_FORM:
      return {
        ...state,
        formData: null,
        formError: true,
        loading: false,
      };
    default:
      return state;
  }
}
