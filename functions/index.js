const functions = require('firebase-functions');
const AlgoliaSync = require('./algolia/sync');

const algoliaSync = new AlgoliaSync('hi-kingz.routes');

exports.onRouteCreate = functions.firestore.document('routes/{routeId}').onCreate(
  event => algoliaSync.sync(event.params.routeId, event.data.data())
);
exports.onRouteUpdate = functions.firestore.document('routes/{routeId}').onUpdate(
  event => algoliaSync.sync(event.params.routeId, event.data.data())
);
exports.onRouteDelete = functions.firestore.document('routes/{routeId}').onDelete(
  event => algoliaSync.delete(event.params.routeId)
);
