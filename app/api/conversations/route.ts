import getCurrentUser from "@/app/actions/getCurrentUser";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";
import { pusherServer } from "@/app/libs/pusher";

export const POST = async (request: NextRequest) => {
  try {
    const [
      currentUser,
      body
    ] = await Promise.all([getCurrentUser(), request.json()]);

    const { userId, isGroup, members, name } = body;

    if (!currentUser?.id || !currentUser?.email) {
      return new NextResponse('Unauthorised', {status: 401});
    }

    if (isGroup) {
      if (!members || members.length < 2 || !name) {
        return new NextResponse('Invalid data', {status: 400});
      } else {
        const newConversation = await prisma.conversation.create({
          data: {
            name,
            isGroup,
            users: {
              connect: [
                ...members.map((member: { value: string }) => ({
                  id: member.value
                })),
                {
                  id: currentUser.id
                }
              ]
            }
          },
          include: {
            users: true
          }
        });

        newConversation.users.forEach((user) => {
          if (user.email) {
            pusherServer.trigger(user.email, 'conversation:new', newConversation);
          }
        });

        return NextResponse.json(newConversation);
      }
    } else {
      const existingConversations = await prisma.conversation.findMany({
        where: {
          OR: [
            {
              userIds: {
                equals: [currentUser.id, userId]
              }
            },
            {
              userIds: {
                equals: [userId, currentUser.id]
              }
            }
          ]
        }
      });

      const singleConversation = existingConversations[0];

      if (singleConversation) {
        return NextResponse.json(singleConversation);
      }

      const newConversation = await prisma.conversation.create({
        data: {
          users: {
            connect: [
              {
                id: currentUser.id
              },
              {
                id: userId
              }
            ]
          }
        },
        include: {
          users: true
        }
      });

      newConversation.users.forEach((user) => {
        if (user.email) {
          pusherServer.trigger(user.email, 'conversation:new', newConversation);
        }
      });

      return NextResponse.json(newConversation);
    }
  } catch (error: any) {
    return new NextResponse('Internal Server Error', {status: 500});
  }
}