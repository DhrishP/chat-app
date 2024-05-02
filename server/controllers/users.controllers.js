import prisma from "../prisma/client.js";

export const sidebarUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      where: {
        id: {
          not: {
            equals: req.user.id,
          },
        },
      },
      select: {
        id: true,
        username: true,
        profileUrl: true,
      },
    });
    if (!users) {
      return res.status(404).json({ message: "No users found" });
    }
    res.json(users).status(200);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
