import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import * as fromApp from './core/store/app.reducer';
import * as AuthActions from './modules/authentication/store/auth.actions';
import { ThemeService } from './core/frame/theme.service';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'Covid info - Demo';
  isDarkTheme: Observable<boolean> = new Observable();

  constructor(
    private store: Store<fromApp.AppState>,
    private themeService: ThemeService
  ) {}

  ngOnInit(): void {
    this.store.dispatch(new AuthActions.AutoLogin());
    this.isDarkTheme = this.themeService.isDarkTheme;
  }
}
