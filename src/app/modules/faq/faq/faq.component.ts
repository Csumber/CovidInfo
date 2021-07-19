import { Component, OnDestroy, OnInit } from '@angular/core';
import { Category } from '../question.model';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import * as FromApp from '../../../core/store/app.reducer';
import * as FaqActions from '../store/faq.actions';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.css'],
})
export class FAQComponent implements OnInit, OnDestroy {
  loading = false;
  categories: Category[] = [];
  storeSub: Subscription | null = null;

  constructor(private store: Store<FromApp.AppState>) {}

  ngOnInit(): void {
    this.store.dispatch(new FaqActions.FetchCategories());
    this.storeSub = this.store.select('faq').subscribe((res) => {
      this.categories = res.categories ? res.categories : [];
      this.loading = res.loading;
    });
  }

  ngOnDestroy(): void {
    this.storeSub?.unsubscribe();
  }
}
