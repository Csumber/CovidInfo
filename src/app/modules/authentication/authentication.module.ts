import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatTreeModule} from '@angular/material/tree';
import {ReactiveFormsModule} from '@angular/forms';
import {MatCardModule} from '@angular/material/card';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatInputModule} from '@angular/material/input';
import {MatRadioModule} from '@angular/material/radio';
import {MatSelectModule} from '@angular/material/select';
import {AuthenticationComponent} from './authentication/authentication.component';
import {AuthenticationRoutingModule} from './authentication-routing.module';

@NgModule({
  declarations: [AuthenticationComponent],
  imports: [
    AuthenticationRoutingModule,
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatTreeModule,
    MatCardModule,
    MatExpansionModule,
    MatInputModule,
    MatSelectModule,
    MatRadioModule,
    ReactiveFormsModule,
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatSelectModule,
    MatRadioModule,
    ReactiveFormsModule,
  ],
})
export class AuthenticationModule {
}
