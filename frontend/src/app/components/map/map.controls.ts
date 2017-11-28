import * as mapboxgl from 'mapbox-gl';

export class HelloWorldControl {

  _container;
  _map: mapboxgl.Map;

  onAdd(map) {
    this._map = map;
    this._container = document.createElement('div');
    this._container.className = 'mapboxgl-ctrl';
    this._container.textContent = 'Hello, world';
    return this._container;
  }

  onRemove() {
    this._container.parentNode.removeChild(this._container);
    this._map = undefined;
  }
}
