const { Dashboard } = require("../models/dashboard");

function postComment(req, res, next) {
  const comment = {
    text: req.body.text,
  };
  Dashboard.updateOne(
    {
      _id: req.params.dashboardId,
      created_by: req.user.userId,
      "tasks._id": req.params.taskId,
    },
    {
      $push: {
        "tasks.$.comments": comment,
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

function deleteComment(req, res, next) {
  Dashboard.updateOne(
    {
      _id: req.params.dashboardId,
      created_by: req.user.userId,
      "tasks._id": req.params.taskId,
    },
    {
      $pull: {
        "tasks.$.comments": { _id: req.params.commentId },
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

module.exports = {
  postComment,
  deleteComment,
};
