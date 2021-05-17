import {Component} from '@angular/core';

@Component({
  selector: 'app-licensing',
  templateUrl: './licensing.component.html',
  styleUrls: ['./licensing.component.css'],
})
export class LicensingComponent {
  images = [
    {
      name: 'Browser icon',
      source: '<a href="https://www.flaticon.com/free-icon/virus_1086" target="_blank">https://www.flaticon.com/free-icon/virus_108659</a>',
      type: 'image'
    },
    {
      name: 'Background(s) on main page',
      source: '<a href="https://www.freepik.com/tirachar" target="_blank">https://www.freepik.com/tirachardz</a>',
      type: 'image'
    },
    {
      name: 'News card image',
      source: '<a href="http://freepik.com/onlyyou" target="_blank">http://freepik.com/onlyyouqj</a>',
      type: 'image'
    },
    {
      name: 'Data card image',
      source: '<a href="http://freepik.com/onlyyou" target="_blank">http://freepik.com/onlyyouqj</a>',
      type: 'image'
    },
    {
      name: 'Vaccine card image',
      source: '<a href="http://freepik.com/freep" target="_blank">http://freepik.com/freepik</a>',
      type: 'image'
    },
    {
      name: 'News placeholder image',
      source: '<a href="https://www.freepik.com/vectorjui" target="_blank">https://www.freepik.com/vectorjuice</a>',
      type: 'image'
    },
  ];

  data = [
    {
      name: 'Coronavirus data',
      source: '<a href="https://covid19.mathdro.id/api" target="_blank">https://covid19.mathdro.id/api</a>',
      type: 'storage'
    },
    {
      name: 'Coronavirus data (new)',
      source: '<a href="https://covid19api.com/" target="_blank">https://covid19api.com/</a>',
      type: 'storage'
    },
    {
      name: 'News data',
      source: '<a href="https://newsapi.org/register/success" target="_blank">https://newsapi.org/register/success</a>',
      type: 'storage'
    },
  ];

  other = [
    {
      name: 'Charts library',
      source: '<a href="https://github.com/swimlane/ngx-charts" target="_blank">https://github.com/swimlane/ngx-charts</a>',
      type: 'wysiwyg'
    }, {
      name: 'Maps library',
      source: '<a href="https://dev.to/camptocamp-geo/openlayers-in-an-angular-application-mn1" target="_blank">https://dev.to/camptocamp-geo/openlayers-in-an-angular-application-mn1</a>',
      type: 'maps'
    },
  ];
}
