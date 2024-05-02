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
      select:{
        password:false,
        email:true,
        username:true,
        profileUrl:true,
        id:true,
        conversationsId:true,
        createdAt:true,
        updatedAt:true,
      }
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
