const mongoose = require("mongoose");

const JobSchema = new mongoose.Schema({
    language: {
        type: String,
        required: true,
    },
    filePath: {
        type: String
    },
   submittedAt: {
       type: Date,
       default: Date.now
   },
  startedAt:{
      type: Date
  },
  completedAt:{
      type: Date
  },
  output: {
      type: String
  }
});

module.exports = mongoose.model("Job", JobSchema)