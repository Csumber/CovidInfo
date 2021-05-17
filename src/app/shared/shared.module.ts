import {NgModule} from '@angular/core';

import {LayoutModule} from '@angular/cdk/layout';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatCardModule} from '@angular/material/card';
import {MatMenuModule} from '@angular/material/menu';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatRadioModule} from '@angular/material/radio';
import {ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';

import {HttpClientModule} from '@angular/common/http';
import {MatDialogModule} from '@angular/material/dialog';
import {AlertComponent} from './alert/alert.component';
import {TrimPipe} from './pipes/trim.pipe';
import {IsNullOrEmptyPipe} from './pipes/is-null-or-empty.pipe';

@NgModule({
  declarations: [
    AlertComponent,
    TrimPipe,
    IsNullOrEmptyPipe,
  ],
  imports: [
    DragDropModule,
    HttpClientModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatDialogModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatInputModule,
    MatSelectModule,
    MatRadioModule,
    ReactiveFormsModule,
    RouterModule,
  ],
  providers: [],
  bootstrap: [],
  exports: [
    TrimPipe,
    IsNullOrEmptyPipe
  ]
})
export class SharedModule {
}
