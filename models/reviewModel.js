// review / rating / createdAt
const mongoogse = require('mongoose');

const reviewSchema = new mongoogse.Schema(
  {
    review: {
      type: String,
      required: [true, 'Review can not be empty!']
    },
    rating: {
      type: Number,
      min: 1,
      max: 5
    },
    createdAt: {
      type: Date,
      default: Date.now()
    },
    tour: {
      type: mongoogse.Schema.ObjectId,
      ref: 'Tour',
      required: [true, 'Review must belong to a tour.']
    },
    user: {
      type: mongoogse.Schema.ObjectId,
      ref: 'User',
      required: [true, 'Review must belong to a user.']
    }
  }, //When we have a virtual property (a field that is not stored in the DB but calculated using some other value) we want it to also show up whenever there is an output.
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

reviewSchema.pre(/^find/, function(next) {
  // this.populate({
  //   path: 'tour',
  //   select: 'name'
  // }).populate({
  //   path: 'user',
  //   select: 'name photo'
  // });

  this.populate({
    path: 'user',
    select: 'name photo'
  });

  next();
});

const Review = mongoogse.model('Review', reviewSchema);

module.exports = Review;
