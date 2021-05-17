import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';

@Injectable({providedIn: 'root'})
export class ThemeService {
  public isDarkTheme;
  private darkTheme;

  constructor() {
    this.darkTheme = new Subject<boolean>();
    this.isDarkTheme = this.darkTheme.asObservable();
  }

  setDarkTheme(isDarkTheme: boolean): void {
    this.darkTheme?.next(isDarkTheme);
  }
}
