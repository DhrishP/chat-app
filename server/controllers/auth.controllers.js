import bcrypt from "bcryptjs";
import prisma from "../prisma/client.js";
import generateTokenandSetCookie from "../utils/generate-token.js";

export const signin = async (req, res) => {
  const { email, username, password, gender } = await req.body;
  console.log(email, username, password, gender);

  if (!email || !username || !password || !gender) {
    return res.status(400).json({ message: "Please fill in all fields" });
  }
  if (password.length < 8) {
    return res
      .status(400)
      .json({ message: "Password must be at least 8 characters" });
  }
  if (gender !== "male" && gender !== "female") {
    return res.status(400).json({ message: "Something went wrong" });
  }
  const user = await prisma.user.findFirst({
    where: {
      email: email,
    },
  });
  if (user) {
    return res.status(400).json({ message: "User already exists" });
  }

  const saltRounds = 10;
  const hashedPass = await bcrypt.hash(password, saltRounds);
  //   https://avatar.iran.liara.run/public/boy?username=Scott
  const pfp = `https://avatar.iran.liara.run/public/${
    gender === "male" ? "boy" : "girl"
  }?username=${username}`;
  const response = await prisma.user.create({
    data: {
      email,
      password: hashedPass,
      username,
      gender,
      profileUrl: pfp,
    },
    select: {
      id: true,
      email: true,
      username: true,
      profileUrl: true,
    },
  });
  if (response) {
    generateTokenandSetCookie(response.id, res);
    return res.status(200).json(response);
  }
  return res.status(500).json({ message: "Internal server error" });
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "Please fill in all fields" });
  }
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
    select: {
      id: true,
      email: true,
      username: true,
      profileUrl: true,
      password: true,
    },
  });
  if (!user) {
    return res.status(400).json({ message: "Invalid credentials" });
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(400).json({ message: "Invalid credentials" });
  }
  generateTokenandSetCookie(user.id, res);
  const noPassUser = {
    id: user.id,
    email: user.email,
    username: user.username,
    profileUrl: user.profileUrl,
  };
  return res.status(200).json(noPassUser);
};

export const logout = (req, res) => {
  res.clearCookie("jwt");
  return res.status(200).json({ message: "User logged out successfully" });
};
