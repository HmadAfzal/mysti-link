import UserModel, { Message } from "@/Models/User";
import DBconnect from "@/lib/DBconnection";


export async function POST(request: Request) {
  await DBconnect();
  const { username, content } = await request.json();
  try {
    const user = await UserModel.findOne({ username });
    if (!user) {
      return Response.json(
        {
          success: false,
          message: "User not found",
        },
        { status: 404 }
      );
    }

    if (!user.isAcceptingMessage) {
      return Response.json(
        {
          success: false,
          message: "User not accepting messages",
        },
        { status: 431 }
      );
    }

    const newMessage = { content, createdAt: new Date() };
    user.messages.push(newMessage as Message);
    return Response.json(
      {
        success: true,
        message: "Message sent successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    console.log("Error in sending message", error);
    return Response.json(
      {
        success: false,
        message: "Error in sending message",
      },
      { status: 500 }
    );
  }
}
