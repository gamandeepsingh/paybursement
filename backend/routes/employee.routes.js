const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const {authenticateUser} = require("../middlewares/auth.middleware");
const { addEmployee, getEmployeeDetails, addTransactionLog, getAllEmployeeDetails } = require("../controllers/employee.controller");

router.post("/add-employee",[
    body("firstname").isLength({min:3}).withMessage('First Name must be at least 3 characters long'),
    body("email").isEmail().withMessage('Invalid Email'),
    body("phone").isMobilePhone().withMessage('Invalid Phone Number'),
    body("bankDetails").isObject().withMessage('Invalid Bank Details'),
    body("salary").isNumeric().withMessage('Invalid Salary'),
    body("schedule").isObject().optional().withMessage('Invalid Schedule'),
    body("transactionDetails").isObject().optional().withMessage('Invalid Transaction Details'),
], authenticateUser,addEmployee);

router.get("/get-employee-by-userId/",authenticateUser, getAllEmployeeDetails);
router.get("/get-employee/:employeeId",[
    body("employeeId").isMongoId().withMessage('Invalid Employee ID'),
], authenticateUser, getEmployeeDetails);


router.post("/add-transaction-log",[
    body("employeeId").isMongoId().withMessage('Invalid Employee ID'),
    body("amount").isNumeric().withMessage('Invalid Amount'),
    body("transactionId").isString().withMessage('Invalid Transaction ID'),
    body("userId").isMongoId().withMessage('Invalid User ID'),
], authenticateUser, addTransactionLog);



module.exports = router;