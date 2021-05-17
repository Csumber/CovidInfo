import {Actions, createEffect, ofType} from '@ngrx/effects';
import * as ReportingActions from './reporting.actions';
import {FetchReportChart, QueryData} from './reporting.actions';
import {HttpClient, HttpErrorResponse, HttpParams,} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {
  ChartCountryResponse,
  ChartEntry,
  ChartLine,
  ChartWorldResponse,
  CountriesSummarizedTableResponse,
  MapDataEntry,
  MapResponse,
  TableCountry
} from '../data/data.models';
import {Observable, of} from 'rxjs';
import {Router} from '@angular/router';
import {Store} from '@ngrx/store';
import {catchError, map, switchMap, withLatestFrom} from 'rxjs/operators';
import {environment} from '../../../../environments/environment';
import * as FromApp from '../../../core/store/app.reducer';

const handleError = (errorResponse: HttpErrorResponse) => {
  let errorMessage = 'An unknown error occurred!';
  if (!errorResponse.error || !errorResponse.error.error) {
    return of(new ReportingActions.FailReport(errorMessage));
  }
  switch (errorResponse.error.error) {
    case 'ERR_FAILED':
      errorMessage = 'There has been a network error.';
      break;
    case 'NO_DATA':
      errorMessage = 'We could not find any data with the given parameters.';
      break;
  }
  return of(new ReportingActions.FailReport(errorMessage));
};

