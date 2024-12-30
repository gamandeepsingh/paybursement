const User = require("../models/user.model");
const Employee = require("../models/employee.model");
const Schedule = require("../models/schedule.model");
const { validationResult } = require("express-validator");
const TransactionLog = require("../models/transactionLog.model");

// Controller to Add Employee Details
const addEmployee = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const {
      firstname,
      lastname,
      email,
      phone,
      bankDetails,
      salary,
      schedule,
    } = req.body;

    const user = await User.findById(req.user._id);
    
    // Validate User Exists
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Create Schedule (Optional)
    let createdSchedule = null;
    if (schedule) {
      createdSchedule = await Schedule.create({
        frequency: schedule.frequency,
        nextRun: schedule.nextRun,
        status: schedule.status || "Active",
        createdBy: user._id,
      });
    }

    // Create Employee
    const newEmployee = await Employee.create({
      fullname: { firstname, lastname },
      email,
      phone,
      bankDetails,
      salary,
      createdBy: user._id,
      scheduleId: createdSchedule?._id || null,
    });

    // Create Transaction Log (Optional)
    // let createdTransactionLog = null;
    // if (transactionDetails) {
    //   createdTransactionLog = await TransactionLog.create({
    //     employeeId: newEmployee._id,
    //     processedBy: userId,
    //     amount: transactionDetails.amount,
    //     status: transactionDetails.status || "Pending",
    //     transactionId: transactionDetails.transactionId,
    //   });

    //   // Associate Transaction Log with Employee
    //   newEmployee.transactionLogId = createdTransactionLog._id;
    //   await newEmployee.save();
    // }

    // Add Employee to User's List
    user.employeesDetails.push({
      employeeId: newEmployee._id,
      scheduleId: createdSchedule?._id || null,
    });
    await user.save();

    res.status(201).json({
      message: "Employee added successfully",
      employee: newEmployee,
      schedule: createdSchedule,
    });
  } catch (error) {
    console.error("Error adding employee:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const getAllEmployeeDetails = async (req, res) => {
  const { _id:userId } = req.user;

  try {
    // Check if the user exists
    const user = await User.findById(userId).populate({
      path: "employeesDetails.employeeId",
      model: "employee",
      populate: {
        path: "transactionLogId",
        model: "transactionLog", // Adjust this to your actual model
      },
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Return employee details
    res.status(200).json({ employees: user.employeesDetails });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

const getEmployeeDetails = async (req, res) => {
  try {
    const { employeeId } = req.params;

    // Find the employee by ID
    const employee = await Employee.findById(employeeId).populate({
      path: "scheduleId",
      select: "frequency nextRun status",
    });

    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    // Find the user containing the employee details
    const user = await User.findOne({
      "employeesDetails.employeeId": employeeId,
    }).populate({
      path: "employeesDetails.transactionLogId.id",
      model: "transactionLog",
      select: "amount status transactionId createdAt",
    });

    if (!user) {
      return res.status(404).json({ message: "User with this employee not found" });
    }

    // Extract employee details from the user document
    const employeeDetails = user.employeesDetails.find(
      (detail) => detail.employeeId.toString() === employeeId
    );

    if (!employeeDetails) {
      return res.status(404).json({ message: "Employee details not found" });
    }

    res.status(200).json({
      employee,
      transactions: employeeDetails.transactionLogId.map((log) => ({
        id: log.id?._id,
        amount: log.id?.amount,
        status: log.id?.status,
        transactionId: log.id?.transactionId,
        createdAt: log.id?.createdAt,
      })),
    });
  } catch (error) {
    console.error("Error fetching employee details:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const addTransactionLog = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { employeeId, userId, amount, transactionId } = req.body;

  try {
    // Validate inputs
    if (!employeeId || !userId || !amount || !transactionId) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const employee = await Employee.findById(employeeId);
    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Create the transaction log
    const transactionLog = new TransactionLog({
      employeeId,
      processedBy: userId,
      amount,
      status: "Success", // Assuming the transaction was successful
      transactionId,
    });

    await transactionLog.save();

    // Update the employee's transaction logs
    employee.transactionLogId.push(transactionLog._id);
    await employee.save();

    // Update the user's employeesDetails
    const employeeDetail = user.employeesDetails.find(
      (detail) => detail.employeeId.toString() === employeeId
    );

    if (employeeDetail) {
      employeeDetail.transactionLogId.push({
        id: transactionLog._id,
        createdAt: transactionLog.createdAt,
      });
    } else {
      user.employeesDetails.push({
        employeeId,
        transactionLogId: [
          { id: transactionLog._id, createdAt: transactionLog.createdAt },
        ],
      });
    }

    await user.save();

    // Return success response
    res.status(200).json({
      message: "Transaction log added successfully",
      transactionLog,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

module.exports = { addEmployee,getEmployeeDetails,addTransactionLog,getAllEmployeeDetails };
