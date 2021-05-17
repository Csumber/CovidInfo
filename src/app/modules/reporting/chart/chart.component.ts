import {Component, OnDestroy, OnInit} from '@angular/core';
import {ChartLine} from '../data/data.models';
import {countries, Country} from '../data/countries';
import {AbstractControl, FormControl, FormGroup, ValidationErrors, Validators,} from '@angular/forms';
import {Store} from '@ngrx/store';
import {AlertComponent} from '../../../shared/alert/alert.component';
import {MatDialog} from '@angular/material/dialog';

import * as fromApp from '../../../core/store/app.reducer';
import * as ReportingActions from '../store/reporting.actions';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css'],
})
export class ChartComponent implements OnInit, OnDestroy {
  multi: ChartLine[] = [];
  countries: Country[] = [];
  loading = false;
  queryForm: FormGroup = new FormGroup({});
  legend = true;
  legendPosition = 'right'; // This should be below, but it causes the chart to bug
  xAxis = true;
  yAxis = true;
  showYAxisLabel = true;
  showXAxisLabel = true;
  xAxisLabel = 'Date';
  yAxisLabel = 'Cases';
  timeline = false;

  storeSub: Subscription | null = null;
  intervalSub: Subscription | null = null;
  changesSub: Subscription | null = null;

  constructor(
    private store: Store<fromApp.AppState>,
    public dialog: MatDialog
  ) {
  }

  ngOnInit(): void {
    this.initForm();
    this.store.dispatch(
      new ReportingActions.FetchReportChart({
        region: this.queryForm.value.region,
        from: this.queryForm.value.range.from,
        to: this.queryForm.value.range.to,
      })
    );
    this.storeSub = this.store.select('reporting').subscribe((report) => {
      this.loading = report.loadingChart;
      if (!this.loading && report.dataChart) {
        this.multi = report.dataChart;
      }
      if (report.error) {
        this.showErrorAlert(report.error);
      }
    });
  }

  ngOnDestroy(): void {
    this.store.dispatch(
      new ReportingActions.DitchReportChart()
    );
    this.storeSub?.unsubscribe();
    this.intervalSub?.unsubscribe();
    this.changesSub?.unsubscribe();

  }

  initForm(): void {
    this.countries = countries;

    const defaultDaysBefore = '7';
    const currentDate = new Date();
    const defaultToDate = new Date(currentDate.valueOf() - 1000 * 60 * 60 * 24);
    const defaultFromDate = new Date(
      defaultToDate.valueOf() - 1000 * 60 * 60 * 24 * +defaultDaysBefore
    );

    this.queryForm = new FormGroup({
      region: new FormControl('world', [Validators.required]),
      interval: new FormControl(defaultDaysBefore, [Validators.required]),
      range: new FormGroup({
        from: new FormControl(defaultFromDate, [
          Validators.required,
          createDateMinValidator(new Date('2020-01-22')),
        ]),
        to: new FormControl(defaultToDate, [
          Validators.required,
          createDateMaxValidator(new Date()),
        ]),
      }),
    });

    this.intervalSub = this.queryForm.controls['interval'].valueChanges.subscribe((next) => {
      if (next !== 'custom') {
        const newToDate = new Date(currentDate.valueOf() - 1000 * 60 * 60 * 24);
        const newFromDate = new Date(
          defaultToDate.valueOf() - 1000 * 60 * 60 * 24 * +next
        );

        this.queryForm.setControl(
          'range',
          new FormGroup({
            from: new FormControl(newFromDate, [
              Validators.required,
              createDateMinValidator(new Date('2020-01-22')),
            ]),
            to: new FormControl(newToDate, [
              Validators.required,
              createDateMaxValidator(new Date()),
            ]),
          })
        );
      }
    });

    this.changesSub = this.queryForm.valueChanges.subscribe((val) => {
      if (this.queryForm.valid) {
        this.store.dispatch(
          new ReportingActions.FetchReportChart({
            region: this.queryForm.value.region,
            from: this.queryForm.value.range.from,
            to: this.queryForm.value.range.to,
          })
        );
      }
    });
  }

  private showErrorAlert(error: string): void {
    this.dialog.open(AlertComponent, {
      data: {message: error},
    });
  }
}

export function createDateMaxValidator(
  maxDate: Date
): (control: AbstractControl) => ValidationErrors | null {
  return function validateMaximumVaccines(
    control: AbstractControl
  ): { [key: string]: any } | null {
    const err = {
      tooLargeDateError: {
        given: control.value,
        max: maxDate,
      },
    };
    return new Date(control.value) > maxDate ? err : null;
  };
}

export function createDateMinValidator(
  minDate: Date
): (control: AbstractControl) => ValidationErrors | null {
  return function validateMaximumVaccines(
    control: AbstractControl
  ): { [key: string]: any } | null {
    const err = {
      tooLittleDateError: {
        given: control.value,
        min: minDate,
      },
    };
    return new Date(control.value) < minDate ? err : null;
  };
}
