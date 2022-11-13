const { Dashboard, dashboardJoiSchema } = require("../models/dashboard");

function getDashboards(req, res) {
  Dashboard.find({ created_by: req.user.userId })
    .then((element) => {
      res.status(200).json(element);
    })
    .catch((err) => {
      res.status(500).json({
        message: err.message,
      });
    });
}

function postDashboard(req, res) {
  const dashboard = new Dashboard({
    name: req.body.name,
    description: req.body.description,
    created_by: req.user.userId,
  });
  dashboard
    .save()
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

function changeColor(req, res) {
  updateContainerColorSwitch(req)
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

function updateContainerColorSwitch(req) {
  switch (req.params.type) {
    case "TODO": {
      return Dashboard.updateOne(
        { _id: req.params.dashboardId, created_by: req.user.userId },
        {
          $set: {
            "colors.TODO": req.body.color,
          },
        }
      );
    }

    case "IN_PROGRESS": {
      return Dashboard.updateOne(
        { _id: req.params.dashboardId, created_by: req.user.userId },
        {
          $set: {
            "colors.IN_PROGRESS": req.body.color,
          },
        }
      );
    }
    case "DONE": {
      return Dashboard.updateOne(
        { _id: req.params.dashboardId, created_by: req.user.userId },
        {
          $set: {
            "colors.DONE": req.body.color,
          },
        }
      );
    }

    default:
      break;
  }
}

function editDashboard(req, res) {
  const { name, description } = req.body;
  Dashboard.findByIdAndUpdate(
    { _id: req.params.dashboardId, created_by: req.user.userId },
    {
      name: name,
      description: description,
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

function deleteDashboard(req, res) {
  Dashboard.findByIdAndDelete({
    _id: req.params.dashboardId,
    created_by: req.user.userId,
  })
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

// to delete

function getDashboardById(req, res) {
  Dashboard.findById({
    _id: req.params.dashboardId,
    created_by: req.user.userId,
  })
    .then((element) => {
      res.status(200).json(element);
    })
    .catch((err) => {
      res.status(400).json({
        message: err.message,
      });
    });
}

module.exports = {
  getDashboards,
  postDashboard,
  editDashboard,
  deleteDashboard,
  getDashboardById,
  changeColor,
};
