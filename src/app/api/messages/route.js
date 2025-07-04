import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Message from "@/lib/models/messages";

export async function POST(req) {
    try {
        const { senderId, receiverId, text } = await req.json();
        if (!senderId || !receiverId || !text) {
            return NextResponse.json({ message: "Missing fields" }, { status: 400 });
        }
        await connectDB();
        const message = await Message.create({
            senderId,
            receiverId,
            text,
        });
        return NextResponse.json({
            message: "Message sent successfully",
            data: message,
        });
    } catch (error) {
        console.error("Send message error:", error);
        return NextResponse.json({ message: "Server error" }, { status: 500 });
    }
}

export async function GET(req) {
    try {
        const { searchParams } = new URL(req.url);
        const senderId = searchParams.get("senderId");
        const receiverId = searchParams.get("receiverId");

        if (!senderId || !receiverId) {
            return NextResponse.json({ message: "Missing query params" }, { status: 400 });
        }

        await connectDB();

        const messages = await Message.find({
            $or: [
                { senderId, receiverId },
                { senderId: receiverId, receiverId: senderId },
            ],
        }).sort({ createdAt: 1 });

        return NextResponse.json({
            message: "Messages fetched successfully",
            data: messages,
        });
    } catch (error) {
        console.error("Get messages error:", error);
        return NextResponse.json({ message: "Server error" }, { status: 500 });
    }
}
