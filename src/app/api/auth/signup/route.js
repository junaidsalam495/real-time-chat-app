import { connectDB } from "@/lib/db";
import { NextResponse } from "next/server";
import UserSchema from "@/lib/models/user";

export async function POST(request) {
    try {
        const body = await request.json();
        const { name, email, password } = body;
        await connectDB();
        const existingUser = await UserSchema.findOne({ email });
        if (existingUser) {
            return NextResponse.json(
                { message: "User already exists", status: 409 },
                { status: 409 }
            );
        }
        const newUser = new UserSchema({ name, email, password });
        await newUser.save();

        return NextResponse.json({
            message: "Your account has been created successfully.",
            status: 200,
        });
    } catch (error) {
        console.error("Signup error:", error);
        return NextResponse.json(
            { message: "Internal Server Error", status: 500 },
            { status: 500 }
        );
    }
}

