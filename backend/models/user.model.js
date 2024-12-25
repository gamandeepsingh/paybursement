const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  fullname: {
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
  password: {
    type: String,
    required: true,
    select: false,
  },
  razorpayCustomerId: {
    type: String,
  },
  razorpaySecectKey: {
    type: String,
  },
  bankDetails: {
    accountNumber: {
      type: String,
    },
    ifsc: {
      type: String,
    },
    accountHolderName: {
      type: String,
    },
  },
  businessName: {
    type: String,
  },
  phone: {
    type: Number,
  },
  gstNumber: {
    type: String,
  },
  employeesDetails: [
    {
      employeeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "employee",
      },
      transactionLogId: [
        {
          id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "transactionLog",
          },
          createdAt: {
            type: Date,
            default: Date.now,
          },
        },
      ],
      scheduleId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "schedule",
      },
    },
  ],
});

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id }, process.env.JWT_KEY, {
    expiresIn: "24h",
  });
  return token;
};

userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

userSchema.statics.hashPassword = async function (password) {
  return await bcrypt.hash(password, 10);
};

const userModel = mongoose.model("user", userSchema);

module.exports = userModel;
