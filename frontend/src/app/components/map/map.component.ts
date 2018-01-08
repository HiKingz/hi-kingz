import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { environment } from '../../../environments/environment';

import 'rxjs/add/operator/switchMap';

import * as mapboxgl from 'mapbox-gl';
import { decode } from '@mapbox/polyline';
import * as ctrls from './map.controls';

import {Route} from '../../routes/route.model';
import {Point} from '../../coordinates/point.model';
import {Poi} from '../../pois/poi.model';

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

  map: mapboxgl.Map;
  _route: Route = undefined;
  _poi: Poi = undefined;
  @Input() readonly: boolean;

  cli;
  // map: mapboxgl.Map;

  @Input()
  set route(route: Route) {
    this._route = route;
    // this.displayRouteOrPoi(true);
  }
  get route(): Route {
    return this._route;
  }

  @Input()
  set poi(poi: Poi) {
    this._poi = poi;
  }
  get poi(): Poi {
    return this._poi;
  }

  constructor() {
    mapboxgl.accessToken = environment.mapbox.accessToken;
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
          'line-width': 3
        }
      });
    });

    if (!this.readonly) {
      if (this.route) {
        this.map.addControl(new ctrls.RoutePlanningControl(this), 'top-left');
      } else if (this.poi) {
        this.map.addControl(new ctrls.PoiMakerControl(this), 'top-left');
      }
    }
    if ((this.route && this.route.direction.length > 0) || (this.poi && this.poi.point)) {
      this.displayRouteOrPoi(true);
    }
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

    const self = this;

    if (self.route) {
      self.route.direction.forEach(function(c, i) {
        geojson.geometry.coordinates.push([c.longitude, c.latitude]);
      });
    } else {
      geojson.geometry.coordinates.push([this.poi.point.longitude, this._poi.point.latitude]);
    }
    const src = this.map.getSource('route_source');
    if (src) {
      src.setData(geojson);
    } else {
      this.map.on('load', () => {
        self.map.getSource('route_source').setData(geojson);
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
        zoom: 15,
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
