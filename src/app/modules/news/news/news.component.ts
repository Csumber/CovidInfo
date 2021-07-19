import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ScreenSizeService } from '../../../shared/screen-size.service';

import { Store } from '@ngrx/store';
import { Article } from '../article.model';

import * as NewsActions from '../store/news.actions';
import * as fromApp from '../../../core/store/app.reducer';

@Component({
  selector: 'app-home',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css'],
})
export class NewsComponent implements OnInit, OnDestroy {
  loading = false;
  storeSub: Subscription | null = null;
  articles: Article[] = [];

  constructor(
    public screenSizeService: ScreenSizeService,
    private store: Store<fromApp.AppState>
  ) {}

  ngOnInit(): void {
    this.store.dispatch(new NewsActions.FetchArticles());
    this.storeSub = this.store.select('news').subscribe((res) => {
      this.articles = res.articles ? res.articles : [];
      this.loading = res.loading;
    });
  }

  ngOnDestroy(): void {
    this.storeSub?.unsubscribe();
  }
}
