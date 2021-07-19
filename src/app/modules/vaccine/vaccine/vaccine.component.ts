import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { Store } from '@ngrx/store';
import { VaccineFormModel } from '../vaccineFormModel';
import { Subscription } from 'rxjs';
import { AlertComponent } from 'src/app/shared/alert/alert.component';
import { MatDialog } from '@angular/material/dialog';

import * as FromApp from '../../../core/store/app.reducer';
import * as VaccineActions from '../store/vaccine.actions';

@Component({
  selector: 'app-vaccine',
  templateUrl: './vaccine.component.html',
  styleUrls: ['./vaccine.component.css'],
})
export class VaccineComponent implements OnInit, OnDestroy {
  public readonly vaccinesMinimumNumber = 3;

  public authSub: Subscription | null = null;
  public vaccineSub: Subscription | null = null;

  public vaccineOptions = [
    'AstraZeneca',
    'BioNTech',
    'Johnson & Johnson',
    'Moderna',
    'Pfizer',
    'Sinopharm',
    'Sputnik V',
  ];

  public vaccineForm: FormGroup = new FormGroup({});
  public prefetchedData: VaccineFormModel | null = null;

  private email = '';
  private uid = '';
  private error = false;

  constructor(
    private store: Store<FromApp.AppState>,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.authSub = this.store.select('auth').subscribe((authData) => {
      this.email = authData.user?.email ? authData.user?.email : '';
      this.uid = authData.user?.id ? authData.user?.id : '';
    });

    this.resetFormData();
    this.store.dispatch(new VaccineActions.FetchVaccineForm(this.uid));

    this.vaccineSub = this.store.select('vaccine').subscribe((s) => {
      if (!s.loading) {
        this.prefetchedData = s.formData;
        if (!!this.prefetchedData) {
          this.setFormData();
        } else {
          this.resetFormData();
        }
      }
      this.error = s.formError;
      if (this.error) {
        this.showErrorAlert();
      }
    });
  }

  ngOnDestroy(): void {
    this.authSub?.unsubscribe();
    this.vaccineSub?.unsubscribe();
  }

  setFormData(): void {
    if (this.prefetchedData) {
      this.vaccineForm = new FormGroup({
        name: new FormControl(
          { value: this.prefetchedData.name, disabled: true },
          []
        ),
        gender: new FormControl(
          { value: this.prefetchedData.gender, disabled: true },
          []
        ),
        birthday: new FormControl(
          { value: this.prefetchedData.birthday, disabled: true },
          []
        ),
        email: new FormControl({ value: this.email, disabled: true }, []),
        phone: new FormControl(
          { value: this.prefetchedData.phone, disabled: true },
          []
        ),
        socialSecurityNumber: new FormControl(
          { value: this.prefetchedData.socialSecurityNumber, disabled: true },
          []
        ),
        symptoms: new FormControl(
          { value: this.prefetchedData.symptoms, disabled: true },
          []
        ),
        vaccines: new FormControl(
          { value: this.prefetchedData.vaccines, disabled: true },
          []
        ),
        terms: new FormControl(
          { value: this.prefetchedData.terms, disabled: true },
          []
        ),
      });
    }
  }

  resetFormData(): void {
    this.vaccineForm = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      gender: new FormControl(null, [Validators.required]),
      birthday: new FormControl(null, [Validators.required]),
      email: new FormControl({ value: this.email, disabled: !!this.email }, [
        Validators.required,
        Validators.email,
      ]),
      phone: new FormControl(null, [
        Validators.required,
        Validators.pattern(/[- +()0-9]+/),
      ]),
      socialSecurityNumber: new FormControl(null, [
        Validators.required,
        Validators.pattern(/[- 0-9]+/),
      ]),
      symptoms: new FormControl(null, [Validators.required]),
      vaccines: new FormControl(null, [
        createVaccineMinimumValidator(this.vaccinesMinimumNumber),
      ]),
      terms: new FormControl(null, [Validators.requiredTrue]),
    });
    this.vaccineOptions = [
      'AstraZeneca',
      'BioNTech',
      'Johnson & Johnson',
      'Moderna',
      'Pfizer',
      'Sinopharm',
      'Sputnik V',
    ];
  }

  onSubmit(): void {
    const vaccineFormModel = new VaccineFormModel(
      this.uid,
      this.vaccineForm.value.birthday,
      this.email,
      this.vaccineForm.value.gender,
      this.vaccineForm.value.name,
      this.vaccineForm.value.phone,
      this.vaccineForm.value.socialSecurityNumber,
      this.vaccineForm.value.symptoms,
      this.vaccineForm.value.terms,
      this.vaccineForm.value.vaccines
    );

    this.store.dispatch(new VaccineActions.StoreVaccineForm(vaccineFormModel));
    this.store.dispatch(new VaccineActions.FetchVaccineForm(this.uid));
    this.store.dispatch(new VaccineActions.SetVaccineForm(vaccineFormModel));
  }

  onDelete(): void {
    this.store.dispatch(new VaccineActions.DeleteVaccineForm(this.uid));
  }

  private showErrorAlert(): void {
    this.dialog.open(AlertComponent, {
      data: { message: 'Unfortunately we could not submit your form.' },
    });
  }
}

export function createVaccineMinimumValidator(
  minValue: number
): (control: AbstractControl) => ValidationErrors | null {
  return function validateMinimumVaccines(
    control: AbstractControl
  ): { [key: string]: any } | null {
    const err = {
      tooFewVaccinesError: {
        given: control.value?.length,
        min: minValue,
      },
    };

    return control.value?.length < +minValue ? err : null;
  };
}
