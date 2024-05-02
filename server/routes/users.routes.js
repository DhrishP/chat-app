import express from "express";
import checkJwt from "../middleware/check-jwt.js";
import { sidebarUsers } from "../controllers/users.controllers.js";
const router = express.Router();


router.get('/',checkJwt,sidebarUsers)


export default router;