import { Action } from '@ngrx/store';
import { VaccineFormModel } from '../vaccineFormModel';

export const FETCH_VACCINE_FORM = '[Vaccine] Fetch Vaccine Form';
export const SET_VACCINE_FORM = '[Vaccine] Set Vaccine Form';
export const STORE_VACCINE_FORM = '[Vaccine] Store Vaccine Form';
export const DELETE_VACCINE_FORM = '[Vaccine] Delete Vaccine Form';
export const FAIL_VACCINE_FORM = '[Vaccine] Fail Vaccine Form';

export class FetchVaccineForm implements Action {
  readonly type = FETCH_VACCINE_FORM;

  constructor(public payload: string) {}
}

export class SetVaccineForm implements Action {
  readonly type = SET_VACCINE_FORM;

  constructor(public payload: VaccineFormModel | null) {}
}

export class StoreVaccineForm implements Action {
  readonly type = STORE_VACCINE_FORM;

  constructor(public payload: VaccineFormModel) {}
}

export class DeleteVaccineForm implements Action {
  readonly type = DELETE_VACCINE_FORM;

  constructor(public payload: string) {}
}

export class FailVaccineForm implements Action {
  readonly type = FAIL_VACCINE_FORM;
}

export type VaccineActions =
  | FetchVaccineForm
  | SetVaccineForm
  | StoreVaccineForm
  | DeleteVaccineForm
  | FailVaccineForm;
