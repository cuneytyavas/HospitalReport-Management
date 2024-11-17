import User from "../models/user.model.js";

const adninRoute = async (req, res, next) => {
  try {
    const reqUser = await User.findOne({ _id: req.userId });
    if (reqUser.role !== "admin") {
      return res
        .status(403)
        .json({ message: "Bu işlemi yapmaya yetkiniz yok." });
    }
    next();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export default adninRoute;
