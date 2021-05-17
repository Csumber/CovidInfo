import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {HomeRoutingModule} from './home-routing.module';
import {HomeComponent} from './home/home.component';
import {BannerComponent} from './banner/banner.component';
import {HomeCardComponent} from './card/home-card.component';

@NgModule({
  declarations: [HomeComponent, BannerComponent, HomeCardComponent],
  imports: [
    HomeRoutingModule,
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
  ],
})
export class HomeModule {
}
