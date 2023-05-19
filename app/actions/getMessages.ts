import prisma from "@/app/libs/prismadb";

const getMessages = async (conversationId: string) => {
  try {
    return await prisma.message.findMany({
      where: {
        conversationId: conversationId
      },
      include: {
        sender: true,
        seen: true,
      },
      orderBy: {
        createdAt: 'asc'
      }
    });
  } catch (error: any) {
    return [];
  }
};
export default getMessages;