import express from "express"
import RestaurantCtrl from "../controller/restaurants.controller.js"
import ReviewsCtrl from "../controller/reviews.controller.js"
import LogsCtrl from "../controller/logs.controller.js"
import LoginCtrl from "../controller/login.controller.js"
import OrgsCtrl from "../controller/orgs.controller.js"
import CategoryCtrl from "../controller/category.controller.js"

const router = express.Router()

router.route("/").get(RestaurantCtrl.apiGetRestaurants)
router.route("/id/:id").get(RestaurantCtrl.apiGetRestaurantById)
router.route("/cuisines").get(RestaurantCtrl.apiGetRestaurantCuisines)

router
    .route("/review")
    .post(ReviewsCtrl.apiPostReview)
    .put(ReviewsCtrl.apiUpdateReview)
    .delete(ReviewsCtrl.apiDeleteReview)

router
    .route("/logs")
    .get(LogsCtrl.apiGetLogs)
    .post(LogsCtrl.apiPostLog)

router
    .route("/login")
    .get(LoginCtrl.apiGetUser)
    .post(LoginCtrl.apiPostUser)

router
    .route("/orgs")
    .get(OrgsCtrl.apiGetOrgs)
    .post(OrgsCtrl.apiPostOrg)

router
    .route("/category")
    .get(CategoryCtrl.apiGetCategory)
export default router