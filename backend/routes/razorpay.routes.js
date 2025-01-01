const express = require('express');
const { createOrder, verifyPayment } = require("../controllers/razorpay.controller.js");
const { body } = require("express-validator");
const { authenticateUser } = require('../middlewares/auth.middleware.js');
const router = express.Router();

router.post("/create-order",[
    body("amount").isNumeric().withMessage('Invalid Amount'),
],authenticateUser,createOrder);

router.post("/verify-payment",[
    body("paymentId").isString().withMessage('Invalid Payment ID'),
    body("orderId").isString().withMessage('Invalid Order ID'),
    body("signature").isString().withMessage('Invalid Signature'),
],authenticateUser,verifyPayment);

module.exports = router;