import express from "express";
import checkJwt from "../middleware/check-jwt";
import { sendMessage } from "../controllers/messages.controllers";
const router = express.Router();

router.post('/send/:id',checkJwt,sendMessage)
// router.get('/get/:id',checkJwt,getMessages)

export default router;
