import * as mapboxgl from 'mapbox-gl';
import { decode } from '@mapbox/polyline';
import { environment } from '../../../environments/environment';
import { MapComponent } from './map.component';
import {Point} from '../../coordinates/point.model';
import {Waypoint} from '../../coordinates/waypoint.model';


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

export class PoiMakerControl {
  _map: mapboxgl.Map;
  _container;
  component: MapComponent;

  constructor(component: MapComponent) {
    this.component = component;
  }


  onAdd(map) {
    this._map = map;
    this._container = document.createElement('div');
    this._container.className = 'mapboxgl-ctrl';
    this._container.textContent = 'Point of Interest';
    map.on('click', this.handleClick);
    map.on('load', () => {
      this._map.addSource('poi', {
        'type': 'geojson',
        'data': {
          'type': 'FeatureCollection',
          'features': [{
            'type': 'Feature',
            'geometry': {
              'type': 'Point',
              'coordinates': [8.24958214937908, 50.08016862900732]
            }
          }]
        }
      });

      this._map.addLayer({
        'id': 'poi',
        'type': 'circle',
        'source': 'poi',
        'paint': {
          'circle-radius': 10,
          'circle-color': '#00A0FF'
        }
      });
    });

    return this._container;
  }

  public handleClick = (e) => {
    this.setPoint(e.lngLat);
  }

  public setPoint = (coords) => {
    point_src.features[0].geometry.coordinates = [coords.lng, coords.lat];
    this._map.getSource('poi').setData(point_src);
  }

}

export class RoutePlanningControl {

  _wpList;
  _container;
  _map: mapboxgl.Map;

  waypoints = {};
  wp_next_id = 0;
  draggedPoint: string;
  isDragging = false;

  component: MapComponent;

  constructor(component: MapComponent) {
    this.component = component;
  }

  onAdd(map) {
    this._map = map;
    this._container = document.createElement('div');
    this._container.className = 'mapboxgl-ctrl';
    this._container.textContent = 'Route Planning';
    this._wpList = document.createElement('div');
    this._container.appendChild(this._wpList);
    map.on('click', this.handleClick);


    const self = this;
    map.on('load', () => {
      map.on('mousedown', this.mouseDown);
      self.component.route.waypoints.forEach((wp) => {
        self.addPoint(new mapboxgl.LngLat(wp.point.longitude, wp.point.latitude), false);
      });
    });

    return this._container;
  }

  public addPoint = (coords, update: boolean = true) => {
    const wp_id = 'point' + this.wp_next_id;
    this._map.addSource(wp_id, {
      'type': 'geojson',
      'data': {
        'type': 'FeatureCollection',
        'features': [{
          'type': 'Feature',
          'geometry': {
            'type': 'Point',
            'coordinates': [ coords.lng, coords.lat ]
          }
        }]
      }
    });

    this._map.addLayer({
      'id': wp_id,
      'type': 'circle',
      'source': wp_id,
      'paint': {
        'circle-radius': 10,
        'circle-color': '#00A0FF'
      }
    });

    const self = this;
    this._map.on('mouseenter', wp_id, () => {
      self._map.getCanvasContainer().style.cursor = 'move';
      self.draggedPoint = wp_id;
      self._map.dragPan.disable();
    });
    this._map.on('mouseleave', wp_id, () => {
      if (self.isDragging) {
        return; // YOU SHALL NOT LEAVE
      }
      self._map.getCanvasContainer().style.cursor = '';
      self.draggedPoint = null;
      self._map.dragPan.enable();
    });

    this.waypoints[wp_id] = [coords.lng, coords.lat];

    this.wp_next_id++;
    if (update) {
      this.fetchDirections();
    }
  }

  public handleClick = (e) => {
    this.addPoint(e.lngLat, true);
  }

  mouseDown = () => {
    if (!this.draggedPoint) {
      return;
    }

    this.isDragging = true;

    // Set a cursor indicator
    this._map.getCanvasContainer().style.cursor = 'grab';

    // Mouse events
    this._map.on('mousemove', this.onMove);
    this._map.once('mouseup', this.onUp);
  }

