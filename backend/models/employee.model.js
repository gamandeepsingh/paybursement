const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
    fullname:{
      firstname: {
        type: String,
        required: true,
        minlength: [3, "First name must be at least 3 characters long"],
        trim: true,
      },
      lastname: {
        type: String,
        time: true,
      },
    },
    email: {
      type: String,
      required: true,
      unique: true,
      minlength: [5, "Email must be at least 5 characters long"],
    },
    phone: {
      type: String,
      required: true,
    },
    bankDetails: {
      accountNumber: {
        type: String,
        required: true,
      },
      ifsc: {
        type: String,
        required: true,
      },
      accountHolderName: {
        type: String,
        required: true,
      },
    },
    salary: {
      type: Number,
      required: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user', // Relating to the user who created this employee
      required: true,
    },
    scheduleId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "schedule",
    },
    transactionLogId:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "transactionLog",
    }],
    createdAt: {
      type: Date,
      default: Date.now,
    },
  });
  
  module.exports = mongoose.model('employee', employeeSchema);
  