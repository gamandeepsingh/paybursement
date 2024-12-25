const express = require("express");
const router = express.Router();
const { authenticateUser } = require("../middlewares/auth.middleware");
const { verifyResponse } = require("../controllers/auth.controller");

router.get('/check-token', authenticateUser,verifyResponse);

module.exports = router;