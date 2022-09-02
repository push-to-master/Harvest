import express from "express"
import RestaurantCtrl from "../controller/restaurants.controller.js"
import ReviewsCtrl from "../controller/reviews.controller.js"

const router = express.Router()

router.route("/").get(RestaurantCtrl.apiGetRestaurants)
router.route("/id/:id").get(RestaurantCtrl.apiGetRestaurantById)
router.route("/cuisines").get(RestaurantCtrl.apiGetRestaurantCuisines)

router
    .route("/review")
    .post(ReviewsCtrl.apiPostReview)
    .put(ReviewsCtrl.apiUpdateReview)
    .delete(ReviewsCtrl.apiDeleteReview)

export default router