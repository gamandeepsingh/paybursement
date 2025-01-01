const transactionLog = require("../models/transactionLog.model");

module.exports.getAllTransactionLogs = async (req, res) => {
  const user = req.user;
  try {
    // Get all employee IDs associated with the user
    const employeeIds = user.employeesDetails.map(
      (detail) => detail.employeeId
    );

    // Find transactions only for these employees
    const transactions = await transactionLog
      .find({
        employeeId: { $in: employeeIds },
      })
      .populate({
        path: "employeeId",
        select: "fullname email phone salary",
      })
      .populate({
        path: "processedBy",
        select: "fullname.firstname fullname.lastname businessName",
      })
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      transactions,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
