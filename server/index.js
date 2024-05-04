import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/messages.routes.js";
import userRoutes from "./routes/users.routes.js";
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import { app, server } from "./socket/socket.js";

dotenv.config();

const PORT = process.env.PORT;
app.use(cors({ origin: `${process.env.FRONTEND_URL}`, credentials: true }));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/message", messageRoutes);
app.use("/users", userRoutes);

app.get("/", (req, res) => {
  res.send("Hello world");
});

server.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT}`);
});
