import * as AuthActions from './news.actions';
import {Article} from '../article.model';

export interface State {
  articles: Article[] | null;
  loading: boolean;
}

const initialState: State = {
  articles: null,
  loading: false,
};

export function newsReducer(
  state: State = initialState,
  action: AuthActions.NewsActions
): State {
  switch (action.type) {
    case AuthActions.FETCH_ARTICLES:
      return {
        ...state,
        loading: true
      };

    case AuthActions.SET_ARTICLES:
      return {
        ...state,
        articles: action.payload,
        loading: false
      };
    default:
      return state;
  }
}
