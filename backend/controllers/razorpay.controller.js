const Razorpay = require("razorpay");
const crypto = require("crypto");
const dotenv = require("dotenv");
const { validationResult } = require("express-validator");
dotenv.config();

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});


const createOrder = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ error: errors.array(),success:false});
    }
    const { amount } = req.body;
    if(!amount || amount < 1){
        return res.status(400).json({ error: "Invalid amount",success:false });
    }
    const options = {
        amount: amount,
        currency: "INR",
    };
    
    try {
        const order = await razorpay.orders.create(options);
        if (!order) {
            return res.status(500).json({ error: "Failed to create order",success:false });
        }
        res.status(200).json({order,success:true});
    } catch (err) {
        res.status(500).json({ error: err.message,success:false });
    }
};

const verifyPayment = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ error: errors.array(),success:false});
    }
    const { paymentId, orderId, signature } = req.body;

    const secret = process.env.RAZORPAY_KEY_SECRET;
    if (!secret) {
        return res.status(500).json({ error: "Missing Razorpay secret key",success:false });
    }
    const generatedSignature = crypto
        .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
        .update(`${orderId}|${paymentId}`)
        .digest("hex");
    
    if (generatedSignature === signature) {
        res.json({ message: "Payment verified successfully!",success:true });
    } else {
        res.status(400).json({ error: "Invalid payment signature",success:false });
    }
};

module.exports = {
    createOrder,
    verifyPayment,
};