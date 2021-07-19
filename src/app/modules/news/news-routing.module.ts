import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewsComponent } from './news/news.component';
import { ArticleComponent } from './article/article.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: NewsComponent,
  },
  {
    path: ':title',
    component: ArticleComponent,
  },
];

@NgModule({ imports: [RouterModule.forChild(routes)], exports: [RouterModule] })
export class NewsRoutingModule {}
