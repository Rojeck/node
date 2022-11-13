const mongoose = require("mongoose"),
  Joi = require("joi");

const dashboardJoiSchema = Joi.object({
  name: Joi.string().alphanum().min(2).max(30),
});
const commentsSchema = new mongoose.Schema(
  {
    id: {
      type: mongoose.Schema.Types.ObjectId,
    },
    text: {
      type: String,
      required: true,
    },
  },
  { timestamps: {createdAt: 'created_at', updatedAt: false} }
);
const tasksSchema = new mongoose.Schema(
  {
    id: {
      type: mongoose.Schema.Types.ObjectId,
    },
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    timestamps: {},

    status: {
      type: String,
      enum: ["TODO", "IN_PROGRESS", "DONE", "ARCHIVED"],
      required: true,
    },
    comments: [commentsSchema],
  },
  { timestamps: {createdAt: 'created_at', updatedAt: false} }
);
const dashboardSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    created_by: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    colors: {
      TODO: {
        type: String,
        default: '#ffffff'
      },
      IN_PROGRESS: {
        type: String,
        default: '#ffffff'
      },
      DONE: {
        type: String,
        default: '#ffffff'
      }
    },
    tasks: [tasksSchema],
  },
  { timestamps: {createdAt: 'created_at', updatedAt: false} }
);

const Dashboard = mongoose.model("Dashboard", dashboardSchema);

module.exports = {
  Dashboard,
  dashboardJoiSchema,
};
