const express = require('express');
const reviewContoller = require('../controllers/reviewController');
const authController = require('../controllers/authController');

const reviewRouter = express.Router({ mergeParams: true });

// Auth MIDDLEWARE 👇
reviewRouter.use(authController.protect);
// After this 👆  MIDDLEWARE  👇 Users must be authenticated. Route will be protected

reviewRouter
  .route('/')
  .get(reviewContoller.getAllReviews)
  .post(
    authController.restrictTo('user'),
    // If using factory function
    //  START
    reviewContoller.setTourUserUds,
    // END
    reviewContoller.createReview
  );

reviewRouter
  .route('/:id')
  .get(reviewContoller.getReview)
  .patch(
    authController.restrictTo('user', 'admin'),
    reviewContoller.updateReview
  )
  .delete(
    authController.restrictTo('user', 'admin'),
    reviewContoller.deleteReview
  );

module.exports = reviewRouter;
