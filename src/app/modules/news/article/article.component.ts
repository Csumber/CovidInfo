import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { map, switchMap } from 'rxjs/operators';
import { Article } from '../article.model';

import * as fromApp from '../../../core/store/app.reducer';
import * as newsReducer from '../store/news.reducer';
import * as NewsActions from '../store/news.actions';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css'],
})
export class ArticleComponent implements OnInit {
  public article: Article | null = null;
  public title = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<fromApp.AppState>
  ) {}

  ngOnInit(): void {
    this.store.dispatch(new NewsActions.FetchArticles());
    this.route.params
      .pipe(
        map((params: Params) => {
          return params['title'];
        }),
        switchMap((title: string) => {
          this.title = title;
          return this.store.select('news');
        }),
        map((newsState: newsReducer.State) => {
          if (newsState.articles) {
            return newsState.articles.find((article: Article) => {
              return article.title === this.title;
            });
          }
          return null;
        })
      )
      .subscribe((article: Article | undefined | null) => {
        if (article) {
          this.article = article;
        }
      });
  }
}
