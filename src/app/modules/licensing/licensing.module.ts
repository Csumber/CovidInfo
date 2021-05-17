import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {LicensingRoutingModule} from './licensing-routing.module';
import {LicensingComponent} from './licensing/licensing.component';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {MatCardModule} from '@angular/material/card';
import {MatDividerModule} from '@angular/material/divider';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';

@NgModule({
  declarations: [LicensingComponent],
  imports: [
    LicensingRoutingModule,
    CommonModule,
    DragDropModule,
    MatCardModule,
    MatDividerModule,
    MatIconModule,
    MatListModule,
  ],
})
export class LicensingModule {
}
