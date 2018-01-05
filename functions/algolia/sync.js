const algoliaClient = require('./client');

class AlgoliaSync {
  constructor(index) {
    this.algoliaIndex = algoliaClient.initIndex(index);
  }

  sync(id, data) {
    data.objectID = id;
    return this.algoliaIndex.saveObject(data);
  }

  delete(id) {
    return this.algoliaIndex.deleteObject(id);
  }
}

module.exports = AlgoliaSync;
