import express from "express";
import { registerUser } from "../controller/user.controller.js";
import { getUser } from "../controller/user.controller.js";
import { updateUser } from "../controller/user.controller.js";
import { deleteUser } from "../controller/user.controller.js";
const router = express.Router();

// POST /api/users/register
router.post("/register", registerUser);
router.get("/:id", getUser);
router.put("/:id", updateUser,);
router.delete("/:id", deleteUser);

export default router;
