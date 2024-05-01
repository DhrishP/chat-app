
export const sendMessage = async (req, res) => {
    const { id } = req.params;
    const { message } = req.body;
    try {
        const response = await prisma.message.create({
            data: {
                message,
                userId: parseInt(id),
            },
        });
        if (response) {
            return res.status(200).json({ message: "Message sent successfully" });
        }
    }
    catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
}
// export const getMessages = async (req, res) => {
//     const { id } = req.params;
//     try {
//         const messages = await prisma.message.findMany({
//             where: {
//                 userId: parseInt(id),
//             },
//         });
//         if (messages) {
//             return res.status(200).json(messages);
//         }
//     }
//     catch (error) {
//         return res.status(500).json({ message: "Internal server error" });
//     }
// }