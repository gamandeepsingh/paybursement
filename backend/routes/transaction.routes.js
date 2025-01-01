const express = require("express");
const { getAllTransactionLogs } = require("../controllers/transaction.controller");
const { authenticateUser } = require("../middlewares/auth.middleware");
const router = express.Router();

router.get("/logs",authenticateUser,getAllTransactionLogs)

module.exports = router;