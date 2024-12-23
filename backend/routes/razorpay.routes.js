const express = require('express');
const { createOrder, verifyPayment } = require("../controllers/razorpay.controller.js");
const { body } = require("express-validator");
const router = express.Router();

router.post("/create-order",[
    body("amount").isNumeric().withMessage('Invalid Amount'),
],createOrder);
router.post("/verify-payment",[
    body("paymentId").isString().withMessage('Invalid Payment ID'),
    body("orderId").isString().withMessage('Invalid Order ID'),
    body("signature").isString().withMessage('Invalid Signature'),
],verifyPayment);

module.exports = router;