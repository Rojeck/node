const express = require("express"),
  { auth } = require("../middleware/auth.js"),
  {
    getDashboards,
    postDashboard,
    editDashboard,
    deleteDashboard,

    getDashboardById,
    changeColor,
  } = require("../controllers/dashboardController.js"),
  {
    postTask,
    editTask,
    deleteTask,
    changeTaskStatus,
  } = require("../controllers/taskController"),
  { postComment, deleteComment } = require("../controllers/commentController");

const router = express.Router();

const asyncWrapper = (controller) => {
  return (req, res, next) => controller(req, res, next).catch(next);
};

router.get("/", auth, getDashboards);
router.post("/", auth, postDashboard);
router.patch("/:dashboardId", auth, editDashboard);
router.delete("/:dashboardId", auth, deleteDashboard);
router.get("/:dashboardId", auth, getDashboardById);
router.post("/:dashboardId/tasks", auth, postTask);
router.put("/:dashboardId/color/:type", auth, changeColor);
router.patch("/:dashboardId/tasks/:taskId", auth, editTask);
router.put("/:dashboardId/tasks/:taskId", auth, changeTaskStatus);
router.delete("/:dashboardId/tasks/:taskId", auth, deleteTask);
router.post("/:dashboardId/tasks/:taskId/comments/", auth, postComment);
router.delete(
  "/:dashboardId/tasks/:taskId/comments/:commentId",
  auth,
  deleteComment
);

module.exports = {
  dashboardRouter: router,
};
