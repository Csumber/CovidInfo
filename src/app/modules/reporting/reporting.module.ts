import {NgModule} from '@angular/core';

import {ChartComponent} from './chart/chart.component';
import {MapComponent} from './map/map.component';
import {ReportingComponent} from './reporting/reporting.component';
import {TableComponent} from './table/table.component';

import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {MatCardModule} from '@angular/material/card';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatDividerModule} from '@angular/material/divider';
import {MatInputModule} from '@angular/material/input';
import {MatNativeDateModule} from '@angular/material/core';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatSelectModule} from '@angular/material/select';
import {MatSortModule} from '@angular/material/sort';
import {MatTableModule} from '@angular/material/table';
import {MatTabsModule} from '@angular/material/tabs';
import {MatTooltipModule} from '@angular/material/tooltip';
import {NgxChartsModule} from '@swimlane/ngx-charts';
import {ReportingRoutingModule} from './reporting-routing.module';

@NgModule({
  declarations: [
    ChartComponent,
    MapComponent,
    ReportingComponent,
    TableComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    MatCardModule,
    MatDatepickerModule,
    MatDividerModule,
    MatInputModule,
    MatNativeDateModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatTooltipModule,
    NgxChartsModule,
    ReactiveFormsModule,
    ReactiveFormsModule,
    ReportingRoutingModule,
  ],
})
export class ReportingModule {
}
