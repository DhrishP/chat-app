import prisma from "../prisma/client.js";
import { getRecieverSocketId, io } from "../socket/socket.js";

export const sendMessage = async (req, res) => {
  const { id: recieverId } = req.params;
  const { message } = req.body;
  if (!message) {
    return res.status(400).json({ message: "Message cannot be empty" });
  }
  if (!recieverId) {
    return res.status(400).json({ message: "Reciever id is required" });
  }
  try {
    const senderId = req.user.id;
    let conversation = await prisma.conversation.findFirst({
      where: {
        participants: {
          every: {
            id: {
              in: [senderId, recieverId],
            },
          },
        },
      },
    });
    if (!conversation) {
      conversation = await prisma.conversation.create({
        data: {
          participants: {
            connect: [{ id: senderId }, { id: recieverId }],
          },
        },
      });
      if (!conversation) {
        return res.status(500).json({ message: "Failed to send message" });
      }
    }
    const newMessage = await prisma.message.create({
      data: {
        message,
        senderId,
        receiverId: recieverId,
        conversationId: conversation.id,
      },
    });
    if (!newMessage) {
      return res.status(500).json({ message: "Failed to send message" });
    }
    const recieverSocketId = getRecieverSocketId(recieverId);
    if (recieverSocketId) {
      io.to(recieverSocketId).emit("newMessage", newMessage);
    }

    return res.status(200).json(newMessage);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const getMessages = async (req, res) => {
  const { id: recieverId } = req.params;
  try {
    const conversations = await prisma.conversation.findMany({
      where: {
        participants: {
          every: {
            id: {
              in: [req.user.id, recieverId],
            },
          },
        },
      },
      include: {
        messages: {
          select: {
            message: true,
            createdAt: true,
            id: true,
            senderId: true,
            receiverId: true,
          },
        },
      },
    });
    if (!conversations) {
      return res.status(200).json([])
    }
    return res
      .status(200)
      .json(conversations.map((message) => message.messages)[0]);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
