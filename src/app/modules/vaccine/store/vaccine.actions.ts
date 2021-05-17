import {Action} from '@ngrx/store';
import {VaccineFormModel} from '../vaccineFormModel';

export const FETCH_VACCINE_FORM = '[FAQ] Fetch Vaccine Form';
export const SET_VACCINE_FORM = '[FAQ] Set Vaccine Form';
export const STORE_VACCINE_FORM = '[FAQ] Store Vaccine Form';
export const FAIL_VACCINE_FORM = '[FAQ] Fail Vaccine Form';

export class FetchVaccineForm implements Action {
  readonly type = FETCH_VACCINE_FORM;

  constructor(public payload: string) {
  }
}

export class SetVaccineForm implements Action {
  readonly type = SET_VACCINE_FORM;

  constructor(public payload: VaccineFormModel | null) {
  }
}

export class StoreVaccineForm implements Action {
  readonly type = STORE_VACCINE_FORM;

  constructor(public payload: VaccineFormModel) {
  }
}

export class FailVaccineForm implements Action {
  readonly type = FAIL_VACCINE_FORM;
}

export type VaccineActions = FetchVaccineForm | SetVaccineForm | StoreVaccineForm | FailVaccineForm;
