import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {map} from 'rxjs/operators';
import {Store} from '@ngrx/store';

import * as fromApp from '../../../core/store/app.reducer';
import * as AuthActions from '../../../modules/authentication/store/auth.actions';
import {AlertComponent} from '../../../shared/alert/alert.component';
import {MatDialog} from '@angular/material/dialog';
import {ScreenSizeService} from '../../../shared/screen-size.service';
import {ThemeService} from '../theme.service';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.css'],
})
export class MainNavComponent implements OnInit, OnDestroy {

  darkTheme = false;
  isAuthenticated = false;
  error: string | null = null;
  routes = [
    {path: 'home', name: 'Home'},
    {path: 'news', name: 'News'},
    {path: 'reporting', name: 'Reporting'},
    {path: 'vaccine', name: 'Vaccine'},
    {path: 'faq', name: 'FAQ'},
    {path: 'licensing', name: 'Licensing'},
  ];
  private userSub: Subscription | null = null;
  private storeSub: Subscription | null = null;

  constructor(
    private store: Store<fromApp.AppState>,
    public screenSizeService: ScreenSizeService,
    public dialog: MatDialog,
    public themeService: ThemeService,
  ) {
  }

  changeTheme(): void {
    this.darkTheme = !this.darkTheme;
    this.themeService.setDarkTheme(this.darkTheme);
  }

  ngOnInit(): void {
    this.userSub = this.store
      .select('auth')
      .pipe(map((authState) => authState.user))
      .subscribe((user) => {
        this.isAuthenticated = !!user;
      });
    this.storeSub = this.store.select('auth').subscribe((authState) => {

      this.error = authState.authError;
      if (this.error) {
        this.showErrorAlert();
      }
    });
  }

  onLogout(): void {
    this.store.dispatch(new AuthActions.Logout());
  }

  ngOnDestroy(): void {
    this.userSub?.unsubscribe();
  }

  private showErrorAlert(): void {
    this.dialog.open(AlertComponent, {data: {message: this.error}});
  }
}
