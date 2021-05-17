import {ActionReducerMap} from '@ngrx/store';

import * as FromAuth from '../../modules/authentication/store/auth.reducer';
import * as FromFaq from '../../modules/faq/store/faq.reducer';
import * as FromNews from '../../modules/news/store/news.reducer';
import * as FromReporting from '../../modules/reporting/store/reporting.reducer';
import * as FromVaccine from '../../modules/vaccine/store/vaccine.reducer';

export interface AppState {
  auth: FromAuth.State;
  faq: FromFaq.State;
  news: FromNews.State;
  reporting: FromReporting.State;
  vaccine: FromVaccine.State;
}

export const appReducer: ActionReducerMap<AppState, any> = {
  auth: FromAuth.authReducer,
  faq: FromFaq.faqReducer,
  news: FromNews.newsReducer,
  reporting: FromReporting.ReportingReducer,
  vaccine: FromVaccine.vaccineReducer,
};
