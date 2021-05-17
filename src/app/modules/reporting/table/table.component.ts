import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {Store} from '@ngrx/store';
import {TableCountry} from '../data/data.models';
import {AlertComponent} from '../../../shared/alert/alert.component';
import {MatDialog} from '@angular/material/dialog';
import {Subscription} from 'rxjs';

import * as FromApp from '../../../core/store/app.reducer';
import * as ReportingActions from '../store/reporting.actions';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
})
export class TableComponent implements OnInit, OnDestroy {
  displayedColumns = [
    'countryName',
    'totalConfirmed',
    'totalDeaths',
    'totalRecovered',
    'mortalityRate',
  ];
  dataSource: MatTableDataSource<TableCountry> = new MatTableDataSource();

  @ViewChild(MatPaginator, {static: false}) paginator:
    | MatPaginator
    | undefined;
  @ViewChild(MatSort, {static: false}) sort:
    | MatSort
    | undefined;

  storeSub: Subscription | null = null;

  constructor(
    private store: Store<FromApp.AppState>,
    public dialog: MatDialog
  ) {
  }

  ngOnInit(): void {
    this.store.dispatch(new ReportingActions.FetchReportTable());
    this.storeSub = this.store.select('reporting').subscribe((state) => {
      if (!state.loadingTable && state.dataTable) {
        this.dataSource = new MatTableDataSource(state.dataTable);
        if (this.paginator) {
          this.dataSource.paginator = this.paginator;
        }
        if (this.sort) {
          this.dataSource.sort = this.sort;
        }
      }
    });
  }

  ngOnDestroy(): void {
    this.store.dispatch(
      new ReportingActions.DitchReportTable()
    );
    this.storeSub?.unsubscribe();
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  private showErrorAlert(error: string): void {
    this.dialog.open(AlertComponent, {
      data: {message: error},
    });
  }
}
