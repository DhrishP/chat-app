import express from "express";
import { login, logout, signin } from "../controllers/auth.controllers.js";

const router = express.Router();

router.post("/signin", signin);

router.post("/login", login);

router.get("/logout", logout);

export default router;
