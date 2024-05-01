import express from "express";
import checkJwt from "../middleware/check-jwt.js";
import { sendMessage,getMessages } from "../controllers/messages.controllers.js";
const router = express.Router();

router.post('/send/:id',checkJwt,sendMessage)

router.get('/:id',checkJwt,getMessages)

export default router;
