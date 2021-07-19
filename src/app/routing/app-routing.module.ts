import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'home',
    loadChildren: () =>
      import('../modules/home/home.module').then((module) => module.HomeModule),
  },
  {
    path: 'authentication',
    loadChildren: () =>
      import('../modules/authentication/authentication.module').then(
        (module) => module.AuthenticationModule
      ),
  },
  {
    path: 'news',
    loadChildren: () =>
      import('../modules/news/news.module').then((module) => module.NewsModule),
  },
  {
    path: 'reporting',
    loadChildren: () =>
      import('../modules/reporting/reporting.module').then(
        (module) => module.ReportingModule
      ),
  },
  {
    path: 'vaccine',
    loadChildren: () =>
      import('../modules/vaccine/vaccine.module').then(
        (module) => module.VaccineModule
      ),
  },
  {
    path: 'faq',
    loadChildren: () =>
      import('../modules/faq/faq.module').then((module) => module.FAQModule),
  },
  {
    path: 'licensing',
    loadChildren: () =>
      import('../modules/licensing/licensing.module').then(
        (module) => module.LicensingModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
