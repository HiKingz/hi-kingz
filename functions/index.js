require('firebase-admin').initializeApp(require('firebase-functions').config().firebase);

const FirestoreEventManager = require('./firestore-events/handling').FirestoreEventManager;

const algoliaHandlers = require('./algolia/event-handlers');
const RouteAlgoliaSyncHandler = algoliaHandlers.RouteAlgoliaSyncHandler;
const PoiAlgoliaSyncHandler = algoliaHandlers.PoiAlgoliaSyncHandler;
const RatingAggregationHandler = require('./aggregations/event-handlers').RatingAggregationHandler;


FirestoreEventManager.attachEventHandlerFunctionsToExportsObject('Route', RouteAlgoliaSyncHandler, exports);
FirestoreEventManager.attachEventHandlerFunctionsToExportsObject('Poi', PoiAlgoliaSyncHandler, exports);
FirestoreEventManager.attachEventHandlerFunctionsToExportsObject('Rateable', RatingAggregationHandler, exports);
