import {NgModule} from '@angular/core';
import {ReportingComponent} from './reporting/reporting.component';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [{path: '', component: ReportingComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReportingRoutingModule {
}
