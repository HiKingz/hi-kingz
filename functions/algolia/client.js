const functions = require('firebase-functions');

module.exports = require('algoliasearch')(functions.config().algolia.app_id, functions.config().algolia.api_key);
