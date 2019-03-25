
exports.get_dashboard_data = (req, res, next) => {
  res.status(200).json({
    message: "Successfully retrieved Dashboard data",
    heading: "DASHBOARD"
  });
};
