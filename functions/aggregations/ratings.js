const firestore = require('firebase-admin').firestore();


exports.RatingAggregator = class {
  create(rateableReference, rating) {
    return this._updateRatingAggregationInTransaction(rateableReference, rateableData =>
      this._buildRatingAggregation(
        rateableData.hasOwnProperty('ratingAggregation')
          && rateableData.ratingAggregation.hasOwnProperty('count')
          && ++rateableData.ratingAggregation.count
        || 1,
        rateableData.hasOwnProperty('ratingAggregation')
          && rateableData.ratingAggregation.hasOwnProperty('sum')
          && rateableData.ratingAggregation.sum + rating.rating
        || rating.rating
      )
    );
  }

  update(rateableReference, rating, oldRating) {
    return this._updateRatingAggregationInTransaction(rateableReference, rateableData =>
      this._buildRatingAggregation(
        rateableData.ratingAggregation.count,
        rateableData.ratingAggregation.sum - oldRating.rating + rating.rating
      )
    );
  }

  delete(rateableReference, oldRating) {
    return this._updateRatingAggregationInTransaction(rateableReference, rateableData =>
      this._buildRatingAggregation(
        --rateableData.ratingAggregation.count,
        rateableData.ratingAggregation.sum - oldRating.rating
      )
    );
  }

  _buildRatingAggregation(count, sum) {
    return {
      ratingAggregation: {
        count: count,
        sum: sum,
        avg: sum / count
      }
    };
  }

  _updateRatingAggregationInTransaction(rateableReference, ratingObjectFactory) {
    return firestore.runTransaction(transaction => {
      const rateableDocument = firestore.doc(rateableReference);
      return transaction.get(rateableDocument).then(rateable => {
        const rateableData = rateable.data();
        return transaction.update(rateableDocument, ratingObjectFactory(rateableData));
      });
    });
  }
};
