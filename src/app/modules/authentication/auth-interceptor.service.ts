import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Store} from '@ngrx/store';

import * as fromApp from '../../core/store/app.reducer';
import {Injectable} from '@angular/core';
import {exhaustMap, map, take} from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class AuthInterceptorService implements HttpInterceptor {
  constructor(
    private store: Store<fromApp.AppState>
  ) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return this.store.select('auth').pipe(
      take(1),
      map(authState => {
        return authState.user;
      }),
      exhaustMap(user => {
        if (!user || !user.token) {
          return next.handle(req);
        }
        const modifiedReq = req.clone({
          params: req.params.append('auth', user.token)
        });
        return next.handle(modifiedReq);
      })
    );
  }

}
