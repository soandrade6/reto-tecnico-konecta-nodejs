import express from "express";
import { login } from "../controllers/auth.controller.js";
import { verifyCaptcha } from "../middleware/captcha.middleware.js";

const router = express.Router();

router.post("/login", verifyCaptcha, login);

export default router;
