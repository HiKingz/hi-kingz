import * as mapboxgl from 'mapbox-gl';
import { decode } from '@mapbox/polyline';
import { environment } from '../../../environments/environment';
import { MapComponent } from './map.component';
import {Point} from "../../coordinates/point.model";
import {Waypoint} from "../../coordinates/waypoint.model";


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

export class PlanningControl {

  _wpList;
  _container;
  _map: mapboxgl.Map;

  waypoints = {};
  wp_next_id = 0;
  draggedPoint: string;
  isDragging = false;

  component: MapComponent

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

    /* const el = document.createElement('div');
    el.className = 'marker';
    el.style.backgroundImage = 'url(https://image.flaticon.com/icons/svg/149/149060.svg)';
    el.style.backgroundAttachment = 'top';
    el.style.backgroundSize = '25px,25px';
    el.style.backgroundRepeat = 'no-repeat';
    el.style.width = '25px';
    el.style.height = '50px';

    new mapboxgl.Marker(el)
      .setLngLat([8.24, 50.7])
      .addTo(map); */

    map.on('load', () => {
      map.addSource('route_source', {
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
      map.addLayer({
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
      map.on('mousedown', this.mouseDown);
    });

    return this._container;
  }

  public handleClick = (e) => {
    // alert('You clicked the map at ' + e.lngLat);

    // create a DOM element for the marker
    /*const el = document.createElement('div');
    el.className = 'marker';
    el.style.backgroundImage = 'url(https://image.flaticon.com/icons/svg/149/149060.svg)';
    el.style.backgroundAttachment = 'top';
    el.style.backgroundSize = '25px,25px';
    el.style.backgroundRepeat = 'no-repeat';
    el.style.width = '25px';
    el.style.height = '50px';

    const marker = new mapboxgl.Marker(el)
      .setLngLat(e.lngLat)
      .addTo(overlay);

    this.waypoints.push(marker); */

    const coords = e.lngLat;

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

    this.fetchDirections();
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

  public displayRoute = (route, route_wps) => {

    const geojson = {
      'type' : 'Feature',
      'properties' : {},
      'geometry' : {
        'type' : 'LineString',
        'coordinates' : []
      }
    };

    const decoded = decode(route.geometry, 5).map(function(c) {
      return c.reverse();
    });

    const self = this;
    decoded.forEach(function(c, i) {
      geojson.geometry.coordinates.push(c);
      // Also push this into the current route model passed down by the component embedding the map
      self.component.rt.direction.points.push(new Point(c[0], c[1]));
    });
    this._map.getSource('route_source').setData(geojson);

    // Merge waypoints by iterating over both arrays: route_wps and self.component.rt.waypoints
    for (let i = 0; i < self.component.rt.waypoints.length; i++) {
      const wp_srvc = route_wps[i]; // Waypoint coming from the service
      const wp_local = self.component.rt.waypoints[i];
      // Location has changed -> Use name coming from the service
      if (wp_local.point.longitude !== wp_srvc.location[0] || wp_local.point.latitude !== wp_srvc.location[1]) {
        wp_local.name = wp_srvc.name ? wp_srvc.name : wp_srvc.location;
      }
    }
    for (let i = self.component.rt.waypoints.length; i < route_wps.length; i++) {
      const wp_srvc = route_wps[i]; // Waypoint coming from the service
      self.component.rt.waypoints.push(
        new Waypoint(wp_srvc.name ? wp_srvc.name : wp_srvc.location,
          new Point(wp_srvc.location[0], wp_srvc.location[1])));
    }
  }

  private buildQuery = () => {
    const query = [];
    for (const key in this.waypoints) {
      if (true) { // Warum will TSLint so eine Kacke haben?!
        query.push([this.waypoints[key][0], this.waypoints[key][1]].join(','));
      }
    }
    return query.join(';');
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
          this.displayRoute(data.routes[0], data.waypoints);
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
