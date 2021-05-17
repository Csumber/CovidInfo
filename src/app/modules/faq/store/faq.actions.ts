import {Action} from '@ngrx/store';
import {Category} from '../question.model';

export const FETCH_CATEGORIES = '[FAQ] Fetch Categories';
export const SET_CATEGORIES = '[FAQ] Set Categories';
export const STORE_CATEGORIES = '[FAQ] Store Categories';

export class FetchCategories implements Action {
  readonly type = FETCH_CATEGORIES;

  constructor() {
  }
}

export class SetCategories implements Action {
  readonly type = SET_CATEGORIES;

  constructor(public payload: Category[]) {
  }
}

export class StoreCategories implements Action {
  readonly type = STORE_CATEGORIES;
}

export type FaqActions = FetchCategories | SetCategories | StoreCategories;
