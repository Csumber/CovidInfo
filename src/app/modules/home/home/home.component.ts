import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  cardData = [
    {
      imagePath: 'assets/img/cards/card-news.jpg',
      description: 'Check out the latest news!',
      routerPath: '/news',
    },
    {
      imagePath: 'assets/img/cards/card-data.jpg',
      description: 'See the newest statistics!',
      routerPath: '/reporting',
    },
    {
      imagePath: 'assets/img/cards/card-vaccine.jpg',
      description: 'Register to get vaccinated!',
      routerPath: '/vaccine',
    },
  ];
}
