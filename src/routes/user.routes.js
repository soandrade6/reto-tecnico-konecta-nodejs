import express from "express";
import {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
} from "../controllers/user.controller.js";
import { verifyToken } from "../middleware/auth.middleware.js";
import { isAdmin } from "../middleware/role.middleware.js";

const router = express.Router();

router.use(verifyToken);

// Solo ADMIN
router.post("/", isAdmin, createUser);
router.get("/", isAdmin, getUsers);
router.get("/:id", isAdmin, getUserById);
router.put("/:id", isAdmin, updateUser);
router.delete("/:id", isAdmin, deleteUser);

export default router;
