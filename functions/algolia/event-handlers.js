const EventTypes = require('./../firestore-events/types');
const EventHandler = require('./../firestore-events/handling').EventHandler;

const AlgoliaSync = require('./sync');


class RouteAlgoliaSyncHandler extends EventHandler {
  constructor() {
    super();
    this.algoliaSync = new AlgoliaSync('hi-kingz.routes');
  }

  onCreate(event) {
    return this._syncEvent(event);
  }

  onUpdate(event) {
    return this._syncEvent(event);
  }

  onDelete(event) {
    return this.algoliaSync.delete(event.params.routeId);
  }

  _syncEvent(event) {
    return this.algoliaSync.sync(event.params.routeId, event.data.data());
  }

  static get supportedEventTypes() {
    return [EventTypes.CREATE, EventTypes.UPDATE, EventTypes.DELETE];
  }

  static get firestoreDocumentReference() {
    return 'routes/{routeId}';
  }
}


class PoiAlgoliaSyncHandler extends RouteAlgoliaSyncHandler {
  constructor() {
    super();
    this.algoliaSync = new AlgoliaSync('hi-kingz.pois');
  }

  _syncEvent(event) {
    const data = event.data.data();
    data['_geoloc'] = {
      lat: data.point.latitude,
      lng: data.point.longitude
    };
    return this.algoliaSync.sync(event.params.poiId, data);
  }

  static get firestoreDocumentReference() {
    return 'pois/{poiId}';
  }
}


exports.RouteAlgoliaSyncHandler = RouteAlgoliaSyncHandler;
exports.PoiAlgoliaSyncHandler = PoiAlgoliaSyncHandler;