import express from "express";
import {
  loginUser,
  logoutUser,
  registerUser,
  getUser,
  updateUser,
  userLoginStatus,
} from "../controllers/auth/userController.js";
import {
  adminMiddleware,
  creatorMilldleware,
  protect,
} from "../middleware/authMiddleware.js";
import {
  deleteUser,
  getAllUsers,
} from "../controllers/auth/adminController.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/logout", logoutUser);
router.get("/user", protect, getUser);
router.patch("/user", protect, updateUser);

// user routes
router.delete("/admin/users/:id", protect, adminMiddleware, deleteUser);
// get all users
router.get("/admin/users", protect, creatorMilldleware, getAllUsers);

// login status
router.get("/login-status", userLoginStatus);
export default router;
