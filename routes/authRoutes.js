const {Router} = require('express')

const authController = require('../controller/authController')
const userController = require('../controller/userController')
const commonController = require('../controller/commonController')

const imageUpload = require('../service/pictureUpload')

const router = Router()

router.post('/user/signup',authController.signup_post)
router.post('/user/login',authController.login_post)
router.get('/user/:id',userController.find_get)
router.post("/update",authController.update_post)

router.post("/image",imageUpload.array("my-image-file"))//,commonController.image_post

module.exports = router
