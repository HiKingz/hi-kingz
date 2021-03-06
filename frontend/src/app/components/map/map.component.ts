import { Component, Input, Output, OnInit, ViewEncapsulation, EventEmitter, ComponentFactoryResolver } from '@angular/core';
import {OverlayModule} from '@angular/cdk/overlay';
import { environment } from '../../../environments/environment';
import {FirebaseItem} from '../../commons/models/firebase.model';

import 'rxjs/add/operator/switchMap';

import * as mapboxgl from 'mapbox-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import { decode } from '@mapbox/polyline';
import * as ctrls from './map.controls';

import {Route} from '../../routes/route.model';
import {Point} from '../../coordinates/point.model';
import {Poi} from '../../pois/poi.model';

import {PoiService} from '../../pois/poi.service';

// Global vars
const request = new XMLHttpRequest();

// 'Template' for setting sources without redefining this object over and over again
const point_src = {
  'type': 'FeatureCollection',
  'features': [{
    'type': 'Feature',
    'geometry': {
      'type': 'Point',
      'coordinates': [0, 0]
    }
  }]
};

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class MapComponent implements OnInit {

  defaultZoom = 12;

  pois: Array<FirebaseItem<Poi>>;
  on_poi: boolean;
  poi_list: Array<Poi>;
  map: mapboxgl.Map;
  _route: Route = undefined;
  _poi: Poi = undefined;

  mapLoaded = false;

  planningCtrl: any;

  _readonly: boolean;
  @Input()
  set readonly(value: boolean) {

    // Add the control either way if we disable readonly
    if (this.map) {
      if (!value) {
        this.map.addControl(this.planningCtrl);
      } else if (!this._readonly && value) {
        // Switch from edit to showmode (readonly = false -> true)
        this.map.removeControl(this.planningCtrl);
      }
    }
    this._readonly = value;
  }
  get readonly(): boolean {
    return this._readonly;
  }

  @Output() deleteWaypoint = new EventEmitter();
  @Output() showPoi = new EventEmitter();
  @Output() newMarker = new EventEmitter();

  cli;
  // map: mapboxgl.Map;

  @Input()
  set route(route: Route) {
    this._route = route;
    this.displayRouteOrPoi(false);
  }
  get route(): Route {
    return this._route;
  }

  @Input()
  set poi(poi: Poi) {
    this._poi = poi;
    this.displayRouteOrPoi(false);
  }
  get poi(): Poi {
    return this._poi;
  }

  constructor(private poiService: PoiService) {
    mapboxgl.accessToken = environment.mapbox.accessToken;
    this.on_poi = false;
    this.pois = [];
  }

  ngOnInit() {


    this.map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/outdoors-v9',
      zoom: 5,
      center: [8.24, 50.7]
    });
    const self = this;
    this.map.on('load', () => {
      /*self.map.loadImage('../../../assets/icons/map-marker.png', (err, img) => {
        if (err) {
          alert(err);
        }
        self.map.addImage('marker', img);
      }); )*/

      self.map.loadImage('../../../assets/icons/map-marker-poi.png', (err, img) => {
        if (err) {
          alert(err);
        }
        self.map.addImage('marker-poi', img);
      });

      self.map.addSource('route_source', {
        'type' : 'geojson',
        'data' : {
          'type' : 'Feature',
          'properties' : {},
          'geometry' : {
            'type' : 'LineString',
            'coordinates' : [0, 0]
          }
        }
      });
      self.map.addLayer({
        'id' : 'route',
        'type': 'line',
        'source': 'route_source',
        'layout': {
          'line-join': 'round',
          'line-cap' : 'round'
        },
        'paint': {
          'line-color': '#888',
          'line-width': 3,
        }
      });

      self.map.addSource('route_waypoints', {
        'type' : 'geojson',
        'data' : {
          'type' : 'FeatureCollection',
          'features' : []
        }
      });

      self.map.addLayer({
        'id' : 'route_waypoints_circles',
        'type': 'circle',
        'source': 'route_waypoints',
        'paint' : {
          'circle-radius' : 14,
          'circle-color' : '#3f51b5'
        }
      });

      self.map.addLayer({
        'id' : 'route_waypoints',
        'type': 'symbol',
        'source': 'route_waypoints',
        'layout': {
          'text-field': '{title}',
          'text-font': ['Open Sans Semibold', 'Arial Unicode MS Bold'],
          'text-offset': [0, 0],
          'text-anchor': 'center',
          'symbol-spacing' : 15,
        },
        'paint' : {
          'text-color' : '#FFFFFF'
        }
      });

      self.map.on('mouseup', this.getPoisInBounds);
      self.mapLoaded = true;
    });

    this.planningCtrl = new ctrls.RoutePlanningControl(this, this.route);
    this.deleteWaypoint.subscribe((data) => {
      this.planningCtrl.deleteWaypointAt(data);
    });

    if (!this.readonly) {
      if (this.route) {
        this.map.addControl(this.planningCtrl, 'bottom-left');
      }
      // else if (this.poi) { // Obsolete part, no longer used
      //  this.map.addControl(new ctrls.MarkerControl(this), 'bottom-left');
      // }
    }
    if ((this.route && this.route.direction.length > 0)) { // } || (this.poi && this.poi.point)) {
      this.displayRouteOrPoi(true);
    }
    this.map.addControl(new MapboxGeocoder({accessToken: environment.mapbox.accessToken}), 'top-left');
  }

  private getCharEnum(i: number): String {
    let res = '';
    while (i > 24) {
      res = String.fromCharCode(i % 24 + 65) + res;
      i = Math.floor(i / 24);
    }
    res = String.fromCharCode(i % 24 + 65) + res;

    return res;
  }

  public getPoisInBounds = () => {
    if (this.map.getZoom() < this.defaultZoom) {
      return;
    }
    const bounds = this.map.getBounds();
    const self = this;
    this.poiService.getInArea(bounds._ne.lat, bounds._ne.lng, bounds._sw.lat, bounds._sw.lng).then(
      (frbs_pois) => {
        self.displayPointsOfInterest(frbs_pois);
      }
    );
  }

  // Propagate coords to event emitter
  public newMarkerEmit(coords: any) {
    this.newMarker.emit(coords);
  }

  public addPoi(poi: FirebaseItem<Poi>) {
    const poi_id = 'poi' + this.pois.length;
    this.map.addSource(poi_id, {
      'type': 'geojson',
      'data': {
        'type': 'FeatureCollection',
        'features': [{
          'type': 'Feature',
          'geometry': {
            'type': 'Point',
            'coordinates': [poi.item.point.longitude, poi.item.point.latitude]
          },
          properties: {
            'marker-color': '#d0b23b',
            'marker-size': 'large',
            'marker-symbol': 'mountain'
          }
        }]
      }
    });

    this.map.addLayer({
      'id': poi_id,
      'type': 'symbol',
      'source': poi_id,
      'layout': {
        'icon-image': 'marker-poi',
        'icon-anchor' : 'bottom',
        'icon-size' : 0.2,
        'icon-offset' : [0, -1.8],
        'icon-text-fit-padding' : [7, 20, 28, 20],
        'icon-allow-overlap' : true,
        'symbol-spacing' : 50,
      },
      'paint' : {
        'icon-color' : '#3f51b5',
        'icon-halo-width' : 5,
        'icon-halo-blur': 5,
      }
    });

    this.map.on('mousedown', poi_id, this.clickPoi);
    this.map.on('mouseenter', poi_id, this.enterPoi);
    this.map.on('mouseleave', poi_id, this.leavePoi);
    this.pois.push(poi);
  }

  public displayPointsOfInterest(pois: Array<FirebaseItem<Poi>>) {
    let i = 0;
    for (; i < this.pois.length; i++) {
      this.map.off('mousedown', 'poi' + i, this.clickPoi);
      this.map.off('mouseenter', 'poi' + i, this.enterPoi);
      this.map.off('mouseleave', 'poi' + i, this.leavePoi);
      this.map.removeLayer('poi' + i);
      this.map.removeSource('poi' + i);
      delete this.pois[i];
    }
    i = 0;
    this.pois.length = 0;
    const self = this;
    pois.forEach((poi) => {
      self.addPoi(poi);
    });
  }

  private clickPoi = (event: any) => {
    const index = Number.parseInt(event.features[0].layer.id.substring(3)); // cut 'poi' away from the front
    this.showPoi.emit([this.pois[index].item, true, this.pois[index].reference]);
  }

  private enterPoi = () => {
    this.on_poi = true;
  }

  private leavePoi = () => {
    this.on_poi = false;
  }

  public displayRouteOrPoi = (jumpTo: boolean = false) => {

    if (!this.map) {
      return;
    }

    const geojson = {
      'type' : 'Feature',
      'properties' : {},
      'geometry' : {
        'type' : 'LineString',
        'coordinates' : []
      }
    };

    const geojson_wps = {
      'type' : 'FeatureCollection',
      'features' : [],
    };

    const self = this;

    if (self.route) {
      self.route.direction.forEach(function(c, i) {
        geojson.geometry.coordinates.push([c.longitude, c.latitude]);
      });
      self.route.waypoints.forEach(function(c, i) {
        geojson_wps.features.push({
          'type' : 'Feature',
          'properties' : {
            'title' : self.getCharEnum(i),
            'icon' : 'br-state-2'
          },
          'geometry' : {
            'type' : 'Point',
            'coordinates' : [c.point.longitude, c.point.latitude]
          }
        });
      });
    }// else {
    //  geojson.geometry.coordinates.push([this.poi.point.longitude, this._poi.point.latitude]);
    // }

    if (geojson.geometry.coordinates.length === 0) {
      geojson.geometry.coordinates.push([0, 0]);
    }

    const src = this.map.getSource('route_source');
    if (src) {
      src.setData(geojson);
      this.map.getSource('route_waypoints').setData(geojson_wps);
    } else {
      this.map.on('load', () => {
        self.map.getSource('route_source').setData(geojson);
        self.map.getSource('route_waypoints').setData(geojson_wps);
        if (jumpTo) {
          if (self.route && self.route.direction.length > 0) {
            self.flyTo(self.route.direction[0]);
          } else if (self.poi) {
            self.flyTo(self.poi.point);
          }
        }
        return;
      });
    }

    if (jumpTo) {
      if (this.route  && self.route.waypoints.length > 0) {
        this.flyTo(this.route.waypoints[0].point);
      } else if (this.poi) {
        this.flyTo(this._poi.point);
      }
    }
  }

  public flyTo = (location: Point) => {
    this.map.flyTo({
        // These options control the ending camera position: centered at
        // the target, at zoom level 9, and north up.
        center: new mapboxgl.LngLat(location.longitude, location.latitude),
        zoom: this.defaultZoom,
        bearing: 0,

        // These options control the flight curve, making it move
        // slowly and zoom out almost completely before starting
        // to pan.
        speed: 5.0, // make the flying slow
        curve: 1, // change the speed at which it zooms out

        // This can be any easing function: it takes a number between
        // 0 and 1 and returns another number between 0 and 1.
        easing: function (t) {
          return t;
        }
      }
    );
  }
}
