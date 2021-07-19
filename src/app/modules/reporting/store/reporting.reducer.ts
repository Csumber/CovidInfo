import { ChartLine, MapDataEntry, TableCountry } from '../data/data.models';

import * as ReportingActions from './reporting.actions';
import { FetchDataError } from '../../../shared/errors/fetch-data-error';
import { NoDataAvailableError } from '../../../shared/errors/no-data-available-error';
import { BadRequestError } from '../../../shared/errors/bad-request-error';
import { NotFoundError } from '../../../shared/errors/not-found-error';

export interface State {
  dataChart: ChartLine[];
  loadingChart: boolean;
  dataTable: TableCountry[];
  loadingTable: boolean;
  dataMap: MapDataEntry[];
  loadingMap: boolean;
  error: string | null;
}

const initialState: State = {
  dataChart: [],
  loadingChart: false,
  dataTable: [],
  loadingTable: false,
  dataMap: [],
  loadingMap: false,
  error: null,
};

export function ReportingReducer(
  state: State = initialState,
  action: ReportingActions.ReportingActions
): State {
  switch (action.type) {
    case ReportingActions.FETCH_REPORT_CHART:
      return {
        ...state,
        loadingChart: true,
        error: null,
      };
    case ReportingActions.SET_REPORT_CHART:
      if (!action.payload) {
        return state;
      }
      return {
        ...state,
        dataChart: action.payload,
        loadingChart: false,
        error: null,
      };
    case ReportingActions.DITCH_REPORT_CHART:
      return {
        ...state,
        dataChart: [],
        loadingChart: false,
        error: null,
      };
    case ReportingActions.FETCH_REPORT_TABLE:
      return {
        ...state,
        loadingTable: true,
        error: null,
      };
    case ReportingActions.SET_REPORT_TABLE:
      if (!action.payload) {
        return state;
      }
      return {
        ...state,
        dataTable: action.payload,
        loadingTable: false,
        error: null,
      };
    case ReportingActions.DITCH_REPORT_TABLE:
      return {
        ...state,
        dataTable: [],
        loadingTable: false,
        error: null,
      };
    case ReportingActions.FETCH_REPORT_MAP:
      return {
        ...state,
        loadingMap: true,
        error: null,
      };
    case ReportingActions.SET_REPORT_MAP:
      if (!action.payload) {
        return state;
      }
      return {
        ...state,
        dataMap: action.payload,
        loadingMap: false,
        error: null,
      };
    case ReportingActions.DITCH_REPORT_MAP:
      return {
        ...state,
        dataMap: [],
        loadingMap: false,
        error: null,
      };
    case ReportingActions.FAIL_REPORT:
      let errorMessage = 'An error occurred';
      if (action.payload instanceof FetchDataError) {
        errorMessage = 'Could not fetch data.';
      }
      if (action.payload instanceof NoDataAvailableError) {
        errorMessage = 'No data available with the given parameters.';
      }
      if (action.payload instanceof BadRequestError) {
        errorMessage = 'Bad request error.';
      }
      if (action.payload instanceof NotFoundError) {
        errorMessage = 'Resource not found.';
      }
      return {
        ...state,
        dataChart: [],
        dataTable: [],
        dataMap: [],
        error: errorMessage,
        loadingChart: false,
        loadingTable: false,
        loadingMap: false,
      };
    default:
      return state;
  }
}
