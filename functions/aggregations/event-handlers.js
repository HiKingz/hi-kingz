const EventHandler = require('./../firestore-events/handling').EventHandler;
const EventTypes = require('./../firestore-events/types');

const RatingAggregator = require('./ratings').RatingAggregator;


exports.RatingAggregationHandler = class RatingAggregationHandler extends EventHandler {
  constructor() {
    super();
    this.ratingAggregator = new RatingAggregator();
  }

  onCreate(event) {
    return this.ratingAggregator.create(this._buildRateableReference(event.params), event.data.data());
  }

  onUpdate(event) {
    return this.ratingAggregator.update(
      this._buildRateableReference(event.params),
      event.data.data(),
      event.data.previous.data()
    );
  }

  onDelete(event) {
    return this.ratingAggregator.delete(this._buildRateableReference(event.params), event.data.previous.data());
  }

  _buildRateableReference(params) {
    return params.rateable + '/' + params.rateableId
  }

  static get supportedEventTypes() {
    return [EventTypes.CREATE, EventTypes.UPDATE, EventTypes.DELETE];
  }

  static get firestoreDocumentReference() {
    return '{rateable}/{rateableId}/ratings/{ratingId}';
  }
};
