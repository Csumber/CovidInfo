import {Component, Input, OnInit} from '@angular/core';
import {Article} from '../article.model';

import * as fromApp from '../../../core/store/app.reducer';
import {Store} from '@ngrx/store';

@Component({
  selector: 'app-news-card',
  templateUrl: './news-card.component.html',
  styleUrls: ['./news-card.component.css']
})
export class NewsCardComponent implements OnInit {


  private initialData: Article = {
    source: {
      id: null,
      name: 'Weborvos.hu'
    },
    author: null,
    title: 'Long Covid: az agy vérellátását nehezítő gyulladás az ok? - Weborvos',
    description: 'A koronav&iacute;rus &aacute;ldozatait boncolva tal&aacute;ltak a kutat&oacute;k olyan sejteket az agyban, amelyeknek nem lett volna ott semmi keresnival&oacute;juk.',
    url: 'https://weborvos.hu/lapszemle/long-covid-az-agy-verellatasat-nehezito-gyulladas-az-ok-266077',
    urlToImage: 'https://weborvos.hu/data/articles/266/2660/article-266077/neurologus.jpg',
    publishedAt: new Date(Date.parse('2021-03-22T05:31:50Z')),
    content: 'Sokan tapasztaltják a koronavírusból felépülve, hogy agyuk ködösebben mködik, mint korábban: a kutatók talán nyomára jutottak a jelenség okának.  A legvalószínbbnek most az tnik, hogy akkor alakul ki… [+1041 chars]'
  };

  @Input('data') data: Article = this.initialData;

  constructor(private store: Store<fromApp.AppState>) {
  }

  ngOnInit(): void {
    // this.store.select('news')
  }

}
