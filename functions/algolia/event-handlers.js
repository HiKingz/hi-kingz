const EventTypes = require('./../firestore-events/types');
const EventHandler = require('./../firestore-events/handling').EventHandler;

const AlgoliaSync = require('./sync');


exports.AlgoliaSyncHandler = class AlgoliaSyncHandler extends EventHandler {
  constructor() {
    super();
    this.algoliaSync = new AlgoliaSync('hi-kingz.routes');
  }

  onCreate(event) {
    return this.algoliaSync.sync(event.params.routeId, event.data.data());
  }

  onUpdate(event) {
    return this.algoliaSync.sync(event.params.routeId, event.data.data());
  }

  onDelete(event) {
    return this.algoliaSync.delete(event.params.routeId);
  }

  static get supportedEventTypes() {
    return [EventTypes.CREATE, EventTypes.UPDATE, EventTypes.DELETE];
  }

  static get firestoreDocumentReference() {
    return 'routes/{routeId}';
  }
};
