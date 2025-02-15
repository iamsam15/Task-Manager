import asyncHandler from "express-async-handler";
import User from "../../models/auth/userModel.js";
export const deleteUser = asyncHandler(async (req, res) => {
  const { id } = req.params;

  // attempt to find and delete the user

  try {
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User deleted Successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Cannot delete user" });
  }
});
