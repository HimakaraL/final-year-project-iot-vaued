import { errorHandler } from "../utils/error.js";
import bcryptjs from "bcryptjs";
import User from "../models/user.model.js";

export const test = (req, res) => {
  res.json({
    message: "API is WOrking",
  });
};


// update user details
export const updateUser = async (req, res, next) => {
  if (req.user.id !== req.params.id) {
    return next(
      errorHandler(403, "You can only update your own account"),
    );
  }
  try {
    if (req.body.password) {
      req.body.password = bcryptjs.hashSync(req.body.password, 10);
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          password: req.body.password,
          profilePicture: req.body.profilePicture,
        }
      },
      { new: true },
    );
    const { password, ...rest } = updatedUser._doc;
    res.status(200).json(rest);
  } catch (error) {
    next(errorHandler(500, "Internal Server Error"));
  }
}

// delete user account
export const deleteUser = async (req, res, next) => {
  if (req.user.id !== req.params.id) {
    return next(
      errorHandler(403, "You can only delete your own account"),
    );
  }
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json({
      success: true,
      message: "User account deleted successfully",
    });
  }
  catch (error) {
    next(errorHandler(500, "Internal Server Error"));
  }
}