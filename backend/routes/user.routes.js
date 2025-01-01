const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const {registerUser, loginUser, getUserProfile, logoutUser, updateUserProfile} = require("../controllers/user.controller")
const {authenticateUser} = require("../middlewares/auth.middleware")

router.post("/sign-up",[
    body("email").isEmail().withMessage('Invalid Email'),
    body("password").isLength({min:5}).withMessage('Password must be at least 5 characters long'),
    body("fullname.firstname").isLength({min:3}).withMessage('First Name must be at least 3 characters long'),
],registerUser)

router.post("/sign-in",[
    body("email").isEmail().withMessage('Invalid Email'),
    body("password").isLength({min:5}).withMessage('Password must be at least 5 characters long'),
],
    loginUser
)

router.post("/logout",logoutUser)
    
router.get("/profile",authenticateUser,getUserProfile)
router.post("/profile",authenticateUser,updateUserProfile)

module.exports = router;