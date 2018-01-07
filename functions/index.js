require('firebase-admin').initializeApp(require('firebase-functions').config().firebase);

const FirestoreEventManager = require('./firestore-events/handling').FirestoreEventManager;

const AlgoliaSyncHandler = require('./algolia/event-handlers').AlgoliaSyncHandler;
const RatingAggregationHandler = require('./aggregations/event-handlers').RatingAggregationHandler;


FirestoreEventManager.attachEventHandlerFunctionsToExportsObject('Route', AlgoliaSyncHandler, exports);
FirestoreEventManager.attachEventHandlerFunctionsToExportsObject('Rateable', RatingAggregationHandler, exports);
