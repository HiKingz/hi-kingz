import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { environment } from '../../../environments/environment';

import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import 'rxjs/add/operator/switchMap';

import * as mapboxgl from 'mapbox-gl';
import { decode } from '@mapbox/polyline';
import {instantiateDefaultStyleNormalizer} from '@angular/platform-browser/animations/src/providers';
import * as ctrls from './map.controls';

// Global vars
const request = new XMLHttpRequest();

let map: mapboxgl.Map;
const waypoints = [];
let overlay: mapboxgl.FeatureLayer;

let instance: MapComponent;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class MapComponent implements OnInit {

  cli;
  // map: mapboxgl.Map;

  constructor(private route: ActivatedRoute,
              private router: Router) {
    mapboxgl.accessToken = 'pk.eyJ1Ijoic3RhbmRieW1vZGUiLCJhIjoiY2o5NzZqMTdmMDQzMDJ3cnc5aW5ueXNmeSJ9.q_l4vASYPsSkfHrAxPGjbw';
    instance = this;
  }

  ngOnInit() {
    map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/outdoors-v9',
      zoom: 13,
      center: [8.24, 50.7]
    });

    const mode = this.route.snapshot.paramMap.get('mode');
    if (mode === 'show') {
      map.addControl(new ctrls.HelloWorldControl(), 'top-left');
    }




    map.on('click', this.handleClick);

    const el = document.createElement('div');
    el.className = 'marker';
    el.style.backgroundImage = 'url(https://image.flaticon.com/icons/svg/149/149060.svg)';
    el.style.backgroundAttachment = 'top';
    el.style.backgroundSize = '25px,25px';
    el.style.backgroundRepeat = 'no-repeat';
    el.style.width = '25px';
    el.style.height = '50px';

    new mapboxgl.Marker(el)
      .setLngLat([8.24, 50.7])
      .addTo(map);

    map.on('load', function() {
      map.addSource('route_source', {
                    'type' : 'geojson',
                    'data' : {
                      'type' : 'Feature',
                      'properties' : {},
                      'geometry' : {
                    'type' : 'LineString',
                                'coordinates' : [
                                  [8.24, 50.7],
                                  [8.25, 50.7],
                                  [8.26, 50.56]
                                ]}
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


    });
  }

  public handleClick(e) {
    // alert('You clicked the map at ' + e.lngLat);

    // create a DOM element for the marker
    const el = document.createElement('div');
    el.className = 'marker';
    el.style.backgroundImage = 'url(https://image.flaticon.com/icons/svg/149/149060.svg)';
    el.style.backgroundAttachment = 'top';
    el.style.backgroundSize = '25px,25px';
    el.style.backgroundRepeat = 'no-repeat';
    el.style.width = '25px';
    el.style.height = '50px';

    const marker = new mapboxgl.Marker(el)
      .setLngLat(e.lngLat)
      .addTo(map);

    waypoints.push(marker);

    instance.fetchDirections();
  }

  public displayRoute(route) {

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

    decoded.forEach(function(c, i) {
      geojson.geometry.coordinates.push(c);
    });



    map.getSource('route_source').setData(geojson);
  }

  private buildQuery() {
    const query = [];
    waypoints.forEach((waypoint) => {
      query.push([waypoint.getLngLat().lng, waypoint.getLngLat().lat].join(','));
    });
    return query.join(';');
  }

  private fetchDirections() {
      const query = instance.buildQuery();

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
            instance.displayRoute(data.routes[0]);
          }

        }
      }
      request.onerror = () => {
        alert(JSON.parse(request.responseText).message);
      };

      request.send();
  }

}
