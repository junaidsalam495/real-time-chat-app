import { connectDB } from "@/lib/db";
import { NextResponse } from "next/server";
import UserSchema from "@/lib/models/user";

export async function GET() {
    try {
        await connectDB();
        const users = await UserSchema.find();
        return NextResponse.json({
            message: "get all users",
            users,
        });
    } catch (error) {
        return NextResponse.json({ message: "Internal server error", status: 500 }, { status: 500 });
    }
}
''