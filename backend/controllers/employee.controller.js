const User = require("../models/user.model");
const Employee = require("../models/employee.model");
const Schedule = require("../models/schedule.model");
const { validationResult } = require("express-validator");
const TransactionLog = require("../models/transactionLog.model");
const { default: mongoose } = require("mongoose");

// Controller to Add Employee Details
const addEmployee = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const { firstname, lastname, email, phone, bankDetails, salary, schedule } =
      req.body;

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
  const { _id: userId } = req.user;

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
      return res
        .status(404)
        .json({ message: "User with this employee not found" });
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

const updateEmployeeDetails = async (req, res) => {
  try {
    const { employeeId } = req.params;
    const {id:userId} = req.user; 
    const updateData = req.body;

    // Check if the user has this employee
    const user = await User.findOne({
      _id: userId,
      "employeesDetails.employeeId": employeeId,
    });

    if (!user) {
      return res
        .status(404)
        .json({
          message:
            "Employee not found or you don't have permission to update this employee",
        });
    }

    // Update employee details
    const updatedEmployee = await Employee.findByIdAndUpdate(
      employeeId,
      { $set: updateData },
      { new: true, runValidators: true }
    );

    if (!updatedEmployee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    // If schedule is being updated, update or create a new schedule
    if (updateData.schedule) {
      if (updatedEmployee.scheduleId) {
        await Schedule.findByIdAndUpdate(
          updatedEmployee.scheduleId,
          { $set: updateData.schedule },
          { runValidators: true }
        );
      } else {
        const newSchedule = new Schedule({
          ...updateData.schedule,
          createdBy: employeeId,
        });
        const savedSchedule = await newSchedule.save();
        updatedEmployee.scheduleId = savedSchedule._id;
        await updatedEmployee.save();
      }
    }

    res.status(200).json({
      message: "Employee details updated successfully",
      employee: updatedEmployee,
    });
  } catch (error) {
    console.error("Error updating employee details:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const deleteEmployee = async (req, res) => {
  const { employeeId } = req.params;
  const userId = req.user._id;

  try {
    // Step 1: Find the employee
    const employee = await Employee.findById(employeeId);

    if (!employee) {
      return res.status(404).json({ error: "Employee not found" });
    }

    // Step 2: Remove references from user documents
    const userUpdateResult = await User.updateOne(
      { _id: userId },
      { $pull: { employeesDetails: { employeeId: new mongoose.Types.ObjectId(employeeId) } } }
    );

    if (userUpdateResult.modifiedCount === 0) {
      return res.status(400).json({ error: "Failed to update user employee details" });
    }

    // Step 3: Delete related schedules and transaction logs
    if (employee.scheduleId) {
      await Schedule.findByIdAndDelete(employee.scheduleId);
    }

    if (employee.transactionLogId.length > 0) {
      await TransactionLog.deleteMany({
        _id: { $in: employee.transactionLogId },
      });
    }

    // Step 4: Delete the employee
    await Employee.findByIdAndDelete(employeeId);

    return res.status(200).json({ message: "Employee and associated data deleted successfully" });
  } catch (error) {
    console.error("Error deleting employee:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};


const addTransactionLog = async (req, res) => {
  const { employeeId } = req.params;
  const user = req.user;

  if (!mongoose.Types.ObjectId.isValid(employeeId)) {
    return res.status(400).json({ error: "Invalid employee ID" });
  }

  try {
    // Step 1: Find and delete the employee
    const employee = await Employee.findById(employeeId);

    if (!employee) {
      return res.status(404).json({ error: "Employee not found" });
    }


    // Step 2: Remove references from user documents
    await user.updateOne(
      { "employeesDetails.employeeId": employeeId },
      { $pull: { employeesDetails: { employeeId: employeeId } } }
    );

    // Step 3: Delete related schedules and transaction logs
    if (employee.scheduleId) {
      await Schedule.findByIdAndDelete(employee.scheduleId);
    }

    if (employee.transactionLogId.length > 0) {
      await TransactionLog.deleteMany({
        _id: { $in: employee.transactionLogId },
      });
    }

    // Step 4: Delete the employee
    await Employee.findByIdAndDelete(employeeId);

    return res.status(200).json({ message: "Employee and associated data deleted successfully" });
  } catch (error) {
    console.error("Error deleting employee:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  addEmployee,
  getEmployeeDetails,
  addTransactionLog,
  deleteEmployee,
  getAllEmployeeDetails,
  updateEmployeeDetails,
};
