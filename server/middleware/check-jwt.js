import jwt from "jsonwebtoken";
import prisma from "../prisma/client.js";

const checkJwt = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const response = await prisma.user.findFirst({
      where: {
        id: decoded.userId,
      },
    });
    if (!response) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    req.user = response;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized" });
  }
};

export default checkJwt;
