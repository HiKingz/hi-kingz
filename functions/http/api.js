const functions = require('firebase-functions');
const admin = require('firebase-admin');
const app = require('express')();
const algoliaClient = require('./../algolia/client');


app.use(require('cors')({ origin: true }));
app.use((req, res, next) => {
  req.user = null;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
    admin
      .auth()
      .verifyIdToken(req.headers.authorization.split('Bearer ')[1])
      .then(decodedIdToken => {
        req.user = decodedIdToken;
        next();
      })
      .catch(() => {
        next();
      });
  } else {
    next();
  }
});

app.get('/algolia/search-key', (req, res) => {
  const params = {
    filters: 'isPublic:true' + (req.user ? (' OR userSignature.id:' + req.user.user_id) : ''),
    userToken: req.user ? req.user.user_id : 'anonymous'
  };

  const key = algoliaClient.generateSecuredApiKey(functions.config().algolia.search_key, params);
  res.json({key});
});

module.exports.app = app;
