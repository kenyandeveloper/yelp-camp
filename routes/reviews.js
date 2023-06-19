const express = require('express');
const router = express.Router({mergeParams:true});
const {validateReview, isLoggedIn, isReviewAuthor} = require('../middleware')
const Campground = require('../models/campgrounds');
const Review = require('../models/review');

const { reviewSchema } = require('../schemas.js');

const ExpressError = require('../utils/ExpressError');
const reviews = require('../controllers/reviews');
const catchAsync = require('../utils/catchAsync');



router.post('/', isLoggedIn, validateReview, catchAsync(reviews.createReview))

router.delete('/:reviewId', isLoggedIn, isReviewAuthor, catchAsync(reviews.deleteReview))

module.exports = router;