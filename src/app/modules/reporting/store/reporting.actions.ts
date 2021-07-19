import { Action } from '@ngrx/store';
import { ChartLine, MapDataEntry, TableCountry } from '../data/data.models';
import { AppError } from '../../../shared/errors/app-error';

export const FETCH_REPORT_CHART = '[REPORTING] Fetch Report Chart';
export const SET_REPORT_CHART = '[REPORTING] Set Report Chart';
export const DITCH_REPORT_CHART = '[REPORTING] Ditch Report Chart';
export const FETCH_REPORT_TABLE = '[REPORTING] Fetch Report Table';
export const SET_REPORT_TABLE = '[REPORTING] Set Report Table';
export const DITCH_REPORT_TABLE = '[REPORTING] Ditch Report Table';
export const FETCH_REPORT_MAP = '[REPORTING] Fetch Report Map';
export const SET_REPORT_MAP = '[REPORTING] Set Report Map';
export const DITCH_REPORT_MAP = '[REPORTING] Ditch Report Map';
export const FAIL_REPORT = '[REPORTING] Fail Report';

export interface QueryData {
  region: string;
  from: Date;
  to: Date;
}

export class FetchReportChart implements Action {
  readonly type = FETCH_REPORT_CHART;

  constructor(public payload: QueryData) {}
}

export class SetReportChart implements Action {
  readonly type = SET_REPORT_CHART;

  constructor(public payload: ChartLine[]) {}
}

export class DitchReportChart implements Action {
  readonly type = DITCH_REPORT_CHART;
}

export class FetchReportTable implements Action {
  readonly type = FETCH_REPORT_TABLE;
}

export class SetReportTable implements Action {
  readonly type = SET_REPORT_TABLE;

  constructor(public payload: TableCountry[]) {}
}

export class DitchReportTable implements Action {
  readonly type = DITCH_REPORT_TABLE;
}

export class FetchReportMap implements Action {
  readonly type = FETCH_REPORT_MAP;
}

export class SetReportMap implements Action {
  readonly type = SET_REPORT_MAP;

  constructor(public payload: MapDataEntry[]) {}
}

export class DitchReportMap implements Action {
  readonly type = DITCH_REPORT_MAP;
}

export class FailReport implements Action {
  readonly type = FAIL_REPORT;

  constructor(public payload: AppError) {}
}

export type ReportingActions =
  | FetchReportChart
  | SetReportChart
  | DitchReportChart
  | FetchReportTable
  | SetReportTable
  | DitchReportTable
  | FetchReportMap
  | SetReportMap
  | DitchReportMap
  | FailReport;
