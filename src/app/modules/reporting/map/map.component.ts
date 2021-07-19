import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import Map from 'ol/Map';
import View from 'ol/View';
import OSM from 'ol/source/OSM';
import { Icon, Style } from 'ol/style';
import { Tile as TileLayer, Vector as fromLayerVector } from 'ol/layer';
import Feature, { FeatureLike } from 'ol/Feature';
import { Point } from 'ol/geom';
import VectorSource from 'ol/source/Vector';
import IconAnchorUnits from 'ol/style/IconAnchorUnits';
import { transform } from 'ol/proj';
import { Overlay } from 'ol';
import OverlayPositioning from 'ol/OverlayPositioning';
import MapBrowserEvent from 'ol/MapBrowserEvent';
import { Store } from '@ngrx/store';
import { MatDialog } from '@angular/material/dialog';
import { MapDataEntry } from '../data/data.models';
import { AlertComponent } from '../../../shared/alert/alert.component';
import { Subscription } from 'rxjs';

import * as fromApp from '../../../core/store/app.reducer';
import * as ReportingActions from '../store/reporting.actions';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
})
export class MapComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('popup', { read: ElementRef, static: true }) popupRef:
    | ElementRef
    | undefined;
  map: Map = new Map({});
  popup: Overlay = new Overlay({});

  storeSub: Subscription | null = null;

  constructor(
    private store: Store<fromApp.AppState>,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.store.dispatch(new ReportingActions.FetchReportMap());

    this.map = new Map({
      view: new View({
        center: new Point(
          // EU coordinates, transformed
          transform([15.2551, 54.526], 'EPSG:4326', 'EPSG:3857')
        ).getCoordinates(),
        zoom: 4,
      }),
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
      ],
    });

    // Display popup on click
    this.popup = new Overlay({
      element: this.popupRef?.nativeElement,
      positioning: OverlayPositioning.BOTTOM_CENTER,
      stopEvent: false,
      // offset the data from the marker, to appear nice
      offset: [0, -45],
    });

    this.map.addOverlay(this.popup);

    this.map.on('click', (evt: MapBrowserEvent<PointerEvent>) => {
      const feature = this.map.forEachFeatureAtPixel(
        evt.pixel,
        (eventFeature: FeatureLike) => {
          return eventFeature;
        }
      );
      if (feature) {
        // This exists, but for some reason typescript can't see it, so we have to use ts-ignore
        // @ts-ignore
        const coordinates = feature.getGeometry().getCoordinates();
        this.popup.setPosition(coordinates);
        // We get an error here too, so we explicitly ignore is
        // @ts-ignore
        this.popup.getElement()?.innerHTML = `<p>Confirmed: ${feature.get(
          'confirmed'
        )}</p>
             <p>Deaths: ${feature.get('deaths')}</p>
             <p>Recovered: ${feature.get('recovered')}</p>
             <p>Active: ${feature.get('active')}</p>
             <p>Region: ${feature.get('region')}</p>
            `;
      } else {
        this.popup.setPosition(undefined);
      }
    });
  }

  ngOnDestroy(): void {
    this.store.dispatch(new ReportingActions.DitchReportMap());

    this.storeSub?.unsubscribe();
  }

  ngAfterViewInit(): void {
    this.map.setTarget('ol-map');

    this.storeSub = this.store.select('reporting').subscribe((state) => {
      if (!state.loadingMap && state.dataMap) {
        this.addMarkers(state.dataMap);
      }
    });
  }

  addMarkers(dataArray: MapDataEntry[]): void {
    const iconFeatures: Feature[] = [];
    for (const data of dataArray) {
      const iconFeature = new Feature({
        geometry: new Point(
          transform([data.long, data.lat], 'EPSG:4326', 'EPSG:3857')
        ),
        confirmed: data.confirmed,
        deaths: data.deaths,
        recovered: data.recovered,
        active: data.active,
        region: data.combinedKey,
      });
      iconFeatures.push(iconFeature);
    }

    const vectorSource = new VectorSource({
      features: iconFeatures,
    });

    const iconStyle = new Style({
      image: new Icon({
        // Anchored at the middle of the bottom, when using style
        anchor: [0.5, 1],
        anchorXUnits: IconAnchorUnits.FRACTION,
        anchorYUnits: IconAnchorUnits.FRACTION,
        src: 'assets/icons/marker_twotone_red_2x.png',
      }),
    });

    const vectorLayer = new fromLayerVector({
      source: vectorSource,
      style: iconStyle,
    });
    this.map.addLayer(vectorLayer);
  }

  private showErrorAlert(error: string): void {
    this.dialog.open(AlertComponent, {
      data: { message: error },
    });
  }
}
