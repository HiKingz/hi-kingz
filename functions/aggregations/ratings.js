const firestore = require('firebase-admin').firestore();


exports.RatingAggregator = class {
  create(rateableReference, rating) {
    return this._updateRatingAggregationInTransaction(rateableReference, rateableData => {
      return {
        ratingAggregation: {
          ratingsCount:
            rateableData.hasOwnProperty('ratingAggregation')
              && rateableData.ratingAggregation.hasOwnProperty('ratingsCount')
              && ++rateableData.ratingAggregation.ratingsCount
            || 1,
          ratingsSum:
            rateableData.hasOwnProperty('ratingAggregation')
              && rateableData.ratingAggregation.hasOwnProperty('ratingsSum')
              && rateableData.ratingAggregation.ratingsSum + rating.rating
            || rating.rating
        }
      }
    });
  }

  update(rateableReference, rating, oldRating) {
    return this._updateRatingAggregationInTransaction(rateableReference, rateableData => {
      return {
        ratingAggregation: {
          ratingsCount: rateableData.ratingAggregation.ratingsCount,
          ratingsSum: rateableData.ratingAggregation.ratingsSum - oldRating.rating + rating.rating
        }
      }
    });
  }

  delete(rateableReference, oldRating) {
    return this._updateRatingAggregationInTransaction(rateableReference, rateableData => {
      return {
        ratingAggregation: {
          ratingsCount: --rateableData.ratingAggregation.ratingsCount,
          ratingsSum: rateableData.ratingAggregation.ratingsSum - oldRating.rating
        }
      }
    });
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
