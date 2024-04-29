const User = require("../models/user");

exports.updateMe = async (req, res, next) => {
  const { user } = req;

  const filteredBody = filterObj(
    req.body,
    "firstName",
    "lastName",
    "about",
    "avatar"
  );
  const update_user = await User.findByIdAndUpdate(user._id, filteredBody, {
    new: true,
    validatemodifiedOnly: true,
  });
  res.status(200).json({
    status: "success",
    data: update_user,
    message: "Profile updated successfully"
  })
};
