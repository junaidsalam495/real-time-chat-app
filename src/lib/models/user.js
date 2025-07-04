import mongoose, { Schema } from "mongoose";

const UserSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    avatar: { type: String, default: "/placeholder.svg?height=40&width=40" },
}, { timestamps: true })

export default mongoose.models.User || mongoose.model("User", UserSchema);


