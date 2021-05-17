import {User} from '../user.model';
import * as AuthActions from './auth.actions';

export interface State {
  user: User | null;
  authError: string | null;
  loading: boolean;
}

const initialState: State = {
  user: null,
  authError: null,
  loading: false,
};

export function authReducer(
  state: State = initialState,
  action: AuthActions.AuthActions
): State {
  switch (action.type) {
    case AuthActions.SIGNUP_START:
    case AuthActions.LOGIN_START:
      return {
        ...state,
        authError: null,
        loading: true
      };

    case AuthActions.AUTHENTICATE_SUCCESS:
      const user = new User(
        action.payload.email,
        action.payload.userId,
        action.payload.token,
        action.payload.expirationDate
      );
      return {
        ...state,
        user,
        authError: null,
        loading: false
      };

    case AuthActions.AUTHENTICATE_FAIL:
      return {
        ...state,
        user: null,
        authError: action.payload,
        loading: false
      };

    case AuthActions.CLEAR_ERROR:
      return {
        ...state,
        authError: null
      };

    case AuthActions.LOGOUT:
      return {
        ...state,
        user: null,
        authError: null
      };

    default:
      return state;
  }
}
