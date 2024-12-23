const mongoose = require('mongoose');

const scheduleSchema = new mongoose.Schema({
    frequency: {
      type: String,
      enum: ['Daily', 'Weekly', 'Monthly'],
      required: true,
    },
    nextRun: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      enum: ['Active', 'Inactive'],
      default: 'Active',
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'employee', // Relating to the user who created the schedule
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  });
  
  module.exports = mongoose.model('schedule', scheduleSchema);
  