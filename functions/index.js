const functions = require('firebase-functions');
require('firebase-admin').initializeApp(functions.config().firebase);

const FirestoreEventManager = require('./firestore-events/handling').FirestoreEventManager;

const algoliaHandlers = require('./algolia/event-handlers');
const RouteAlgoliaSyncHandler = algoliaHandlers.RouteAlgoliaSyncHandler;
const PoiAlgoliaSyncHandler = algoliaHandlers.PoiAlgoliaSyncHandler;
const RatingAggregationHandler = require('./aggregations/event-handlers').RatingAggregationHandler;

const apiExpressApp = require('./http/api').app;


exports.api = functions.https.onRequest(apiExpressApp);

FirestoreEventManager.attachEventHandlerFunctionsToExportsObject('Route', RouteAlgoliaSyncHandler, exports);
FirestoreEventManager.attachEventHandlerFunctionsToExportsObject('Poi', PoiAlgoliaSyncHandler, exports);
FirestoreEventManager.attachEventHandlerFunctionsToExportsObject('Rateable', RatingAggregationHandler, exports);



// const app = require('express')();
// const algoliaClient = require('./algolia/client');
//
// app.use(require('cors')({ origin: true }));
// app.use((req, res, next) => {
//   req.user = null;
//
//   if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
//     admin
//       .auth()
//       .verifyIdToken(req.headers.authorization.split('Bearer ')[1])
//       .then(decodedIdToken => {
//         req.user = decodedIdToken;
//         next();
//       })
//       .catch(() => {
//         next();
//       });
//   } else {
//     next();
//   }
// });
//
// app.get('/', (req, res) => {
//   const params = {
//     filters: `isPublic:true` + req.user === null ? `` : ` OR userSignature.id:${req.user.user_id}`,
//     userToken: req.user === null ? 'anonymous' : req.user.user_id
//   };
//
//   const key = algoliaClient.generateSecuredApiKey(ALGOLIA_SEARCH_KEY, params);
//   res.json({key});
// });
// exports.api = functions.https.onRequest(app);