const { Dashboard } = require("../models/dashboard");

function postTask(req, res, next) {
  const task = {
    name: req.body.name,
    description: req.body.description,
    status: req.body.status,
  };
  Dashboard.updateOne(
    {
      _id: req.params.dashboardId,
      created_by: req.user.userId,
    },
    {
      $push: {
        tasks: task,
      },
    }
  )
    .then((element) => {
      res.status(200).json({
        message: "success",
      });
    })
    .catch((err) => {
      res.status(400).json({
        message: err.message,
      });
    });
}

function editTask(req, res, next) {


  Dashboard.updateOne(
    {
      _id: req.params.dashboardId,
      "tasks._id": req.params.taskId,
    },
    {
      $set: {
        "tasks.$.name": req.body.name,
        "tasks.$.description": req.body.description,
      },
    }
  )
    .then((element) => {
      res.status(200).json({
        message: "success",
        body: element,
      });
    })
    .catch((err) => {
      res.status(400).json({
        message: err.message,
      });
    });
}

function changeTaskStatus(req, res, next) {
  Dashboard.updateOne(
    {
      _id: req.params.dashboardId,
      "tasks._id": req.params.taskId,
    },
    {
      $set: {
        "tasks.$.status": req.body.status,
      },
    }
  )
    .then((element) => {
      res.status(200).json({
        message: "success",
        body: element,
      });
    })
    .catch((err) => {
      res.status(400).json({
        message: err.message,
      });
    });
}

function deleteTask(req, res, next) {
  Dashboard.updateOne(
    {
      _id: req.params.dashboardId,
      created_by: req.user.userId,
    },
    {
      $pull: {
        tasks: { _id: req.params.taskId },
      },
    }
  )
    .then(() => {
      res.status(200).json({
        message: "success",
      });
    })
    .catch((err) => {
      res.status(400).json({
        message: err.message,
      });
    });
}

module.exports = {
  postTask,
  editTask,
  deleteTask,
  changeTaskStatus
};