  onMove = (e) => {
    if (!this.draggedPoint) {
      return;
    }
    const coords = e.lngLat;

    // Set a UI indicator for dragging.
    this._map.getCanvasContainer().style.cursor = 'grabbing';

    // Update the Point feature in `geojson` coordinates
    // and call setData to the source layer `point` on it.
    point_src.features[0].geometry.coordinates = [coords.lng, coords.lat];
    this._map.getSource(this.draggedPoint).setData(point_src);
    this.waypoints[this.draggedPoint] = [coords.lng, coords.lat];


  }

  onUp = (e) => {
    if (!this.draggedPoint) {
      return;
    }

    this.isDragging = false;

    const coords = e.lngLat;

    // Print the coordinates of where the point had
    // finished being dragged to on the map.
    // coordinates.style.display = 'block';
    // coordinates.innerHTML = 'Longitude: ' + coords.lng + '<br />Latitude: ' + coords.lat;
    this._map.getCanvasContainer().style.cursor = '';

    // Unbind mouse events
    this._map.off('mousemove', this.onMove);

    this.fetchDirections();
  }

  public updateRoute = (route, route_wps) => {

    // Decode the geometry and put the points in a simple array(decode gives LatLong, but we need LongLat, hence we call c.reverse())
    const decoded = decode(route.geometry, 5).map(function(c) {
      return c.reverse();
    });

    const self = this;
    this.component.route.direction.length = 0;
    decoded.forEach(function(c, i) {
      // push this into the current _route model passed down by the component embedding the map
      self.component.route.direction.push(new Point(c[0], c[1]));
    });

    // Merge waypoints by iterating over both arrays: route_wps and self.component.rt.waypoints
    for (let i = 0; i < self.component.route.waypoints.length; i++) {
      const wp_srvc = route_wps[i]; // Waypoint coming from the service
      const wp_local = self.component.route.waypoints[i];
      // Location has changed -> Use name coming from the service
      if (wp_local.point.longitude !== wp_srvc.location[0] || wp_local.point.latitude !== wp_srvc.location[1]) {
        wp_local.name = wp_srvc.name ? wp_srvc.name : wp_srvc.location;
      }
    }
    // Add new waypoint(s)
    for (let i = self.component.route.waypoints.length; i < route_wps.length; i++) {
      const wp_srvc = route_wps[i]; // Waypoint coming from the service
      self.component.route.waypoints.push(
        new Waypoint(wp_srvc.name ? wp_srvc.name : wp_srvc.location,
          new Point(wp_srvc.location[0], wp_srvc.location[1])));
    }

    this.component.displayRouteOrPoi();
  }

  private buildQuery = () => {
    return Object.keys(this.waypoints).map(
      key => [this.waypoints[key][0], this.waypoints[key][1]].join(',')
    ).join(';');
  }

  private fetchDirections = () => {
    const query = this.buildQuery();

    // Request params
    const options = [];
    options.push('geometries=polyline');
    // if (alternatives) { options.push('alternatives=true'); }
    // if (congestion) { options.push('annotations=congestion'); }
    options.push('steps=false');
    options.push('overview=full');
    if (environment.mapbox.accessToken) { options.push('access_token=' + environment.mapbox.accessToken); }
    request.abort();
    request.open('GET', `https://api.mapbox.com/directions/v5/mapbox/walking/${query}.json?${options.join('&')}`, true);

    request.onload = () => {
      // alert('Got response');
      if (request.status >= 200 && request.status < 400) {
        const data = JSON.parse(request.responseText);
        if (data.error) {
          return data.error;
        }

        if (data.routes[0]) {
          this.updateRoute(data.routes[0], data.waypoints);
        }

      }
    }
    request.onerror = () => {
      alert(JSON.parse(request.responseText).message);
    };

    request.send();
  }

  onRemove() {
    this._container.parentNode.removeChild(this._container);
    this._map = undefined;
  }
}
