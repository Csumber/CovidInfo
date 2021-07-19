import { Action } from '@ngrx/store';
import { Article } from '../article.model';

export const FETCH_ARTICLES = '[News] Fetch Articles';
export const SET_ARTICLES = '[News] Set Articles';

export class FetchArticles implements Action {
  readonly type = FETCH_ARTICLES;

  constructor() {}
}

export class SetArticles implements Action {
  readonly type = SET_ARTICLES;

  constructor(public payload: Article[]) {}
}

export type NewsActions = FetchArticles | SetArticles;
