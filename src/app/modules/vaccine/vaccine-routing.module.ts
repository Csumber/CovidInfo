import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {VaccineComponent} from './vaccine/vaccine.component';
import {AuthGuard} from '../authentication/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: VaccineComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({imports: [RouterModule.forChild(routes)], exports: [RouterModule]})
export class VaccineRoutingModule {
}
