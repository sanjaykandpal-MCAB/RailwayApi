const mongoose = require('mongoose');

const TrainSchema = new mongoose.Schema({
  trainNumber: {
    type: String,
    required: true
  },
  trainType: {
    type: String,
    required: true
  },
  capacity: {
    type: Number,
    required: true,
    min: 0
  }
});

const MaintenanceScheduleSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true
  },
  description: {
    type: String,
    required: true
  }
});

const RailwaySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  trains: [TrainSchema],
  stations: [{
    type: String,
    required: true
  }],
  routes: [{
    type: String,
    required: true
  }],
  operatingHours: {
    start: {
      type: String,
      required: true,
      match: /^([01]\d|2[0-3]):([0-5]\d)$/  // HH:MM format
    },
    end: {
      type: String,
      required: true,
      match: /^([01]\d|2[0-3]):([0-5]\d)$/  // HH:MM format
    }
  },
  maintenanceSchedule: [MaintenanceScheduleSchema]
}, {
  timestamps: true
});

const Railway = mongoose.model('Railway', RailwaySchema);

module.exports = Railway;