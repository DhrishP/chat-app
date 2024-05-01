import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/messages.routes.js";
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())

app.use("/api/auth", authRoutes);
app.use("/message",messageRoutes)

app.get("/", (req, res) => {
  res.send("Hello world");
});

app.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT}`);
}); 
 