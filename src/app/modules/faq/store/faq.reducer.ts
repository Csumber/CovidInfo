import {Category} from '../question.model';

import * as AuthActions from './faq.actions';

export interface State {
  categories: Category[] | null;
  loading: boolean;
}

const initialState: State = {
  categories: null,
  loading: false,
};

export function faqReducer(
  state: State = initialState,
  action: AuthActions.FaqActions
): State {
  switch (action.type) {
    case AuthActions.FETCH_CATEGORIES:
      return {
        ...state,
        loading: true
      };

    case AuthActions.SET_CATEGORIES:
      return {
        ...state,
        categories: action.payload,
        loading: false
      };
    default:
      return state;
  }
}
