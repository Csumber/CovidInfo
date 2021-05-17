import {ChartLine, MapDataEntry, TableCountry} from '../data/data.models';

import * as ReportingActions from './reporting.actions';

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
      return {
        ...state,
        dataChart: [],
        dataTable: [],
        dataMap: [],
        error: action.payload,
        loadingChart: false,
        loadingTable: false,
        loadingMap: false,
      };
    default:
      return state;
  }
}