@Injectable()
export class ReportingEffects {
  fetchChartDataEffect = createEffect(() => {
    return this.actions$.pipe(
      ofType(ReportingActions.FETCH_REPORT_CHART),
      withLatestFrom(this.store.select('reporting')),
      switchMap(([actionData, state]) => {
        return this.fetchChartFromAPI((actionData as FetchReportChart).payload);
      }),
      map((response: ChartCountryResponse[] | ChartWorldResponse[]) => {
        if (!response || response.length < 1) {
          return new ReportingActions.FailReport(
            'No data available with the given parameters'
          );
        } else {
          if (response[0].hasOwnProperty('ID')) {
            return new ReportingActions.SetReportChart(
              this.formatDataCountry(response as ChartCountryResponse[])
            );
          } else {
            return new ReportingActions.SetReportChart(
              this.formatDataWorld(response as ChartWorldResponse[])
            );
          }
        }
      }),
      catchError((errorResponse: HttpErrorResponse) => {
        return handleError(errorResponse);
      })
    );
  });
  fetchTableDataEffect = createEffect(() => {
    return this.actions$.pipe(
      ofType(ReportingActions.FETCH_REPORT_TABLE),
      withLatestFrom(this.store.select('reporting')),
      switchMap(([actionData, state]) => {
        return this.fetchTableFromAPI();
      }),
      map((response: CountriesSummarizedTableResponse) => {
        if (!response) {
          return new ReportingActions.FailReport('Failed to load data');
        } else {
          return new ReportingActions.SetReportTable(
            this.formatDataTable(response)
          );
        }
      }),
      catchError((errorResponse: HttpErrorResponse) => {
        return handleError(errorResponse);
      })
    );
  });
  fetchMapDataEffect = createEffect(() => {
    return this.actions$.pipe(
      ofType(ReportingActions.FETCH_REPORT_MAP),
      withLatestFrom(this.store.select('reporting')),
      switchMap(([actionData, state]) => {
        return this.fetchMapFromAPI();
      }),
      map((response: MapResponse[]) => {
        if (!response) {
          return new ReportingActions.FailReport('Failed to load data');
        } else {
          return new ReportingActions.SetReportMap(
            this.formatDataMap(response)
          );
        }
      }),
      catchError((errorResponse: HttpErrorResponse) => {
        return handleError(errorResponse);
      })
    );
  });

  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private router: Router,
    private store: Store<FromApp.AppState>
  ) {
  }

  private static convertDateYYYYMMDD(
    rawDate: Date,
    showYear: boolean,
    showMonth: boolean,
    showDay: boolean
  ): string {
    const dd = showDay ? String(rawDate.getDate()).padStart(2, '0') : '';
    const mm = showMonth
      ? String(rawDate.getMonth() + 1).padStart(2, '0') + '-'
      : '';
    const yyyy = showYear ? rawDate.getFullYear() + '-' : '';
    return yyyy + mm + dd;
  }

  private static convertDateMMDDYYY(rawDate: Date): string {
    const dd = String(rawDate.getDate()).padStart(2, '0');
    const mm = String(rawDate.getMonth() + 1).padStart(2, '0');
    const yyyy = rawDate.getFullYear();
    return mm + '-' + dd + '-' + yyyy;
  }

  public formatDataCountry(d: ChartCountryResponse[]): ChartLine[] {
    const data: ChartLine[] = [];
    d.sort((a, b) => {
      return new Date(a.Date).valueOf() - new Date(b.Date).valueOf();
    });
    const active: ChartEntry[] = [];
    const confirmed: ChartEntry[] = [];
    const deaths: ChartEntry[] = [];
    const recovered: ChartEntry[] = [];
    for (const r of d) {
      if (r.Province.length <= 0) {
        const date = ReportingEffects.convertDateYYYYMMDD(
          new Date(r.Date),
          false,
          true,
          true
        );
        // The API makes mistakes sometimes, thus I chose to calculate this value
        active.push({
          name: date,
          value: r.Confirmed - r.Recovered - r.Deaths,
        });
        confirmed.push({name: date, value: r.Confirmed});
        deaths.push({name: date, value: r.Deaths});
        recovered.push({name: date, value: r.Recovered});
      }
    }
    data.push({
      name: 'Total confirmed',
      series: confirmed,
    });
    data.push({
      name: 'Active',
      series: active,
    });
    data.push({
      name: 'Total recovered',
      series: recovered,
    });
    data.push({
      name: 'Total deaths',
      series: deaths,
    });
    return data;
  }

  public formatDataWorld(d: ChartWorldResponse[]): ChartLine[] {
    const data: ChartLine[] = [];
    d.sort((a, b) => {
      return new Date(a.Date).valueOf() - new Date(b.Date).valueOf();
    });
    const active: ChartEntry[] = [];
    const confirmed: ChartEntry[] = [];
    const deaths: ChartEntry[] = [];
    const recovered: ChartEntry[] = [];
    for (const r of d) {
      const date = ReportingEffects.convertDateYYYYMMDD(
        new Date(r.Date),
        false,
        true,
        true
      );

      // The API makes mistakes sometimes, thus I chose to calculate this value, instead of using the given
      active.push({
        name: date,
        value: r.TotalConfirmed - r.TotalRecovered - r.TotalDeaths,
      });
      confirmed.push({name: date, value: r.TotalConfirmed});
      deaths.push({name: date, value: r.TotalDeaths});
      recovered.push({name: date, value: r.TotalRecovered});
    }
    data.push({
      name: 'Total confirmed',
      series: confirmed,
    });
    data.push({
      name: 'Active',
      series: active,
    });
    data.push({
      name: 'Total recovered',
      series: recovered,
    });
    data.push({
      name: 'Total deaths',
      series: deaths,
    });
    return data;
  }

  public formatDataTable(d: CountriesSummarizedTableResponse): TableCountry[] {
    const data: TableCountry[] = [];
    for (const r of d.Countries) {
      data.push({
        countryName: r.Country,
        totalConfirmed: r.TotalConfirmed,
        totalDeaths: r.TotalDeaths,
        totalRecovered: r.TotalRecovered,
        mortalityRate: (r.TotalDeaths / r.TotalConfirmed) * 100,
      });
    }

    return data;
  }

  public formatDataMap(d: MapResponse[]): MapDataEntry[] {
    const data: MapDataEntry[] = [];
    for (const r of d) {
      data.push({
        lat: +r.lat,
        long: +r.long,
        confirmed: +r.confirmed,
        deaths: +r.deaths,
        recovered: +r.recovered,
        active: +r.active,
        combinedKey: r.combinedKey,
      });
    }
    return data;
  }

  private fetchChartFromAPI(
    queryData: QueryData
  ): Observable<ChartCountryResponse[] | ChartWorldResponse[]> {
    const params: HttpParams = new HttpParams()
      .append(
        'from',
        ReportingEffects.convertDateYYYYMMDD(queryData.from, true, true, true)
      )
      .append(
        'to',
        ReportingEffects.convertDateYYYYMMDD(queryData.to, true, true, true)
      );
    if (queryData.region === 'world') {
      return this.http.get<ChartWorldResponse[]>(
        environment.CovidAPIURL + `/world`,
        {params}
      );
    }
    return this.http.get<ChartCountryResponse[]>(
      environment.CovidAPIURL + `/country/${queryData.region}`,
      {params}
    );
  }

  private fetchTableFromAPI(): Observable<CountriesSummarizedTableResponse> {
    return this.http.get<CountriesSummarizedTableResponse>(
      environment.CovidAPIURL + `/summary`
    );
  }

  private fetchMapFromAPI(): Observable<MapResponse[]> {
    const yesterday = new Date(new Date().valueOf() - 24 * 60 * 60 * 1000);
    return this.http.get<MapResponse[]>(
      environment.CovidAPIURLMAPDAILY +
      `/${ReportingEffects.convertDateMMDDYYY(yesterday)}`
    );
  }
}
